# Suv Filter Samarqand

Aura Cebilon Pro sayti: zayavka formasi, admin panel va Telegram bot.
Cloudflare Workers'da ishlaydi (statik fayllar + Worker + KV saqlash).

## Joylash (Cloudflare)
- `wrangler.jsonc`: Worker nomi, statik papka (`public/`), KV ulanishi (`KV`).
- Sozlamalar (Secrets): `TELEGRAM_BOT_TOKEN`, `BIND_CODE`, `ADMIN_USER`, `ADMIN_PASSWORD`, `SESSION_SECRET`.
  Dashboard: Workers & Pages -> suvfilter -> Settings -> Variables and Secrets.
- Deploy: `npx wrangler deploy` yoki GitHub'ga ulangan avtomatik deploy (Settings -> Builds).
- Admin panelga (`/admin.html`) kirilganda bot webhook'i joriy manzilga o'zi ulanadi.
  Botga `/start <BIND_CODE>` yozgan chat zayavkalarni oladi.

## Tuzilma
- `public/` sayt va admin panel
- `worker.mjs` Cloudflare Worker kirish nuqtasi (`/api/*`)
- `lib/` asosiy mantiq: `store.mjs` saqlash (KV yoki Redis), `bot.mjs` Telegram bot, `core.mjs` umumiy,
  `handlers/` forma, admin va webhook
- `api/`, `vercel.json`, `lib/adapt.mjs`: Vercel uchun (hozir ishlatilmaydi)
- `functions/`: Cloudflare Pages uchun (hozir ishlatilmaydi)
