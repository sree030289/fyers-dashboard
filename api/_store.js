import { getCache } from '@vercel/functions';
const KEY = 'paper-desk-state-v1';
globalThis.__desk = globalThis.__desk || null;
export async function save(obj) {
  globalThis.__desk = obj;
  try { await getCache().set(KEY, obj, { ttl: 86400 * 3, name: 'paper-desk' }); } catch (e) { console.error('cache set', e); }
}
export async function load() {
  try { const v = await getCache().get(KEY); if (v) return v; } catch (e) { console.error('cache get', e); }
  return globalThis.__desk;
}
