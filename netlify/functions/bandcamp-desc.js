// Netlify Function: bandcamp-desc
// Принимает URL страницы Bandcamp (album / track)
// Возвращает описание альбома/трека из поля TralbumData.current.about
// или fallback из meta og:description

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    };

    if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
    if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'POST only' }) };

    let body;
    try { body = JSON.parse(event.body); }
    catch { return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) }; }

    const { url } = body;
    if (!url) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing url' }) };

    try {
        // Получаем финальный URL (следуем редиректам band.link и других сервисов)
        const finalUrl = await resolveUrl(url);

        if (!finalUrl || !finalUrl.includes('bandcamp.com')) {
            return { statusCode: 422, headers, body: JSON.stringify({ error: 'Not a Bandcamp URL after redirect', resolvedUrl: finalUrl }) };
        }

        const pageRes = await fetch(finalUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml',
                'Accept-Language': 'en-US,en;q=0.9',
            }
        });

        if (!pageRes.ok) {
            return { statusCode: 502, headers, body: JSON.stringify({ error: `Bandcamp fetch failed: ${pageRes.status}` }) };
        }

        const html = await pageRes.text();

        // ── Метод 1: TralbumData.current.about (самый полный текст) ──────────
        let description = null;
        const tralbumMatch = html.match(/TralbumData\s*=\s*(\{[\s\S]+?\});\s*(?:\/\/|<\/script>|\n\s*[a-zA-Z])/);
        if (tralbumMatch) {
            try {
                const cleaned = tralbumMatch[1].replace(/\/\*[\s\S]*?\*\//g, '');
                const aboutMatch = cleaned.match(/"about"\s*:\s*"((?:[^"\\]|\\.)*)"/);
                if (aboutMatch) {
                    description = aboutMatch[1]
                        .replace(/\\n/g, '\n')
                        .replace(/\\r/g, '')
                        .replace(/\\t/g, ' ')
                        .replace(/\\"/g, '"')
                        .replace(/\\\\/g, '\\')
                        .trim();
                }
            } catch (_) { /* ignore */ }
        }

        // ── Метод 2: og:description мета-тег (краткое, но надёжное) ──────────
        if (!description) {
            const ogDescMatch = html.match(/<meta\s+(?:property="og:description"|name="description")\s+content="([^"]+)"/i) ||
                                html.match(/content="([^"]+)"\s+(?:property="og:description"|name="description")/i);
            if (ogDescMatch) {
                description = decodeHtmlEntities(ogDescMatch[1]).trim();
            }
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ description: description || null, resolvedUrl: finalUrl }),
        };

    } catch (e) {
        return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
    }
};

// Следуем редиректам и возвращаем финальный URL
async function resolveUrl(url) {
    try {
        const res = await fetch(url, {
            method: 'HEAD',
            redirect: 'follow',
            headers: { 'User-Agent': 'Mozilla/5.0' },
        });
        return res.url;
    } catch {
        return url;
    }
}

function decodeHtmlEntities(str) {
    return str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ');
}

