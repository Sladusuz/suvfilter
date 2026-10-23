// Cloudflare Workers entry: /api/* goes here, everything else is served from public/ (static assets).
import requests from './lib/handlers/requests.mjs';
import admin from './lib/handlers/admin.mjs';
import telegram from './lib/handlers/telegram.mjs';

const notFound = () => new Response(JSON.stringify({ error: 'Topilmadi' }), { status: 404, headers: { 'Content-Type': 'application/json' } });

export default {
  async fetch(request, env) {
    globalThis.__ENV = env; // settings + KV binding for the shared code
    const { pathname } = new URL(request.url);
    if (pathname === '/api/requests') return requests(request);
    if (pathname === '/api/telegram') return telegram(request);
    if (pathname === '/api/login' || pathname === '/api/logout' || pathname.startsWith('/api/admin/')) return admin(request);
    return notFound();
  },
};
