import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// Backends, picked by environment:
//  - SUVFILTER_LOCAL=1 (tests): JSON file in tmp
//  - Upstash Redis REST (Vercel Marketplace / KV): KV_REST_API_URL + KV_REST_API_TOKEN
//  - otherwise Netlify Blobs
const LOCAL = process.env.SUVFILTER_LOCAL === '1';
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const REDIS = !LOCAL && !!REDIS_URL && !!REDIS_TOKEN;
const PREFIX = 'sf:';
const file = path.join(os.tmpdir(), 'suvfilter-local.json');
const readLocal = () => { try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return {}; } };

async function redis(cmd) {
  const r = await fetch(REDIS_URL, { method: 'POST', headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' }, body: JSON.stringify(cmd) });
  const j = await r.json();
  if (j.error) throw new Error('Redis: ' + j.error);
  return j.result;
}

let blobs;
async function b() {
  if (!blobs) { const { getStore } = await import('@netlify/blobs'); blobs = getStore({ name: 'suvfilter', consistency: 'strong' }); }
  return blobs;
}

export const store = {
  async get(key) {
    if (LOCAL) return readLocal()[key] ?? null;
    if (REDIS) { const v = await redis(['GET', PREFIX + key]); return v == null ? null : JSON.parse(v); }
    return (await (await b()).get(key, { type: 'json' })) ?? null;
  },
  async set(key, value) {
    if (LOCAL) { const d = readLocal(); d[key] = value; fs.writeFileSync(file, JSON.stringify(d)); return; }
    if (REDIS) { await redis(['SET', PREFIX + key, JSON.stringify(value)]); return; }
    await (await b()).setJSON(key, value);
  },
  async del(key) {
    if (LOCAL) { const d = readLocal(); delete d[key]; fs.writeFileSync(file, JSON.stringify(d)); return; }
    if (REDIS) { await redis(['DEL', PREFIX + key]); return; }
    await (await b()).delete(key);
  },
  async keys(prefix) {
    if (LOCAL) return Object.keys(readLocal()).filter((k) => k.startsWith(prefix));
    if (REDIS) return (await redis(['KEYS', PREFIX + prefix + '*'])).map((k) => k.slice(PREFIX.length));
    return (await (await b()).list({ prefix })).blobs.map((x) => x.key);
  },
};

export async function nextId() {
  if (REDIS) return Number(await redis(['INCR', PREFIX + 'counter:n'])); // atomic
  const c = (await store.get('counter')) || { n: 0 };
  c.n += 1; await store.set('counter', c); return c.n;
}
export const reqKey = (id) => 'req/' + String(id).padStart(8, '0');
export async function listRequests() {
  const keys = (await store.keys('req/')).sort().reverse().slice(0, 300);
  return (await Promise.all(keys.map((k) => store.get(k)))).filter(Boolean);
}
export const getChats = async () => (await store.get('chats')) || [];
