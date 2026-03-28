import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.otf': 'font/otf',
    '.eot': 'application/vnd.ms-fontobject',
    '.mp4': 'video/mp4'
};
const IMMUTABLE_EXTENSIONS = new Set([
    '.js',
    '.css',
    '.png',
    '.jpg',
    '.jpeg',
    '.webp',
    '.svg',
    '.ico',
    '.json',
    '.woff',
    '.woff2',
    '.ttf',
    '.otf',
    '.eot',
    '.mp4'
]);

const isPathInsideDir = (targetPath, dirPath) => {
    if (!targetPath || !dirPath) {
        return false;
    }

    const paddedDir = dirPath.endsWith(path.sep) ? dirPath : `${dirPath}${path.sep}`;
    return targetPath === dirPath || targetPath.startsWith(paddedDir);
};

const getDistFilePath = (pathname) => {
    if (!pathname) {
        return null;
    }

    const relativeRequest = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const candidate = path.normalize(path.join(DIST_DIR, relativeRequest || 'index.html'));

    return isPathInsideDir(candidate, DIST_DIR) ? candidate : null;
};

const sendDistFile = (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const cacheControl = ext === '.html'
        ? 'no-cache'
        : IMMUTABLE_EXTENSIONS.has(ext)
            ? 'public, max-age=31536000, immutable'
            : 'public, max-age=604800';

    res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': cacheControl
    });

    const stream = fs.createReadStream(filePath);
    stream.on('error', (error) => {
        console.error('[admin-server] Static file stream error:', error);
        if (!res.headersSent) {
            res.writeHead(500);
        }
        res.end('Internal server error');
    });
    stream.pipe(res);
};

const tryServeDistFile = (res, pathname) => {
    if (!fs.existsSync(DIST_DIR)) {
        return false;
    }

    const filePath = getDistFilePath(pathname);
    if (!filePath || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        return false;
    }

    sendDistFile(res, filePath);
    return true;
};

if (!fs.existsSync(DIST_DIR)) {
    console.warn(`[admin-server] Dist directory not found at ${DIST_DIR}. Front-end routes will return 404 until the client is built.`);
}

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

const PORT = Number(env.ADMIN_SERVER_PORT || 8788);
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

    console.log(`[admin-server] ${req.method} ${req.url} (from ${origin})`);

    const LOG_FILE = path.join(__dirname, 'submissions.csv');
    if (!fs.existsSync(LOG_FILE)) {
        fs.writeFileSync(LOG_FILE, 'Timestamp,Name,Method,Phone/Email,Project Name,Type,Timeline,Details\n');
    }

    if (req.method === 'OPTIONS') {
        res.writeHead(204, corsHeaders);
        res.end();
        return;
    }

    const url = new URL(req.url || '/', `http://${req.headers.host}`);
    const requestPath = url.pathname || '/';
    const cleanPath = requestPath.replace(/\/$/, '') || '/';

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

    if (req.method === 'POST' && url.pathname === '/api/contact') {
        try {
            const body = await parseJsonBody(req);
            const { name, contactMethod, phone, projectName, projectType, timeline, extraDetails, submittedAt } = body;
            
            const csvRow = [
                submittedAt || new Date().toISOString(),
                `"${(name || '').replace(/"/g, '""')}"`,
                contactMethod,
                `"${(phone || '').replace(/"/g, '""')}"`,
                `"${(projectName || '').replace(/"/g, '""')}"`,
                projectType,
                timeline,
                `"${(extraDetails || '').replace(/"/g, '""')}"`
            ].join(',');

            fs.appendFileSync(LOG_FILE, csvRow + '\n');
            json(res, 200, { ok: true }, corsHeaders);
        } catch (error) {
            console.error('[admin-server] Error saving submission:', error);
            json(res, 500, { error: 'Internal server error' }, corsHeaders);
        }
        return;
    }

    if (req.method === 'GET' && (cleanPath === '/api/admin/submissions' || cleanPath.endsWith('/submissions'))) {
        const cookies = parseCookies(req.headers.cookie);
        if (!isValidSessionToken(cookies[SESSION_COOKIE])) {
            json(res, 401, { error: 'Unauthorized' }, corsHeaders);
            return;
        }

        if (!fs.existsSync(LOG_FILE)) {
            json(res, 200, [], corsHeaders);
            return;
        }

        const lines = fs.readFileSync(LOG_FILE, 'utf8').split('\n').filter(Boolean);
        const headers = lines[0].split(',');
        const data = lines.slice(1).map(line => {
            // Simple split by comma, respecting quotes for CSV
            const parts = [];
            let current = '';
            let inQuotes = false;
            for (let char of line) {
                if (char === '"') inQuotes = !inQuotes;
                else if (char === ',' && !inQuotes) {
                    parts.push(current);
                    current = '';
                } else {
                    current += char;
                }
            }
            parts.push(current);

            return headers.reduce((acc, h, i) => {
                acc[h] = parts[i] || '';
                return acc;
            }, {});
        });

        json(res, 200, data, corsHeaders);
        return;
    }

    if (req.method === 'GET' && url.pathname === '/api/health') {
        json(res, 200, { ok: true }, corsHeaders);
        return;
    }

    if (req.method === 'GET' && !cleanPath.startsWith('/api')) {
        if (tryServeDistFile(res, requestPath)) {
            return;
        }

        if (tryServeDistFile(res, '/')) {
            return;
        }
    }

    json(res, 404, { error: 'Not found' }, corsHeaders);
});

server.listen(PORT, () => {
    console.log(`[admin-server] Listening on http://localhost:${PORT}`);
});
