// Netlify Function: upload-image
// Принимает { password, filename, content (base64), folder } 
// Загружает изображение в GitHub репозиторий
// folder: "albums" | "extra" | "games" (подпапка в public/images/)

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
    };

    if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
    if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

    let body;
    try { body = JSON.parse(event.body); }
    catch { return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) }; }

    const { password, filename, content, folder = 'albums' } = body;

    const adminPassword = process.env.ADMIN_PASSWORD || 'S_TN';
    if (!password || password !== adminPassword) {
        return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    if (!filename || !content) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing filename or content' }) };
    }

    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo  = process.env.GITHUB_REPO;

    if (!token || !owner || !repo) {
        return { statusCode: 500, headers, body: JSON.stringify({ error: 'Missing GitHub env vars' }) };
    }

    // Sanitize filename
    const safeName = filename.replace(/[^a-zA-Z0-9._\-\s]/g, '').replace(/\s+/g, '_');
    const filePath = `public/images/${folder}/${safeName}`;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const authHeader = `Bearer ${token}`;

    try {
        // Проверяем существует ли файл уже (нужен SHA для обновления)
        let sha;
        const getRes = await fetch(apiUrl, {
            headers: { Authorization: authHeader, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' }
        });
        if (getRes.ok) {
            const existing = await getRes.json();
            sha = existing.sha;
        }

        // Загружаем файл
        const putBody = {
            message: `Admin: upload image ${safeName}`,
            content: content, // уже base64
            branch: process.env.GITHUB_BRANCH || 'main',
        };
        if (sha) putBody.sha = sha; // обновляем существующий

        const putRes = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                Authorization: authHeader,
                Accept: 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(putBody),
        });

        if (!putRes.ok) {
            const err = await putRes.text();
            return { statusCode: 502, headers, body: JSON.stringify({ error: `GitHub error: ${err}` }) };
        }

        // Возвращаем путь для использования в data.json
        const publicPath = `../images/${folder}/${safeName}`;

        return {
            statusCode: 200, headers,
            body: JSON.stringify({ ok: true, path: publicPath, filename: safeName })
        };

    } catch (e) {
        return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
    }
};

