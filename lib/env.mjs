// Reads settings on any platform: Cloudflare puts them in globalThis.__ENV (set per request),
// Vercel and local runs use process.env.
export const getenv = (k) => globalThis.__ENV?.[k] ?? (typeof process !== 'undefined' ? process.env?.[k] : undefined);
