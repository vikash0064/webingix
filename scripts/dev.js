#!/usr/bin/env node
import path from 'node:path';
import process from 'node:process';
import { spawn } from 'node:child_process';

const spawnProcess = (command, args = []) => {
    const proc = spawn(command, args, {
        stdio: 'inherit',
        shell: true // Changed from false to true for Windows compatibility
    });

    proc.on('error', (error) => {
        console.error(`[dev] Failed to start ${command}:`, error);
    });

    return proc;
};

const killProcess = (proc) => {
    if (proc && !proc.killed) {
        proc.kill('SIGTERM');
    }
};

const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const server = spawnProcess('node', [path.join('server', 'index.mjs')]);
const client = spawnProcess(npmCmd, ['run', 'dev:client']);

const shutdown = (code = 0) => {
    killProcess(server);
    killProcess(client);
    process.exit(code);
};

const handleExit = (code) => {
    shutdown(code);
};

server.on('exit', handleExit);
client.on('exit', handleExit);

['SIGINT', 'SIGTERM', 'SIGHUP'].forEach((signal) => {
    process.on(signal, () => shutdown(0));
});

process.on('uncaughtException', (error) => {
    console.error('[dev] Uncaught exception:', error);
    shutdown(1);
});

process.on('unhandledRejection', (reason) => {
    console.error('[dev] Unhandled rejection:', reason);
    shutdown(1);
});
