import crypto from 'node:crypto';
import { store, getChats } from './store.mjs';

const env = (k) => process.env[k] || '';
export const cfg = () => ({
  token: env('TELEGRAM_BOT_TOKEN'), bind: env('BIND_CODE'),
  user: env('ADMIN_USER') || 'admin', pass: env('ADMIN_PASSWORD'), secret: env('SESSION_SECRET'),
});

export const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...headers } });

// ---------- telegram ----------
export async function tg(method, body) {
  const r = await fetch(`https://api.telegram.org/bot${cfg().token}/${method}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  const j = await r.json();
  if (!j.ok) throw new Error(j.description);
  return j.result;
}
export const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

export async function notify(r) {
  const text =
    `🆕 <b>Yangi zayavka #${r.id}</b>\n\n` +
    `👤 <b>Ism:</b> ${esc(r.name)}\n` +
    `📞 <b>Telefon:</b> ${esc(r.phone)}\n` +
    (r.tgUser ? `✈️ <b>Telegram:</b> ${esc(r.tgUser)}\n` : '') +
    `📍 <b>Manba:</b> ${r.source === 'bot' ? 'Telegram bot' : 'Sayt'}\n` +
    (r.message ? `💬 <b>Xabar:</b> ${esc(r.message)}\n` : '') +
    `\n🕒 ${new Date(r.createdAt).toLocaleString('uz-UZ', { timeZone: 'Asia/Samarkand' })}`;
  const chats = await getChats();
  const res = await Promise.allSettled(chats.map((chat_id) => tg('sendMessage', { chat_id, text, parse_mode: 'HTML' })));
  res.filter((x) => x.status === 'rejected').forEach((x) => console.error('Telegram:', x.reason.message));
  return res.some((x) => x.status === 'fulfilled');
}

// ---------- auth ----------
const sign = (v) => crypto.createHmac('sha256', cfg().secret).update(v).digest('hex');
export const safeEq = (a, b) => {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};
export const makeToken = () => { const exp = String(Date.now() + 7 * 864e5); return `${exp}.${sign(exp)}`; };
export function isAdmin(req) {
  const t = (req.headers.get('cookie') || '').split(/;\s*/).map((c) => c.split('=')).find(([k]) => k === 'sid')?.[1];
  if (!t || !cfg().secret) return false;
  const [exp, sig] = t.split('.');
  return !!sig && safeEq(sig, sign(exp)) && Number(exp) > Date.now();
}
export const webhookSecret = () => crypto.createHash('sha256').update('wh:' + cfg().secret).digest('hex').slice(0, 40);

// ---------- webhook ----------
export const BOT_SHORT = '💧 Aura Cebilon: 4 990 000 so\'mdan. 0% to\'lov. Yetkazish, o\'rnatish, servis BEPUL!';
export const BOT_ABOUT = 'Suv Filter Samarqand 💧\n\nAura Cebilon — suvni tozalashning yangi standarti. Original Germaniya texnologiyasi.\n\n💰 Narxlar: 4 990 000 — 14 990 000 so\'m\n💳 Foizsiz muddatli to\'lov\n🎁 Yetkazib berish, o\'rnatish va servis — BEPUL\n🎬 Demo xizmati\n\nBoshlash uchun START ni bosing 👇';

export async function ensureWebhook(origin) {
  const url = origin + '/api/telegram';
  const info = await tg('getWebhookInfo', {});
  if (info.url === url) {
    // keep the bot profile texts current without re-registering the webhook
    const s = await tg('getMyShortDescription', {}).catch(() => ({}));
    if (s.short_description !== BOT_SHORT) {
      await tg('setMyShortDescription', { short_description: BOT_SHORT }).catch(() => {});
      await tg('setMyDescription', { description: BOT_ABOUT }).catch(() => {});
    }
    return true;
  }
  await tg('setWebhook', { url, secret_token: webhookSecret(), allowed_updates: ['message', 'callback_query'] });
  await tg('setMyCommands', { commands: [
    { command: 'start', description: '💧 Bosh menyu' },
    { command: 'menu', description: '🏠 Menyuni ochish' },
    { command: 'cancel', description: '✖️ Zayavkani bekor qilish' },
  ] }).catch(() => {});
  await tg('setMyShortDescription', { short_description: BOT_SHORT }).catch(() => {});
  await tg('setMyDescription', { description: BOT_ABOUT }).catch(() => {});
  return true;
}
