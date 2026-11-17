const { get, save } = require('./_db');
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (req.method === 'GET') return res.status(200).json(await get());
    if (req.method === 'POST') {
      const ok = process.env.ADMIN_PASSWORD && req.headers['x-admin-password'] === process.env.ADMIN_PASSWORD;
      if (!ok) return res.status(401).json({ error: 'wrong password' });
      const b = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      if (b.check) return res.status(200).json({ ok: true });
      if (!b.data || !b.data.brand) return res.status(400).json({ error: 'bad data' });
      await save(b.data);
      return res.status(200).json({ ok: true });
    }
    res.status(405).end();
  } catch (e) { res.status(500).json({ error: String(e.message || e) }); }
};
