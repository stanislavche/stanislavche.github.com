module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { password, filename, content, folder = 'albums' } = req.body || {};
    const adminPassword = process.env.ADMIN_PASSWORD || 'S_TN';
    if (!password || password !== adminPassword) return res.status(401).json({ error: 'Unauthorized' });
    if (!filename || !content) return res.status(400).json({ error: 'Missing filename or content' });
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo  = process.env.GITHUB_REPO;
    if (!token || !owner || !repo) return res.status(500).json({ error: 'Missing GitHub env vars' });
    const safeName = filename.replace(/[^a-zA-Z0-9._\-\s]/g, '').replace(/\s+/g, '_');
    const filePath = `public/images/${folder}/${safeName}`;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const authHeader = `Bearer ${token}`;
    try {
        let sha;
        const getRes = await fetch(apiUrl, { headers: { Authorization: authHeader, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' } });
        if (getRes.ok) sha = (await getRes.json()).sha;
        const putBody = { message: `Admin: upload image ${safeName}`, content, branch: process.env.GITHUB_BRANCH || 'master' };
        if (sha) putBody.sha = sha;
        const putRes = await fetch(apiUrl, { method: 'PUT', headers: { Authorization: authHeader, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'Content-Type': 'application/json' }, body: JSON.stringify(putBody) });
        if (!putRes.ok) return res.status(502).json({ error: `GitHub error: ${await putRes.text()}` });
        return res.status(200).json({ ok: true, path: `../images/${folder}/${safeName}`, filename: safeName });
    } catch (e) { return res.status(500).json({ error: e.message }); }
};
