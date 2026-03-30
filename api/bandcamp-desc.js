// Vercel Serverless Function: bandcamp-desc
// Принимает { url } → возвращает описание Bandcamp альбома/трека
// Переконвертировано из netlify/functions/bandcamp-desc.js

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

    const { url } = req.body || {};
    if (!url) return res.status(400).json({ error: 'Missing url' });

    try {
        const finalUrl = await resolveUrl(url);

        if (!finalUrl || !finalUrl.includes('bandcamp.com')) {
            return res.status(422).json({ error: 'Not a Bandcamp URL after redirect', resolvedUrl: finalUrl });
        }

        const pageRes = await fetch(finalUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml',
                'Accept-Language': 'en-US,en;q=0.9',
            }
        });

        if (!pageRes.ok) {
            return res.status(502).json({ error: `Bandcamp fetch failed: ${pageRes.status}` });
        }

        const html = await pageRes.text();

        // Метод 1: TralbumData.current.about
        let description = null;
        const tralbumMatch = html.match(/TralbumData\s*=\s*(\{[\s\S]+?\});\s*(?:\/\/|<\/script>|\n\s*[a-zA-Z])/);
        if (tralbumMatch) {
            try {
                const cleaned = tralbumMatch[1].replace(/\/\*[\s\S]*?\*\//g, '');
                const aboutMatch = cleaned.match(/"about"\s*:\s*"((?:[^"\\]|\\.)*)"/);
                if (aboutMatch) {
                    description = aboutMatch[1]
                        .replace(/\\n/g, '\n').replace(/\\r/g, '').replace(/\\t/g, ' ')
                        .replace(/\\"/g, '"').replace(/\\\\/g, '\\').trim();
                }
            } catch (_) {}
        }

        // Метод 2: og:description
        if (!description) {
            const ogDescMatch = html.match(/<meta\s+(?:property="og:description"|name="description")\s+content="([^"]+)"/i) ||
                                html.match(/content="([^"]+)"\s+(?:property="og:description"|name="description")/i);
            if (ogDescMatch) description = decodeHtmlEntities(ogDescMatch[1]).trim();
        }

        return res.status(200).json({ description: description || null, resolvedUrl: finalUrl });

    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

async function resolveUrl(url) {
    try {
        const r = await fetch(url, { method: 'HEAD', redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0' } });
        return r.url;
    } catch { return url; }
}

function decodeHtmlEntities(str) {
    return str
        .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
}

