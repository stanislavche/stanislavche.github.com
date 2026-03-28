// Netlify Function: save-data
// Принимает { password, data } → обновляет public/data.json в GitHub репозитории
// Netlify пересобирает сайт автоматически после push'а
//
// Переменные окружения (Netlify → Site settings → Environment variables):
//   ADMIN_PASSWORD  — пароль для входа в админку (по умолчанию S_TN)
//   GITHUB_TOKEN    — Personal Access Token (Settings → Developer settings → PAT)
//                     нужны права: repo → contents (write)
//   GITHUB_OWNER    — твой логин GitHub (напр: stanislavche)
//   GITHUB_REPO     — название репозитория (напр: stanislavche.github.io)
//   DATA_FILE_PATH  — путь к файлу в репо (по умолчанию: public/data.json)

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    let body;
    try {
        body = JSON.parse(event.body);
    } catch {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) };
    }

    const { password, data } = body;

    // Проверка пароля
    const adminPassword = process.env.ADMIN_PASSWORD || 'S_TN';
    if (!password || password !== adminPassword) {
        return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    // Параметры GitHub
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo  = process.env.GITHUB_REPO;
    const filePath = process.env.DATA_FILE_PATH || 'public/data.json';

    if (!token || !owner || !repo) {
        return {
            statusCode: 500, headers,
            body: JSON.stringify({ error: 'Missing env vars: GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO' })
        };
    }

    const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const authHeader = `Bearer ${token}`;

    try {
        // 1. Получаем текущий SHA файла (нужен для обновления)
        const getRes = await fetch(apiBase, {
            headers: { Authorization: authHeader, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' }
        });

        if (!getRes.ok) {
            const err = await getRes.text();
            return { statusCode: 502, headers, body: JSON.stringify({ error: `GitHub GET failed: ${err}` }) };
        }

        const fileInfo = await getRes.json();
        const sha = fileInfo.sha;

        // 2. Кодируем новый контент в base64
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
                branch: process.env.GITHUB_BRANCH || 'main',
            }),
        });

        if (!putRes.ok) {
            const err = await putRes.text();
            return { statusCode: 502, headers, body: JSON.stringify({ error: `GitHub PUT failed: ${err}` }) };
        }

        return {
            statusCode: 200, headers,
            body: JSON.stringify({ ok: true, message: 'Saved! Site will rebuild in ~1 min.' })
        };

    } catch (e) {
        return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
    }
};

