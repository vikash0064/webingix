import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadEnvFile = (envPath) => {
    if (!fs.existsSync(envPath)) {
        return {};
    }

    const content = fs.readFileSync(envPath, 'utf8');
    return content.split(/\r?\n/).reduce((acc, line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) {
            return acc;
        }

        const separatorIndex = trimmed.indexOf('=');
        if (separatorIndex === -1) {
            return acc;
        }

        const key = trimmed.slice(0, separatorIndex).trim();
        const rawValue = trimmed.slice(separatorIndex + 1).trim();
        acc[key] = rawValue.replace(/^['"]|['"]$/g, '');
        return acc;
    }, {});
};

const fileEnv = loadEnvFile(path.join(__dirname, '.env'));
const env = { ...fileEnv, ...process.env };

const PORT = Number(env.ADMIN_SERVER_PORT || 8787);
const CLIENT_ORIGIN = env.ADMIN_CLIENT_ORIGIN || 'http://localhost:5173';
const SESSION_SECRET = env.ADMIN_SESSION_SECRET || 'change-me-in-server-env';
const ADMIN_PIN = env.ADMIN_PIN || '';
const PIN_HASH = env.ADMIN_PIN_HASH || '';
const PIN_SALT = env.ADMIN_PIN_SALT || '';
const SESSION_COOKIE = 'webingix_admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

if (!ADMIN_PIN && (!PIN_HASH || !PIN_SALT)) {
    console.warn('[admin-server] Missing ADMIN_PIN or ADMIN_PIN_HASH/ADMIN_PIN_SALT in server/.env');
}

if (SESSION_SECRET === 'change-me-in-server-env') {
    console.warn('[admin-server] Using fallback session secret. Set ADMIN_SESSION_SECRET in server/.env');
}

const json = (res, statusCode, payload, extraHeaders = {}) => {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        ...extraHeaders
    });
    res.end(JSON.stringify(payload));
};

const createSessionToken = (expiresAt) => {
    const payload = String(expiresAt);
    const signature = crypto
        .createHmac('sha256', SESSION_SECRET)
        .update(payload)
        .digest('hex');

    return `${payload}.${signature}`;
};

const isValidSessionToken = (token) => {
    if (!token || !token.includes('.')) {
        return false;
    }

    const [expiresAt, signature] = token.split('.');
    if (!expiresAt || !signature) {
        return false;
    }

    const expected = crypto
        .createHmac('sha256', SESSION_SECRET)
        .update(expiresAt)
        .digest('hex');

    try {
        const isSame = crypto.timingSafeEqual(
            Buffer.from(signature, 'hex'),
            Buffer.from(expected, 'hex')
        );

        return isSame && Number(expiresAt) > Date.now();
    } catch {
        return false;
    }
};

const parseCookies = (cookieHeader = '') => {
    return cookieHeader.split(';').reduce((acc, part) => {
        const [key, ...valueParts] = part.trim().split('=');
        if (!key) {
            return acc;
        }

        acc[key] = decodeURIComponent(valueParts.join('='));
        return acc;
    }, {});
};

const parseJsonBody = async (req) => {
    const chunks = [];

    for await (const chunk of req) {
        chunks.push(chunk);
        if (Buffer.concat(chunks).length > 10_000) {
            throw new Error('Payload too large');
        }
    }

    if (chunks.length === 0) {
        return {};
    }

    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
};

const verifyPin = (pin) => {
    if (!pin) {
        return false;
    }

    if (ADMIN_PIN) {
        return pin === ADMIN_PIN;
    }

    if (!PIN_HASH || !PIN_SALT) {
        return false;
    }

    const derived = crypto.scryptSync(pin, PIN_SALT, 64).toString('hex');

    try {
        return crypto.timingSafeEqual(
            Buffer.from(derived, 'hex'),
            Buffer.from(PIN_HASH, 'hex')
        );
    } catch {
        return false;
    }
};

const createCorsHeaders = (origin) => {
    const allowedOrigin = origin === CLIENT_ORIGIN ? origin : CLIENT_ORIGIN;
    return {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
    };
};

const server = http.createServer(async (req, res) => {
    const origin = req.headers.origin || CLIENT_ORIGIN;
    const corsHeaders = createCorsHeaders(origin);

    if (req.method === 'OPTIONS') {
        res.writeHead(204, corsHeaders);
        res.end();
        return;
    }

    const url = new URL(req.url || '/', `http://${req.headers.host}`);

    if (req.method === 'GET' && url.pathname === '/api/admin/session') {
        const cookies = parseCookies(req.headers.cookie);
        json(res, 200, { authenticated: isValidSessionToken(cookies[SESSION_COOKIE]) }, corsHeaders);
        return;
    }

    if (req.method === 'POST' && url.pathname === '/api/admin/login') {
        try {
            const body = await parseJsonBody(req);
            const pin = String(body.pin || '');

            if (!verifyPin(pin)) {
                json(res, 401, { error: 'Incorrect PIN' }, corsHeaders);
                return;
            }

            const expiresAt = Date.now() + SESSION_TTL_MS;
            const token = createSessionToken(expiresAt);
            const secureFlag = origin.startsWith('https://') ? '; Secure' : '';

            json(
                res,
                200,
                { authenticated: true },
                {
                    ...corsHeaders,
                    'Set-Cookie': `${SESSION_COOKIE}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${SESSION_TTL_MS / 1000}${secureFlag}`
                }
            );
        } catch {
            json(res, 400, { error: 'Invalid request body' }, corsHeaders);
        }
        return;
    }

    if (req.method === 'POST' && url.pathname === '/api/admin/logout') {
        json(
            res,
            200,
            { authenticated: false },
            {
                ...corsHeaders,
                'Set-Cookie': `${SESSION_COOKIE}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`
            }
        );
        return;
    }

    if (req.method === 'GET' && url.pathname === '/api/health') {
        json(res, 200, { ok: true }, corsHeaders);
        return;
    }

    json(res, 404, { error: 'Not found' }, corsHeaders);
});

server.listen(PORT, () => {
    console.log(`[admin-server] Listening on http://localhost:${PORT}`);
});
