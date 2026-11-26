import { save } from './_store.js';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const tok = process.env.PUSH_TOKEN;
  if (!tok || req.headers.authorization !== `Bearer ${tok}`) return res.status(401).json({ error: 'unauthorized' });
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  if (!body || !body.state) return res.status(400).json({ error: 'missing state' });
  await save({ ...body, received_at: new Date().toISOString() });
  res.status(200).json({ ok: true });
}
