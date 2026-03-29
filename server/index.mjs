import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';
import zlib from 'node:zlib';
import { uploadToCloudinary, deleteFromCloudinary } from './cloudinary.mjs';

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
    '.js', '.css', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.ico', '.json', '.woff', '.woff2', '.ttf', '.otf', '.eot', '.mp4'
]);

const loadEnvFile = (envPath) => {
    if (!fs.existsSync(envPath)) return {};
    const content = fs.readFileSync(envPath, 'utf8');
    return content.split(/\r?\n/).reduce((acc, line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return acc;
        const separatorIndex = trimmed.indexOf('=');
        if (separatorIndex === -1) return acc;
        const key = trimmed.slice(0, separatorIndex).trim();
        const rawValue = trimmed.slice(separatorIndex + 1).trim();
        acc[key] = rawValue.replace(/^['"]|['"]$/g, '');
        return acc;
    }, {});
};

const fileEnv = loadEnvFile(path.join(__dirname, '.env'));
const env = { ...fileEnv, ...process.env };

const PORT = Number(env.PORT || env.ADMIN_SERVER_PORT || 8788);
const CLIENT_ORIGIN = env.ADMIN_CLIENT_ORIGIN || 'http://localhost:5173';
const SESSION_SECRET = env.ADMIN_SESSION_SECRET || 'change-me-in-server-env';
const ADMIN_PIN = env.ADMIN_PIN || '';
const MONGO_URI = env.MONGODB_URI || 'mongodb://127.0.0.1:27017/webingix';
const SESSION_COOKIE = 'webingix_admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

// --- MongoDB Schemas & Connection ---
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('[admin-server] MongoDB connected');
        
        // Ensure indices for hyper-fast lookups
        await Project.collection.createIndex({ order: 1 });
        await Member.collection.createIndex({ order: 1 });
        await Submission.collection.createIndex({ timestamp: -1 });

        await seedProjects();
        await seedSocials();
    } catch (err) {
        console.error('[admin-server] MongoDB connection error:', err);
    }
}
connectDB();

async function seedProjects() {
    try {
        const count = await Project.countDocuments();
        if (count === 0) {
            const initialProjects = [
                {
                    id: '01',
                    title: 'RetailCo',
                    time: '2 h',
                    clientMsg: 'We need a futuristic shopping experience with smooth animations and fast checkout.',
                    ourMsg: "Let's build it with React and a fast premium frontend experience.",
                    image: '/div.jpg',
                    order: 0
                },
                {
                    id: '02',
                    title: 'TravelMind',
                    time: '5 h',
                    clientMsg: 'Build an AI-powered app that generates custom travel itineraries for users.',
                    ourMsg: 'We can combine AI planning, maps, and a polished user flow.',
                    image: '/laptop.webp',
                    order: 1
                },
                {
                    id: '03',
                    title: 'EventPro',
                    time: '12 h',
                    clientMsg: 'We handle 500 plus events a year. We need a system that can keep up with us.',
                    ourMsg: 'Real-time dashboards, ticketing, and analytics will make this scale.',
                    image: '/camera.webp',
                    order: 2
                },
                {
                    id: '04',
                    title: 'SmileCare',
                    time: '24 h',
                    clientMsg: 'We want a premium website that makes patients excited about dentistry.',
                    ourMsg: 'We will keep it calm, clean, and confidence-building for patients.',
                    image: '/yo.png',
                    order: 3
                }
            ];
            await Project.insertMany(initialProjects);
            console.log('[admin-server] Seeded initial projects');
        }
    } catch (err) {
        console.error('[admin-server] Failed to seed projects:', err);
    }
}

