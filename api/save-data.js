// Vercel Serverless Function: save-data
// Принимает { password, data } → обновляет public/data.json в GitHub репозитории
//
// Переменные окружения (Vercel → Project Settings → Environment Variables):
//   ADMIN_PASSWORD  — пароль для входа в админку
//   GITHUB_TOKEN    — Personal Access Token (repo → contents write)
//   GITHUB_OWNER    — логин GitHub (напр: stanislavche)
//   GITHUB_REPO     — название репозитория
//   GITHUB_BRANCH   — ветка (по умолчанию: master)
//   DATA_FILE_PATH  — путь к файлу (по умолчанию: public/data.json)

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { password, data } = req.body || {};

    const adminPassword = process.env.ADMIN_PASSWORD || 'S_TN';
    if (!password || password !== adminPassword) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token    = process.env.GITHUB_TOKEN;
    const owner    = process.env.GITHUB_OWNER;
    const repo     = process.env.GITHUB_REPO;
    const filePath = process.env.DATA_FILE_PATH || 'public/data.json';

    if (!token || !owner || !repo) {
        return res.status(500).json({ error: 'Missing env vars: GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO' });
    }

    const apiBase   = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const authHeader = `Bearer ${token}`;

    try {
        // 1. Получаем текущий SHA файла
        const getRes = await fetch(apiBase, {
            headers: { Authorization: authHeader, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' }
        });
        if (!getRes.ok) {
            const err = await getRes.text();
            return res.status(502).json({ error: `GitHub GET failed: ${err}` });
        }
        const fileInfo = await getRes.json();
        const sha = fileInfo.sha;

        // 2. Кодируем контент в base64
        const newContent = Buffer.from(JSON.stringify(data, null, 2), 'utf8').toString('base64');

        // 3. Обновляем файл через GitHub API
        const putRes = await fetch(apiBase, {
            method: 'PUT',
            headers: {
                Authorization: authHeader,
                Accept: 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Admin: update data.json [${new Date().toISOString()}]`,
                content: newContent,
                sha,
                branch: process.env.GITHUB_BRANCH || 'master',
            }),
        });

        if (!putRes.ok) {
            const err = await putRes.text();
            return res.status(502).json({ error: `GitHub PUT failed: ${err}` });
        }

        return res.status(200).json({ ok: true, message: 'Saved! Site will rebuild in ~1 min.' });

    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

