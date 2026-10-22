import { store, nextId, reqKey } from '../lib/store.mjs';
import { json, notify, MODELS } from '../lib/core.mjs';

export const config = { path: '/api/requests' };

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const body = await req.json().catch(() => ({}));
  if (body.website) return json({ ok: true }); // honeypot
  const name = String(body.name || '').trim().slice(0, 100);
  const phone = String(body.phone || '').trim().slice(0, 30);
  const message = String(body.message || '').trim().slice(0, 1000);
  const model = MODELS[body.model] ? body.model : '';
  if (name.length < 2 || phone.replace(/\D/g, '').length < 9)
    return json({ error: 'Ism va telefon raqamini to\'g\'ri kiriting' }, 400);

  const id = await nextId();
  const r = { id, name, phone, message, status: 'new', createdAt: new Date().toISOString(), sent: false, source: 'site', model };
  await store.set(reqKey(id), r);
  r.sent = await notify(r, new URL(req.url).origin).catch(() => false);
  await store.set(reqKey(id), r);
  return json({ ok: true });
};