async function seedSocials() {
    try {
        const count = await Social.countDocuments();
        if (count === 0) {
            const initialSocials = [
                { name: 'X', url: 'https://x.com/webingix', order: 0 },
                { name: 'Facebook', url: 'https://facebook.com/webingix', order: 1 },
                { name: 'LinkedIn', url: 'https://linkedin.com/company/webingix', order: 2 },
                { name: 'Instagram', url: 'https://instagram.com/webingix', order: 3 },
                { name: 'WhatsApp', url: 'https://wa.me/8153929447', order: 4 },
                { name: 'Email', url: 'mailto:contact@webingix.com', order: 5 },
                { name: 'Call', url: 'tel:+918153929447', order: 6 }
            ];
            await Social.insertMany(initialSocials);
            console.log('[admin-server] Seeded initial socials');
        }
    } catch (err) {
        console.error('[admin-server] Failed to seed socials:', err);
    }
}

const SubmissionSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    name: String,
    method: String,
    contact: String,
    project: String,
    type: String,
    timeline: String,
    details: String
});
const Submission = mongoose.model('Submission', SubmissionSchema);

const ProjectSchema = new mongoose.Schema({
    id: String,
    title: String,
    clientMsg: String,
    ourMsg: String,
    time: String,
    image: String,
    desc: String,
    tags: [String],
    link: String,
    order: { type: Number, default: 0 }
});
const Project = mongoose.model('Project', ProjectSchema);

const LogoSchema = new mongoose.Schema({ url: String, order: Number });
const Logo = mongoose.model('Logo', LogoSchema);

const MemberSchema = new mongoose.Schema({
    id: String,
    name: String,
    title: String,
    tags: [String],
    photo: String,
    order: Number
});
const Member = mongoose.model('Member', MemberSchema);

const GallerySchema = new mongoose.Schema({ url: String, order: Number });
const GalleryImg = mongoose.model('GalleryImg', GallerySchema);

const SocialSchema = new mongoose.Schema({ name: String, url: String, order: Number });
const Social = mongoose.model('Social', SocialSchema);

// --- Server Utils ---
const isPathInsideDir = (targetPath, dirPath) => {
    if (!targetPath || !dirPath) return false;
    const paddedDir = dirPath.endsWith(path.sep) ? dirPath : `${dirPath}${path.sep}`;
    return targetPath === dirPath || targetPath.startsWith(paddedDir);
};

const tryServeDistFile = (res, pathname) => {
    if (!fs.existsSync(DIST_DIR)) return false;
    const relativeRequest = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const filePath = path.normalize(path.join(DIST_DIR, relativeRequest || 'index.html'));
    if (!isPathInsideDir(filePath, DIST_DIR)) return false;
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return false;

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': ext === '.html' ? 'no-cache' : IMMUTABLE_EXTENSIONS.has(ext) ? 'public, max-age=31536000, immutable' : 'public, max-age=604800' });
    fs.createReadStream(filePath).pipe(res);
    return true;
};

const json = (res, statusCode, payload, extraHeaders = {}) => {
    const body = JSON.stringify(payload);
    const acceptEncoding = (res.req && res.req.headers) ? (res.req.headers['accept-encoding'] || '') : '';
    
    const headers = { 
        'Content-Type': 'application/json', 
        ...extraHeaders,
        'Vary': 'Accept-Encoding'
    };

    if (acceptEncoding.includes('gzip')) {
        zlib.gzip(body, (err, compressed) => {
            if (err) {
                res.writeHead(statusCode, headers);
                res.end(body);
            } else {
                res.writeHead(statusCode, { ...headers, 'Content-Encoding': 'gzip' });
                res.end(compressed);
            }
        });
    } else {
        res.writeHead(statusCode, headers);
        res.end(body);
    }
};

const isValidSessionToken = (token) => {
    if (!token || !token.includes('.')) return false;
    const [expiresAt, signature] = token.split('.');
    if (!expiresAt || !signature) return false;
    const expected = crypto.createHmac('sha256', SESSION_SECRET).update(expiresAt).digest('hex');
    try {
        return crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex')) && Number(expiresAt) > Date.now();
    } catch { return false; }
};

const parseJsonBody = async (req) => {
    const chunks = [];
    for await (const chunk of req) {
        chunks.push(chunk);
        if (Buffer.concat(chunks).length > 20_000_000) throw new Error('Payload too large'); // Increased for images
    }
    return chunks.length === 0 ? {} : JSON.parse(Buffer.concat(chunks).toString('utf8'));
};

