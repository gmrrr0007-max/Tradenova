const U = process.env.SUPABASE_URL, K = process.env.SUPABASE_SERVICE_KEY;
const H = { apikey: K, Authorization: 'Bearer ' + K, 'Content-Type': 'application/json' };
exports.get = async () => {
  if (!U || !K) return null;
  try {
    const r = await fetch(U + '/rest/v1/site?id=eq.main&select=data', { headers: H });
    const j = await r.json();
    return j[0] ? j[0].data : null;
  } catch (e) { return null; }
};
exports.save = async (d) => {
  const r = await fetch(U + '/rest/v1/site', {
    method: 'POST',
    headers: { ...H, Prefer: 'resolution=merge-duplicates' },
    body: JSON.stringify({ id: 'main', data: d })
  });
  if (!r.ok) throw new Error(await r.text());
};
