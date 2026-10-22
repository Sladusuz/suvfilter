import { getStore } from '@netlify/blobs';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// Production: Netlify Blobs. SUVFILTER_LOCAL=1 (tests): JSON file in tmp.
const LOCAL = process.env.SUVFILTER_LOCAL === '1';
const file = path.join(os.tmpdir(), 'suvfilter-local.json');
const readLocal = () => { try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return {}; } };

let blobs;
const b = () => (blobs ||= getStore({ name: 'suvfilter', consistency: 'strong' }));

export const store = {
  async get(key) {
    if (LOCAL) return readLocal()[key] ?? null;
    return (await b().get(key, { type: 'json' })) ?? null;
  },
  async set(key, value) {
    if (LOCAL) { const d = readLocal(); d[key] = value; fs.writeFileSync(file, JSON.stringify(d)); return; }
    await b().setJSON(key, value);
  },
  async del(key) {
    if (LOCAL) { const d = readLocal(); delete d[key]; fs.writeFileSync(file, JSON.stringify(d)); return; }
    await b().delete(key);
  },
  async keys(prefix) {
    if (LOCAL) return Object.keys(readLocal()).filter((k) => k.startsWith(prefix));
    return (await b().list({ prefix })).blobs.map((x) => x.key);
  },
};

export async function nextId() {
  const c = (await store.get('counter')) || { n: 0 };
  c.n += 1; await store.set('counter', c); return c.n;
}
export const reqKey = (id) => 'req/' + String(id).padStart(8, '0');
export async function listRequests() {
  const keys = (await store.keys('req/')).sort().reverse().slice(0, 300);
  return (await Promise.all(keys.map((k) => store.get(k)))).filter(Boolean);
}
export const getChats = async () => (await store.get('chats')) || [];