const createCorsHeaders = (origin) => {
    const allowedOrigin = origin === CLIENT_ORIGIN ? origin : CLIENT_ORIGIN;
    return { 'Access-Control-Allow-Origin': allowedOrigin, 'Access-Control-Allow-Credentials': 'true', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS' };
};

// --- Server Implementation ---
const server = http.createServer(async (req, res) => {
    const origin = req.headers.origin || CLIENT_ORIGIN;
    const corsHeaders = createCorsHeaders(origin);
    if (req.method === 'OPTIONS') { res.writeHead(204, corsHeaders); res.end(); return; }

    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    const pathname = url.pathname;
    const cookies = (req.headers.cookie || '').split(';').reduce((acc, part) => {
        const [k, ...v] = part.trim().split('=');
        if (k) acc[k] = decodeURIComponent(v.join('='));
        return acc;
    }, {});
    const isAuth = isValidSessionToken(cookies[SESSION_COOKIE]);

    console.log(`[admin-server] ${req.method} ${pathname}`);

    // Public API: Contact Submission
    if (req.method === 'POST' && pathname === '/api/contact') {
        try {
            const b = await parseJsonBody(req);
            await Submission.create({
                name: b.name,
                method: b.contactMethod,
                contact: b.phone || b.email,
                project: b.projectName,
                type: b.projectType,
                timeline: b.timeline,
                details: b.extraDetails,
                timestamp: b.submittedAt ? new Date(b.submittedAt) : new Date()
            });
            return json(res, 200, { ok: true }, corsHeaders);
        } catch { return json(res, 500, { error: 'Internal Error' }, corsHeaders); }
    }

    // Public API: Content Retrieval
    if (req.method === 'GET' && pathname === '/api/projects') {
        const data = await Project.find().sort({ order: 1 });
        return json(res, 200, data, corsHeaders);
    }
    if (req.method === 'GET' && pathname === '/api/logos') {
        const data = await Logo.find().sort({ order: 1 });
        return json(res, 200, data, corsHeaders);
    }
    if (req.method === 'GET' && pathname === '/api/team') {
        const data = await Member.find().sort({ order: 1 });
        return json(res, 200, data, corsHeaders);
    }
    if (req.method === 'GET' && pathname === '/api/gallery') {
        const data = await GalleryImg.find().sort({ order: 1 });
        return json(res, 200, data, corsHeaders);
    }
    if (req.method === 'GET' && pathname === '/api/socials') {
        const data = await Social.find().sort({ order: 1 });
        return json(res, 200, data, corsHeaders);
    }

    // Admin Auth
    if (req.method === 'POST' && pathname === '/api/admin/login') {
        const b = await parseJsonBody(req);
        if (b.pin === ADMIN_PIN) {
            const expiresAt = Date.now() + SESSION_TTL_MS;
            const token = `${expiresAt}.${crypto.createHmac('sha256', SESSION_SECRET).update(String(expiresAt)).digest('hex')}`;
            return json(res, 200, { authenticated: true }, { ...corsHeaders, 'Set-Cookie': `${SESSION_COOKIE}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${SESSION_TTL_MS / 1000}` });
        }
        return json(res, 401, { error: 'Wrong PIN' }, corsHeaders);
    }

    // Secure Admin API
    if (pathname.startsWith('/api/admin') || ['POST', 'PUT', 'DELETE'].includes(req.method)) {
        if (!isAuth && pathname !== '/api/admin/login' && pathname !== '/api/contact') {
            return json(res, 401, { error: 'Unauthorized' }, corsHeaders);
        }

        // Submissions
        if (req.method === 'GET' && pathname === '/api/admin/submissions') {
            const data = await Submission.find().sort({ timestamp: -1 });
            return json(res, 200, data, corsHeaders);
        }

        // Projects
        if (req.method === 'POST' && pathname === '/api/admin/projects') {
            const b = await parseJsonBody(req);
            if (b.image && b.image.startsWith('data:image')) {
                b.image = await uploadToCloudinary(b.image, 'projects');
            }
            const p = await Project.create(b);
            return json(res, 201, p, corsHeaders);
        }
        if (req.method === 'PUT' && pathname.startsWith('/api/admin/projects/')) {
            const id = pathname.split('/').pop();
            const b = await parseJsonBody(req);
            if (b.image && b.image.startsWith('data:image')) {
                const old = await Project.findById(id);
                if (old && old.image) await deleteFromCloudinary(old.image);
                b.image = await uploadToCloudinary(b.image, 'projects');
            }
            const p = await Project.findByIdAndUpdate(id, b, { new: true });
            return json(res, 200, p, corsHeaders);
        }
        if (req.method === 'DELETE' && pathname.startsWith('/api/admin/projects/')) {
            const id = pathname.split('/').pop();
            const old = await Project.findById(id);
            if (old && old.image) await deleteFromCloudinary(old.image);
            await Project.findByIdAndDelete(id);
            return json(res, 200, { ok: true }, corsHeaders);
        }

        // Generic Dynamic Handlers (Logos, Team, Gallery, Socials)
        const entityMap = { 
            '/api/admin/logos': { model: Logo, folder: 'brands' }, 
            '/api/admin/team': { model: Member, folder: 'team' }, 
            '/api/admin/gallery': { model: GalleryImg, folder: 'gallery' },
            '/api/admin/socials': { model: Social, folder: 'socials' } 
        };
        for (const [pathKey, config] of Object.entries(entityMap)) {
            const Model = config.model;
            const folder = config.folder;

            if (pathname === pathKey && req.method === 'POST') {
                const b = await parseJsonBody(req);
                const imgField = folder === 'brands' || folder === 'gallery' ? 'url' : folder === 'team' ? 'photo' : null;
                if (imgField && b[imgField] && b[imgField].startsWith('data:image')) {
                    b[imgField] = await uploadToCloudinary(b[imgField], folder);
                }
                const d = await Model.create(b); 
                return json(res, 201, d, corsHeaders); 
            }
            if (pathname.startsWith(pathKey + '/')) {
                const id = pathname.split('/').pop();
                const imgField = folder === 'brands' || folder === 'gallery' ? 'url' : folder === 'team' ? 'photo' : null;

                if (req.method === 'PUT') {
                    const b = await parseJsonBody(req);
                    if (imgField && b[imgField] && b[imgField].startsWith('data:image')) {
                        const old = await Model.findById(id);
                        if (old && old[imgField]) await deleteFromCloudinary(old[imgField]);
                        b[imgField] = await uploadToCloudinary(b[imgField], folder);
                    }
                    const d = await Model.findByIdAndUpdate(id, b, { new: true }); 
                    return json(res, 200, d, corsHeaders);
                }
                if (req.method === 'DELETE') {
                    const old = await Model.findById(id);
                    if (imgField && old && old[imgField]) await deleteFromCloudinary(old[imgField]);
                    await Model.findByIdAndDelete(id); 
                    return json(res, 200, { ok: true }, corsHeaders);
                }
            }
        }
    }

    if (req.method === 'GET' && pathname === '/api/admin/session') {
        return json(res, 200, { authenticated: isAuth }, corsHeaders);
    }

    // Static Delivery & Catch-All for React Router
    if ((req.method === 'GET' || req.method === 'HEAD') && !pathname.startsWith('/api')) {
        // First try to serve the specific file (assets, logos, etc.)
        if (tryServeDistFile(res, pathname)) return;
        
        // If no file found, serve index.html for React Router to handle the path (SPA catch-all)
        if (tryServeDistFile(res, '/')) return;
    }

    // Still not found? 404
    json(res, 404, { error: 'Not found' }, corsHeaders);
});

server.listen(PORT, '0.0.0.0', () => console.log(`[admin-server] Listening on port ${PORT}`));
