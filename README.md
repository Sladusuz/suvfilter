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

## Deploy
Muhit o'zgaruvchilari o'zgarganda saytni qayta deploy qilish kerak.

## Vercel'da joylash (Netlify o'rniga)
Kod ikkala joyda ishlaydi. Saqlash joyi muhitga qarab tanlanadi:
`KV_REST_API_URL` + `KV_REST_API_TOKEN` bo'lsa Upstash Redis, aks holda Netlify Blobs.

1. vercel.com -> Add New -> Project -> `suvfilter` repozitoriysini import qiling (Framework: Other).
2. Project -> Storage -> Create Database -> **Upstash (Redis)** -> shu loyihaga ulang. `KV_REST_API_URL` va `KV_REST_API_TOKEN` o'zi qo'shiladi.
3. Settings -> Environment Variables: `TELEGRAM_BOT_TOKEN`, `BIND_CODE`, `ADMIN_USER`, `ADMIN_PASSWORD`, `SESSION_SECRET`.
4. Deployments -> Redeploy.
5. Domen: Settings -> Domains -> domenni qo'shing, Vercel ko'rsatgan DNS yozuvlarini qo'ying.
6. Yangi domendagi `/admin.html` ga kiring: bot webhook o'zi ulanadi. Botga `/start <BIND_CODE>` yozing.

Tuzilma: `api/` Vercel funksiyalari (ingichka qobiq), `netlify/functions/` va `netlify/lib/` asosiy mantiq, `lib/adapt.mjs` Vercel uchun moslashtiruvchi.
