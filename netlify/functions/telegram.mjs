import { json, cfg, webhookSecret, safeEq } from '../lib/core.mjs';
import { handleUpdate } from '../lib/bot.mjs';

export const config = { path: '/api/telegram' };

export default async (req) => {
  if (req.method !== 'POST' || !cfg().secret) return json({ ok: false }, 404);
  if (!safeEq(req.headers.get('x-telegram-bot-api-secret-token') || '', webhookSecret())) return json({ ok: false }, 403);
  const update = await req.json().catch(() => null);
  if (update) {
    try { await handleUpdate(update, new URL(req.url).origin); }
    catch (e) { console.error('Update:', e.message); } // always 200 so Telegram does not retry
  }
  return json({ ok: true });
};
