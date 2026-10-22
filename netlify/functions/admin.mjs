import { store, reqKey, listRequests, getChats } from '../lib/store.mjs';
import { cfg, tg, json, isAdmin, makeToken, safeEq, ensureWebhook } from '../lib/core.mjs';

export const config = { path: ['/api/login', '/api/logout', '/api/admin/*'] };
const STATUSES = ['new', 'progress', 'done'];
const cookie = (v, age) => `sid=${v}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${age}`;

export default async (req) => {
  const url = new URL(req.url), p = url.pathname, c = cfg();

  if (p === '/api/login' && req.method === 'POST') {
    const { user, password } = await req.json().catch(() => ({}));
    if (c.pass && c.secret && safeEq(user || '', c.user) && safeEq(password || '', c.pass))
      return json({ ok: true }, 200, { 'Set-Cookie': cookie(makeToken(), 7 * 86400) });
    await new Promise((r) => setTimeout(r, 600)); // slow down guessing
    return json({ error: 'Login yoki parol noto\'g\'ri' }, 401);
  }
  if (p === '/api/logout') return json({ ok: true }, 200, { 'Set-Cookie': cookie('', 0) });

  if (!isAdmin(req)) return json({ error: 'Kirish kerak' }, 401);

  if (p === '/api/admin/requests' && req.method === 'GET') {
    let webhook = false;
    try { webhook = await ensureWebhook(url.origin); } catch (e) { console.error('Webhook:', e.message); }
    return json({ requests: await listRequests(), chats: (await getChats()).length, bindCode: c.bind, webhook });
  }
  const m = p.match(/^\/api\/admin\/requests\/(\d+)$/);
  if (m) {
    const key = reqKey(m[1]), r = await store.get(key);
    if (!r) return json({ error: 'Topilmadi' }, 404);
    if (req.method === 'DELETE') { await store.del(key); return json({ ok: true }); }
    if (req.method === 'PATCH') {
      const { status } = await req.json().catch(() => ({}));
      if (!STATUSES.includes(status)) return json({ error: 'Xato' }, 400);
      r.status = status; await store.set(key, r); return json({ ok: true });
    }
  }
  if (p === '/api/admin/test' && req.method === 'POST') {
    const chats = await getChats();
    if (!chats.length) return json({ error: 'Hech qaysi chat ulanmagan' }, 400);
    try {
      await Promise.all(chats.map((chat_id) => tg('sendMessage', { chat_id, text: '✅ Test xabar: admin paneldan.' })));
      return json({ ok: true });
    } catch (e) { return json({ error: e.message }, 500); }
  }
  return json({ error: 'Topilmadi' }, 404);
};
