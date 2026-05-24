import https from 'node:https';

// Configuration (can be overridden with environment variables)
const WEBSITE_URL = process.env.WEBSITE_URL || 'https://www.webingix.dev/api/ping';
const PING_INTERVAL = (Number(process.env.PING_INTERVAL_MINUTES) || 5) * 60 * 1000; // default 5 minutes in ms

console.log(`[keep-alive] Starting ping system...`);
console.log(`[keep-alive] Target URL: ${WEBSITE_URL}`);
console.log(`[keep-alive] Ping Interval: ${PING_INTERVAL / 1000 / 60} minutes`);

function ping() {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Sending ping to ${WEBSITE_URL}...`);

    https.get(WEBSITE_URL, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            if (res.statusCode === 200) {
                console.log(`[${timestamp}] Ping Success! Status: ${res.statusCode}. Response: ${data.trim()}`);
            } else {
                console.warn(`[${timestamp}] Ping Warning! Status: ${res.statusCode}.`);
            }
        });
    }).on('error', (err) => {
        console.error(`[${timestamp}] Ping Failed! Error: ${err.message}`);
    });
}

// Perform initial ping immediately
ping();

// Schedule subsequent pings
setInterval(ping, PING_INTERVAL);
