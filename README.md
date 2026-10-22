# Suv Filter Samarqand

Aura Cebilon Pro sayti: zayavka formasi, admin panel va Telegram bot. Netlify'da ishlaydi
(statik sayt + Netlify Functions + Netlify Blobs).

## Netlify sozlamalari
Site configuration → Environment variables:

| Nom | Qiymat |
|---|---|
| `TELEGRAM_BOT_TOKEN` | BotFather tokeni |
| `BIND_CODE` | maxfiy kod; botga `/start <kod>` yozgan chat zayavka oladi |
| `ADMIN_USER` | admin login |
| `ADMIN_PASSWORD` | admin parol |
| `SESSION_SECRET` | uzun tasodifiy qator |

Build command bo'sh, publish directory `public` (netlify.toml'da yozilgan).
Deploydan keyin `/admin.html` ni oching: bot webhook o'zi ulanadi.

## Tuzilma
- `public/` sayt va admin panel
- `netlify/functions/` `requests` (forma), `admin` (login va panel API), `telegram` (bot webhook)
- `netlify/lib/` umumiy kod: xotira, Telegram, bot dialogi
