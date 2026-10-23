// Cloudflare Workers entry: /api/* goes here, everything else is served from public/ (static assets).
import requests from './lib/handlers/requests.mjs';
import admin from './lib/handlers/admin.mjs';
import telegram from './lib/handlers/telegram.mjs';

// Google Search Console ownership file: must be served at this exact URL, without redirects
const GOOGLE_FILE = '/google6376e58e4d0e9ebb.html';
const GOOGLE_BODY = 'google-site-verification: google6376e58e4d0e9ebb.html';

const notFound = () => new Response(JSON.stringify({ error: 'Topilmadi' }), { status: 404, headers: { 'Content-Type': 'application/json' } });

export default {
  async fetch(request, env) {
    globalThis.__ENV = env; // settings + KV binding for the shared code
    const { pathname } = new URL(request.url);
    if (pathname === GOOGLE_FILE) return new Response(GOOGLE_BODY, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    if (pathname === '/api/requests') return requests(request);
    if (pathname === '/api/telegram') return telegram(request);
    if (pathname === '/api/login' || pathname === '/api/logout' || pathname.startsWith('/api/admin/')) return admin(request);
    return notFound();
  },
};
