import { getenv } from './env.mjs';

// Storage backend, picked per call from the environment:
//  - SUVFILTER_LOCAL=1 (tests):  JSON file in tmp
//  - Cloudflare KV:              binding named KV (globalThis.__ENV.KV)
//  - Upstash Redis REST:         KV_REST_API_URL + KV_REST_API_TOKEN
//  - Netlify Blobs:              registered by the Netlify function wrappers
const PREFIX = 'sf:';
const kv = () => globalThis.__ENV?.KV;
const redisCfg = () => {
  const url = getenv('KV_REST_API_URL') || getenv('UPSTASH_REDIS_REST_URL');
  const token = getenv('KV_REST_API_TOKEN') || getenv('UPSTASH_REDIS_REST_TOKEN');
  return url && token ? { url, token } : null;
};
const local = () => getenv('SUVFILTER_LOCAL') === '1';

async function redis(cmd) {
  const { url, token } = redisCfg();
  const r = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(cmd) });
  const j = await r.json();
  if (j.error) throw new Error('Redis: ' + j.error);
  return j.result;
}

let blobs;
async function blobStore() {
  if (!globalThis.__SF_BLOBS) throw new Error('Saqlash joyi sozlanmagan (KV, Redis yoki Blobs kerak)');
  return (blobs ||= await globalThis.__SF_BLOBS());
}

// local test file (fs is loaded lazily so Workers never import it)
async function localFile() {
  const [{ default: fs }, { default: os }, { default: path }] = await Promise.all([import('node:fs'), import('node:os'), import('node:path')]);
  const file = path.join(os.tmpdir(), 'suvfilter-local.json');
  return { read: () => { try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return {}; } }, write: (d) => fs.writeFileSync(file, JSON.stringify(d)) };
}

export const store = {
  async get(key) {
    if (local()) return (await localFile()).read()[key] ?? null;
    if (kv()) return (await kv().get(PREFIX + key, 'json')) ?? null;
    if (redisCfg()) { const v = await redis(['GET', PREFIX + key]); return v == null ? null : JSON.parse(v); }
    return (await (await blobStore()).get(key, { type: 'json' })) ?? null;
  },
  async set(key, value) {
    if (local()) { const f = await localFile(); const d = f.read(); d[key] = value; f.write(d); return; }
    if (kv()) { await kv().put(PREFIX + key, JSON.stringify(value)); return; }
    if (redisCfg()) { await redis(['SET', PREFIX + key, JSON.stringify(value)]); return; }
    await (await blobStore()).setJSON(key, value);
  },
  async del(key) {
    if (local()) { const f = await localFile(); const d = f.read(); delete d[key]; f.write(d); return; }
    if (kv()) { await kv().delete(PREFIX + key); return; }
    if (redisCfg()) { await redis(['DEL', PREFIX + key]); return; }
    await (await blobStore()).delete(key);
  },
  async keys(prefix) {
    if (local()) return Object.keys((await localFile()).read()).filter((k) => k.startsWith(prefix));
    if (kv()) {
      const out = []; let cursor;
      do { const r = await kv().list({ prefix: PREFIX + prefix, cursor }); out.push(...r.keys.map((k) => k.name.slice(PREFIX.length))); cursor = r.list_complete ? undefined : r.cursor; } while (cursor);
      return out;
    }
    if (redisCfg()) return (await redis(['KEYS', PREFIX + prefix + '*'])).map((k) => k.slice(PREFIX.length));
    return (await (await blobStore()).list({ prefix })).blobs.map((x) => x.key);
  },
};

export async function nextId() {
  if (!local() && !kv() && redisCfg()) return Number(await redis(['INCR', PREFIX + 'counter:n'])); // atomic
  const c = (await store.get('counter')) || { n: 0 };
  c.n += 1; await store.set('counter', c); return c.n;
}
export const reqKey = (id) => 'req/' + String(id).padStart(8, '0');
export async function listRequests() {
  const keys = (await store.keys('req/')).sort().reverse().slice(0, 300);
  return (await Promise.all(keys.map((k) => store.get(k)))).filter(Boolean);
}
export const getChats = async () => (await store.get('chats')) || [];
