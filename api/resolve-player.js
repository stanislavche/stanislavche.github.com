// Vercel Serverless Function: resolve-player
// Принимает { url } → возвращает ID/embed для Bandcamp / SoundCloud / YouTube
// Переконвертировано из netlify/functions/resolve-player.js

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

    const { url } = req.body || {};
    if (!url) return res.status(400).json({ error: 'Missing url' });

    try {
        // ── YouTube ───────────────────────���───────────────────────────────────
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = extractYouTubeId(url);
            if (!videoId) return res.status(422).json({ error: 'Cannot extract YouTube ID' });
            return res.status(200).json({
                platform: 'youtube', videoId,
                embedUrl: `https://www.youtube.com/embed/${videoId}`
            });
        }

        // ── SoundCloud ────────────────────────────────────────────────────────
        if (url.includes('soundcloud.com')) {
            const oembedRes = await fetch(
                `https://soundcloud.com/oembed?url=${encodeURIComponent(url)}&format=json`,
                { headers: { 'User-Agent': 'Mozilla/5.0' } }
            );
            if (!oembedRes.ok) throw new Error('SoundCloud oEmbed failed');
            const oembedData = await oembedRes.json();

            const trackIdMatch = oembedData.html?.match(/tracks%2F(\d+)/) ||
                                 oembedData.html?.match(/tracks\/(\d+)/);
            const trackId = trackIdMatch?.[1];
            const isPlaylist = url.includes('/sets/');

            return res.status(200).json({
                platform: 'soundcloud',
                trackId,
                isPlaylist,
                title: oembedData.title,
                author: oembedData.author_name,
                thumbnail: oembedData.thumbnail_url,
                embedUrl: trackId
                    ? `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%23f32e92&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false`
                    : null,
                rawHtml: oembedData.html,
            });
        }

        // ── Bandcamp ──────────────────────────────────────────────────────────
        if (url.includes('bandcamp.com')) {
            const pageRes = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': 'text/html,application/xhtml+xml',
                    'Accept-Language': 'en-US,en;q=0.9',
                }
            });
            if (!pageRes.ok) throw new Error(`Bandcamp fetch failed: ${pageRes.status}`);
            const html = await pageRes.text();

            const isTrack = url.includes('/track/');

            const embedMatch   = html.match(/EmbeddedPlayer\/(?:album|track)=(\d{6,12})/);
            const tralbumMatch = html.match(/TralbumData\s*=\s*({[\s\S]+?});\s*(?:\/\/|<\/script>)/);
            const dataItemMatch = html.match(/data-item-id="(\d{6,12})"/);
            const jsonIdMatch  = html.match(/"item_type"\s*:\s*"(album|track)"[\s\S]{0,200}?"id"\s*:\s*(\d{6,12})/) ||
                                 html.match(/"id"\s*:\s*(\d{6,12})[\s\S]{0,200}?"item_type"\s*:\s*"(album|track)"/);

            let numericId = null;
            let itemType  = isTrack ? 'track' : 'album';

            if (embedMatch) {
                numericId = embedMatch[1];
            } else if (dataItemMatch) {
                numericId = dataItemMatch[1];
            } else if (tralbumMatch) {
                try {
                    const cleaned = tralbumMatch[1].replace(/\/\*[\s\S]*?\*\//g, '');
                    const idMatch   = cleaned.match(/"id"\s*:\s*(\d{6,12})/);
                    const typeMatch = cleaned.match(/"item_type"\s*:\s*"(album|track)"/);
                    if (idMatch)   numericId = idMatch[1];
                    if (typeMatch) itemType  = typeMatch[1];
                } catch {}
            } else if (jsonIdMatch) {
                numericId = jsonIdMatch[2] || jsonIdMatch[1];
                itemType  = jsonIdMatch[1] || (isTrack ? 'track' : 'album');
            }

            const titleMatch  = html.match(/<meta property="og:title" content="([^"]+)"/);
            const artistMatch = html.match(/<meta property="og:site_name" content="([^"]+)"/);
            const imageMatch  = html.match(/<meta property="og:image" content="([^"]+)"/);

            const embedUrl = numericId
                ? `https://bandcamp.com/EmbeddedPlayer/${itemType}=${numericId}/size=large/bgcol=0d0010/linkcol=f32e92/tracklist=false/artwork=small/transparent=true/`
                : null;

            return res.status(200).json({
                platform: 'bandcamp',
                itemType,
                numericId: numericId ? Number(numericId) : null,
                title:  titleMatch?.[1]?.replace(' | ', ' - ') || '',
                artist: artistMatch?.[1] || '',
                thumbnail: imageMatch?.[1] || '',
                embedUrl,
                bandcampAlbum: itemType === 'album' && numericId ? Number(numericId) : undefined,
                bandcampTrack: itemType === 'track' && numericId ? Number(numericId) : undefined,
            });
        }

        return res.status(422).json({ error: 'Unsupported URL. Supported: YouTube, SoundCloud, Bandcamp' });

    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

function extractYouTubeId(url) {
    const patterns = [
        /[?&]v=([a-zA-Z0-9_-]{11})/,
        /youtu\.be\/([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const pattern of patterns) {
        const m = url.match(pattern);
        if (m) return m[1];
    }
    return null;
}

