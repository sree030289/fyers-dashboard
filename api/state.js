import { load } from './_store.js';
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  const v = await load();
  if (!v) return res.status(200).json({ state: { status: 'waiting_for_engine' }, events: [], received_at: null });
  res.status(200).json(v);
}
