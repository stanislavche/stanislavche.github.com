import React, { useState, useEffect, useCallback, useRef } from 'react';
import './admin.scss';

// ─── Types ────────────────────────────────────────────────────────────────────

interface VisibleSections {
    bio: boolean; news: boolean; discography: boolean; game: boolean;
    player: boolean; events: boolean; donate: boolean; contacts: boolean;
    mup: boolean; emulator: boolean; kits: boolean;
}

interface NewsItem {
    show: boolean; date: number; title: string; description: string;
    link: string; type: 'image' | 'video' | 'text'; media: string;
}

interface DiscItem {
    show: boolean; type: 'album' | 'single'; title: string; author: string;
    year: string; bandcampAlbum?: number; bandcampTrack?: number;
    soundcloudPlayer?: string | number; youtubeId?: string;
    labelName: string; labelLink: string;
    releaseId: string; coverLink: string; downloadLink: string; tracklist: string[];
}

interface EventItem {
    date: string; country: string; city: string; title: string; link: string;
}

interface AppData {
    visibleSections: VisibleSections;
    bio: string;
    news: NewsItem[];
    discography: DiscItem[];
    events: EventItem[];
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const COUNTRIES = [
    { name: 'Russia',         flag: '🇷🇺' },
    { name: 'Latvia',         flag: '🇱🇻' },
    { name: 'Estonia',        flag: '🇪🇪' },
    { name: 'Germany',        flag: '🇩🇪' },
    { name: 'Georgia',        flag: '🇬🇪' },
    { name: 'Spain',          flag: '🇪🇸' },
    { name: 'Italy',          flag: '🇮🇹' },
    { name: 'Ukraine',        flag: '🇺🇦' },
    { name: 'Finland',        flag: '🇫🇮' },
    { name: 'Poland',         flag: '🇵🇱' },
    { name: 'Belarus',        flag: '🇧🇾' },
    { name: 'Czech Republic', flag: '🇨🇿' },
    { name: 'Netherlands',    flag: '🇳🇱' },
    { name: 'France',         flag: '🇫🇷' },
    { name: 'UK',             flag: '🇬🇧' },
    { name: 'USA',            flag: '🇺🇸' },
    { name: 'World Wide Chiptune Webshow', flag: '🌐' },
];

const emptyEvent = (): EventItem => ({ date: '', country: 'Russia', city: '', title: '', link: '' });
const emptyDisc = (): DiscItem => ({
    show: true, type: 'single', title: '', author: 'S_TN', year: String(new Date().getFullYear()),
    labelName: '', labelLink: '', releaseId: '', coverLink: '', downloadLink: '', tracklist: []
});
const emptyNews = (): NewsItem => ({
    show: true, date: Math.floor(Date.now() / 1000),
    title: '', description: '', link: '', type: 'image', media: ''
});

const ADMIN_KEY = 'stn_admin_auth';
// Пароль хранится в .env.local (не коммитится в git)
// Локально: VITE_ADMIN_PASSWORD в .env.local
// На Netlify: Site settings → Environment variables → VITE_ADMIN_PASSWORD
const DEFAULT_PASS = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;

// URL для загрузки данных (GitHub Raw — без ребилда при изменениях)
const _ghOwner  = import.meta.env.VITE_GITHUB_OWNER;
const _ghRepo   = import.meta.env.VITE_GITHUB_REPO;
const _ghBranch = import.meta.env.VITE_GITHUB_BRANCH || 'main';
const DATA_URL  = (_ghOwner && _ghRepo)
    ? `https://raw.githubusercontent.com/${_ghOwner}/${_ghRepo}/${_ghBranch}/public/data.json`
    : '/data.json';

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminPanel() {
    const [isAuth, setIsAuth] = useState(() => sessionStorage.getItem(ADMIN_KEY) === '1');
    const [pw, setPw] = useState('');
    const [pwError, setPwError] = useState(false);
    const [activeTab, setActiveTab] = useState<'events' | 'disc' | 'news' | 'bio' | 'settings'>('events');
    const [data, setData] = useState<AppData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [deploying, setDeploying] = useState(false);
    const [deployStatus, setDeployStatus] = useState<{ ok: boolean; msg: string } | null>(null);

    useEffect(() => {
        fetch(`${DATA_URL}?t=${Date.now()}`)
            .then(r => r.json())
            .then(d => { setData(d); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const login = () => {
        if (!DEFAULT_PASS) {
            // Если env не задан — блокируем вход
            setPwError(true); setTimeout(() => setPwError(false), 3000); return;
        }
        if (pw.toLowerCase() === DEFAULT_PASS.toLowerCase()) {
            sessionStorage.setItem(ADMIN_KEY, '1'); setIsAuth(true);
        } else { setPwError(true); setTimeout(() => setPwError(false), 2000); }
    };

    const downloadJson = useCallback(() => {
        if (!data) return;
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'data.json';
        a.click(); URL.revokeObjectURL(url);
        setSaved(true); setTimeout(() => setSaved(false), 3000);
    }, [data]);

    const saveAndDeploy = useCallback(async () => {
        if (!data) return;
        setDeploying(true);
        setDeployStatus(null);
        try {
            const res = await fetch('/api/save-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: pw, data }),
            });
            const json = await res.json();
            if (res.ok) {
                setDeployStatus({ ok: true, msg: '✓ Сохранено! Данные обновятся при следующем открытии сайта.' });
            } else {
                setDeployStatus({ ok: false, msg: `✗ Ошибка: ${json.error}` });
            }
        } catch (e: any) {
            setDeployStatus({ ok: false, msg: `✗ Нет связи с сервером. Используй Download.` });
        }
        setDeploying(false);
        setTimeout(() => setDeployStatus(null), 8000);
    }, [data, pw]);

    if (!isAuth) return (
        <div className="admin">
            <div className="admin__auth">
                <h1 className="admin__auth-title">S_TN Admin</h1>
                <input type="password" placeholder="password" value={pw}
                    onChange={e => setPw(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && login()}
                    style={{ width: 220 }} />
                <button className="admin__btn admin__btn--primary" onClick={login}>Enter</button>
                {pwError && <p className="admin__auth-error">✗ Неверный пароль (по умолчанию: s_tn)</p>}
            </div>
        </div>
    );

    if (loading || !data) return (
        <div className="admin" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <p style={{ color: '#f32e92' }}>Loading data.json...</p>
        </div>
    );

    return (
        <div className="admin">
            <header className="admin__header">
                <h1 className="admin__header-title">◆ S_TN ADMIN</h1>
                <div className="admin__header-actions">
                    {deployStatus && (
                        <span style={{ fontSize: 12, color: deployStatus.ok ? '#00ff88' : '#ff2244' }}>
                            {deployStatus.msg}
                        </span>
                    )}
                    {saved && <span style={{ color: '#00ff88', fontSize: 12 }}>✓ Downloaded!</span>}
                    <button className="admin__btn admin__btn--primary" onClick={saveAndDeploy} disabled={deploying}
                        title="Сохранить в GitHub → сайт пересоберётся автоматически">
                        {deploying ? '⏳ Saving...' : '🚀 Save & Deploy'}
                    </button>
                    <button className="admin__btn admin__btn--ghost" onClick={downloadJson}
                        title="Скачать data.json локально (резервная копия)">
                        ⬇ Download
                    </button>
                    <button className="admin__btn admin__btn--ghost"
                        onClick={() => { sessionStorage.removeItem(ADMIN_KEY); setIsAuth(false); }}>
                        Logout
                    </button>
                </div>
            </header>

            <nav className="admin__tabs">
                {(['events', 'disc', 'news', 'bio', 'settings'] as const).map(t => (
                    <button key={t} className={`admin__tab${activeTab === t ? ' admin__tab--active' : ''}`}
                        onClick={() => setActiveTab(t)}>
                        {{ events: '🎤 Events', disc: '💿 Discography', news: '📰 News', bio: '👤 Bio', settings: '⚙ Settings' }[t]}
                    </button>
                ))}
            </nav>

            <div className="admin__content">
                {activeTab === 'events' && (
                    <EventsTab data={data} onChange={d => setData({ ...data, events: d })} />
                )}
                {activeTab === 'disc' && (
                    <DiscTab data={data} pw={pw} onChange={d => setData({ ...data, discography: d })} />
                )}
                {activeTab === 'news' && (
                    <NewsTab data={data} pw={pw} onChange={d => setData({ ...data, news: d })} />
                )}
                {activeTab === 'bio' && (
                    <BioTab bio={data.bio} onChange={b => setData({ ...data, bio: b })} />
                )}
                {activeTab === 'settings' && (
                    <SettingsTab vs={data.visibleSections} onChange={vs => setData({ ...data, visibleSections: vs })} />
                )}
            </div>
        </div>
    );
}

// ─── Events Tab ───────────────────────────────────────────────────────────────

function EventsTab({ data, onChange }: { data: AppData; onChange: (d: EventItem[]) => void }) {
    const [editing, setEditing] = useState<EventItem | null>(null);
    const [editIdx, setEditIdx] = useState<number | null>(null);
    const [isNew, setIsNew] = useState(false);
    const events = data.events;

    const startNew = () => { setEditing(emptyEvent()); setEditIdx(null); setIsNew(true); };
    const startEdit = (idx: number) => { setEditing({ ...events[idx] }); setEditIdx(idx); setIsNew(false); };
    const cancel = () => { setEditing(null); setEditIdx(null); };

    const save = () => {
        if (!editing) return;
        const list = [...events];
        if (isNew) list.unshift(editing);
        else if (editIdx !== null) list[editIdx] = editing;
        onChange(list);
        setEditing(null); setEditIdx(null);
    };

    const remove = (idx: number) => {
        if (!confirm('Delete this event?')) return;
        onChange(events.filter((_, i) => i !== idx));
    };

    const move = (idx: number, dir: -1 | 1) => {
        const list = [...events];
        const ni = idx + dir;
        if (ni < 0 || ni >= list.length) return;
        [list[idx], list[ni]] = [list[ni], list[idx]];
        onChange(list);
    };

    const upd = (f: keyof EventItem, v: string) =>
        setEditing(prev => prev ? { ...prev, [f]: v } : prev);

    return (
        <>
            <div className="admin__section-header">
                <h2>Events ({events.length})</h2>
                <button className="admin__btn admin__btn--primary" onClick={startNew}>+ Add Event</button>
            </div>

            {editing && (
                <div className="admin__form">
                    <p className="admin__form-title">{isNew ? 'New Event' : 'Edit Event'}</p>
                    <div className="admin__form-grid">
                        <div className="admin__form-group">
                            <label>Date</label>
                            <input type="text" placeholder="21 February 2026" value={editing.date} onChange={e => upd('date', e.target.value)} />
                        </div>
                        <div className="admin__form-group">
                            <label>Country</label>
                            <select value={editing.country} onChange={e => upd('country', e.target.value)}>
                                {COUNTRIES.map(c => (
                                    <option key={c.name} value={c.name}>{c.flag} {c.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="admin__form-group">
                            <label>City</label>
                            <input type="text" value={editing.city} onChange={e => upd('city', e.target.value)} />
                        </div>
                        <div className="admin__form-group">
                            <label>Title</label>
                            <input type="text" value={editing.title} onChange={e => upd('title', e.target.value)} />
                        </div>
                        <div className="admin__form-group admin__form-group--full">
                            <label>Link</label>
                            <input type="text" value={editing.link} onChange={e => upd('link', e.target.value)} />
                        </div>
                    </div>
                    <div className="admin__form-actions">
                        <button className="admin__btn admin__btn--primary" onClick={save}>Save</button>
                        <button className="admin__btn admin__btn--ghost" onClick={cancel}>Cancel</button>
                    </div>
                </div>
            )}

            <ul className="admin__list">
                {events.map((ev, i) => (
                    <li key={i} className="admin__list-item">
                        <div className="admin__list-item-info">
                            <div className="admin__list-item-title">{ev.title}</div>
                            <div className="admin__list-item-meta">{ev.date} · {COUNTRIES.find(c => c.name === ev.country)?.flag || ''} {ev.country}, {ev.city}</div>
                        </div>
                        <div className="admin__list-item-actions">
                            <button className="admin__btn admin__btn--icon" onClick={() => move(i, -1)} title="Up">▲</button>
                            <button className="admin__btn admin__btn--icon" onClick={() => move(i, 1)} title="Down">▼</button>
                            <button className="admin__btn admin__btn--icon" onClick={() => startEdit(i)}>✎</button>
                            <button className="admin__btn admin__btn--danger" onClick={() => remove(i)}>✕</button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

// ─── Discography Tab ──────────────────────────────────────────────────────────

function DiscTab({ data, pw = '', onChange }: { data: AppData; pw?: string; onChange: (d: DiscItem[]) => void }) {
    const [filter, setFilter] = useState<'all' | 'album' | 'single'>('all');
    const [editing, setEditing] = useState<DiscItem | null>(null);
    const [editIdx, setEditIdx] = useState<number | null>(null);
    const [isNew, setIsNew] = useState(false);
    const disc = data.discography;

    const filtered = filter === 'all' ? disc : disc.filter(d => d.type === filter);

    const startNew = () => { setEditing(emptyDisc()); setEditIdx(null); setIsNew(true); };
    const startEdit = (idx: number) => { setEditing({ ...disc[idx], tracklist: [...(disc[idx].tracklist || [])] }); setEditIdx(idx); setIsNew(false); };
    const cancel = () => { setEditing(null); setEditIdx(null); };

    const save = () => {
        if (!editing) return;
        const list = [...disc];
        if (isNew) list.unshift(editing);
        else if (editIdx !== null) list[editIdx] = editing;
        onChange(list);
        setEditing(null); setEditIdx(null);
    };

    const remove = (realIdx: number) => {
        if (!confirm('Delete this release?')) return;
        onChange(disc.filter((_, i) => i !== realIdx));
    };

    const toggleShow = (realIdx: number) => {
        const list = disc.map((d, i) => i === realIdx ? { ...d, show: !d.show } : d);
        onChange(list);
    };

    const upd = <K extends keyof DiscItem>(f: K, v: DiscItem[K]) =>
        setEditing(prev => prev ? { ...prev, [f]: v } : prev);

    const updTrack = (i: number, v: string) => {
        if (!editing) return;
        const tl = [...editing.tracklist]; tl[i] = v;
        setEditing({ ...editing, tracklist: tl });
    };
    const addTrack = () => setEditing(prev => prev ? { ...prev, tracklist: [...prev.tracklist, ''] } : prev);
    const removeTrack = (i: number) => setEditing(prev => prev ? { ...prev, tracklist: prev.tracklist.filter((_, ti) => ti !== i) } : prev);

    // Get the real index in disc for filtered items
    const getRealIdx = (filteredItem: DiscItem) => disc.indexOf(filteredItem);

    return (
        <>
            <div className="admin__section-header">
                <h2>Discography ({disc.length})</h2>
                <div style={{ display: 'flex', gap: 8 }}>
                    {(['all', 'album', 'single'] as const).map(f => (
                        <button key={f} className={`admin__btn ${filter === f ? 'admin__btn--primary' : 'admin__btn--ghost'}`}
                            onClick={() => setFilter(f)} style={{ textTransform: 'capitalize' }}>{f}</button>
                    ))}
                    <button className="admin__btn admin__btn--secondary" onClick={startNew}>+ Add</button>
                </div>
            </div>

            {editing && (
                <div className="admin__form">
                    <p className="admin__form-title">{isNew ? 'New Release' : 'Edit Release'}</p>
                    <div className="admin__form-grid">
                        <div className="admin__form-group">
                            <label>Type</label>
                            <select value={editing.type} onChange={e => upd('type', e.target.value as 'album' | 'single')}>
                                <option value="album">Album</option>
                                <option value="single">Single / Compilation</option>
                            </select>
                        </div>
                        <div className="admin__form-group">
                            <label>Show</label>
                            <select value={editing.show ? 'yes' : 'no'} onChange={e => upd('show', e.target.value === 'yes')}>
                                <option value="yes">Visible</option>
                                <option value="no">Hidden</option>
                            </select>
                        </div>
                        <div className="admin__form-group">
                            <label>Title</label>
                            <input type="text" value={editing.title} onChange={e => upd('title', e.target.value)} />
                        </div>
                        <div className="admin__form-group">
                            <label>Author</label>
                            <input type="text" value={editing.author} onChange={e => upd('author', e.target.value)} />
                        </div>
                        <div className="admin__form-group">
                            <label>Year</label>
                            <input type="text" value={editing.year} onChange={e => upd('year', e.target.value)} />
                        </div>
                        <div className="admin__form-group">
                            <label>Label Name</label>
                            <input type="text" value={editing.labelName} onChange={e => upd('labelName', e.target.value)} />
                        </div>
                        <div className="admin__form-group">
                            <label>Label Link</label>
                            <input type="text" value={editing.labelLink} onChange={e => upd('labelLink', e.target.value)} />
                        </div>
                        <div className="admin__form-group">
                            <label>Release ID</label>
                            <input type="text" value={editing.releaseId} onChange={e => upd('releaseId', e.target.value)} />
                        </div>
                        <div className="admin__form-group">
                            <label>Bandcamp Album ID</label>
                            <input type="number" value={editing.bandcampAlbum ?? ''} onChange={e => upd('bandcampAlbum', e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                        <div className="admin__form-group">
                            <label>Bandcamp Track ID</label>
                            <input type="number" value={editing.bandcampTrack ?? ''} onChange={e => upd('bandcampTrack', e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                        <div className="admin__form-group">
                            <label>SoundCloud Player ID</label>
                            <input type="text" value={editing.soundcloudPlayer ?? ''} onChange={e => upd('soundcloudPlayer', e.target.value)} />
                        </div>
                        <div className="admin__form-group">
                            <label>YouTube Video ID</label>
                            <input type="text" placeholder="dQw4w9WgXcQ" value={editing.youtubeId ?? ''} onChange={e => upd('youtubeId', e.target.value || undefined)} />
                        </div>
                        <div className="admin__form-group admin__form-group--full">
                            <label>Cover Link (e.g. ../images/albums/myalbum.jpg)</label>
                            <input type="text" value={editing.coverLink} onChange={e => upd('coverLink', e.target.value)} />
                            <ImageUpload folder="albums" label="Загрузить обложку"
                                password={pw} onUploaded={path => upd('coverLink', path)} />
                        </div>
                        <div className="admin__form-group admin__form-group--full">
                            <label>Download Link</label>
                            <input type="text" value={editing.downloadLink} onChange={e => upd('downloadLink', e.target.value)} />
                        </div>

                        <div className="admin__form-group admin__form-group--full">
                            <label>Tracklist</label>
                            <div className="admin__tracklist">
                                {editing.tracklist.map((t, i) => (
                                    <div key={i} className="admin__tracklist-item">
                                        <input type="text" value={t} onChange={e => updTrack(i, e.target.value)} placeholder={`Track ${i + 1}`} />
                                        <button className="admin__btn admin__btn--danger" onClick={() => removeTrack(i)}>✕</button>
                                    </div>
                                ))}
                                <button className="admin__btn admin__btn--ghost admin__tracklist-add" onClick={addTrack}>+ Add Track</button>
                            </div>
                        </div>
                    </div>
                    <div className="admin__form-actions">
                        <button className="admin__btn admin__btn--primary" onClick={save}>Save</button>
                        <button className="admin__btn admin__btn--ghost" onClick={cancel}>Cancel</button>
                    </div>
                </div>
            )}

            <ul className="admin__list">
                {filtered.map((item, fi) => {
                    const ri = getRealIdx(item);
                    return (
                        <li key={fi} className={`admin__list-item${!item.show ? ' admin__list-item--hidden' : ''}`}>
                            <div className="admin__list-item-info">
                                <div className="admin__list-item-title">
                                    <span className={`admin__badge admin__badge--${item.type}`}>{item.type}</span>
                                    {' '}{item.title}
                                </div>
                                <div className="admin__list-item-meta">{item.author} · {item.year} · {item.labelName || '—'}</div>
                            </div>
                            <div className="admin__list-item-actions">
                                <button className="admin__btn admin__btn--icon" onClick={() => toggleShow(ri)} title={item.show ? 'Hide' : 'Show'}>
                                    {item.show ? '👁' : '🚫'}
                                </button>
                                <button className="admin__btn admin__btn--icon" onClick={() => startEdit(ri)}>✎</button>
                                <button className="admin__btn admin__btn--danger" onClick={() => remove(ri)}>✕</button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

// ─── News Tab ─────────────────────────────────────────────────────────────────

function NewsTab({ data, pw = '', onChange }: { data: AppData; pw?: string; onChange: (d: NewsItem[]) => void }) {
    const [editing, setEditing] = useState<NewsItem | null>(null);
    const [editIdx, setEditIdx] = useState<number | null>(null);
    const [isNew, setIsNew] = useState(false);
    const news = data.news;

    const startNew = () => { setEditing(emptyNews()); setEditIdx(null); setIsNew(true); };
    const startEdit = (idx: number) => { setEditing({ ...news[idx] }); setEditIdx(idx); setIsNew(false); };
    const cancel = () => { setEditing(null); setEditIdx(null); };

    const save = () => {
        if (!editing) return;
        const list = [...news];
        if (isNew) list.unshift(editing);
        else if (editIdx !== null) list[editIdx] = editing;
        onChange(list);
        setEditing(null); setEditIdx(null);
    };

    const remove = (idx: number) => {
        if (!confirm('Delete this post?')) return;
        onChange(news.filter((_, i) => i !== idx));
    };

    const upd = <K extends keyof NewsItem>(f: K, v: NewsItem[K]) =>
        setEditing(prev => prev ? { ...prev, [f]: v } : prev);

    const fmtDate = (ts: number) => new Date(ts * 1000).toLocaleDateString('ru-RU');

    return (
        <>
            <div className="admin__section-header">
                <h2>News ({news.length})</h2>
                <button className="admin__btn admin__btn--primary" onClick={startNew}>+ Add Post</button>
            </div>

            {editing && (
                <div className="admin__form">
                    <p className="admin__form-title">{isNew ? 'New Post' : 'Edit Post'}</p>
                    <div className="admin__form-grid">
                        <div className="admin__form-group">
                            <label>Show</label>
                            <select value={editing.show ? 'yes' : 'no'} onChange={e => upd('show', e.target.value === 'yes')}>
                                <option value="yes">Visible</option>
                                <option value="no">Hidden</option>
                            </select>
                        </div>
                        <div className="admin__form-group">
                            <label>Date (Unix timestamp)</label>
                            <input type="number" value={editing.date} onChange={e => upd('date', Number(e.target.value))} />
                        </div>
                        <div className="admin__form-group">
                            <label>Title</label>
                            <input type="text" value={editing.title} onChange={e => upd('title', e.target.value)} />
                        </div>
                        <div className="admin__form-group">
                            <label>Type</label>
                            <select value={editing.type} onChange={e => upd('type', e.target.value as 'image' | 'video' | 'text')}>
                                <option value="image">Image</option>
                                <option value="video">Video</option>
                                <option value="text">Text</option>
                            </select>
                        </div>
                        <div className="admin__form-group admin__form-group--full">
                            <label>Description (HTML allowed)</label>
                            <textarea value={editing.description} onChange={e => upd('description', e.target.value)} />
                        </div>
                        <div className="admin__form-group admin__form-group--full">
                            <label>Link</label>
                            <input type="text" value={editing.link} onChange={e => upd('link', e.target.value)} />
                        </div>
                        <div className="admin__form-group admin__form-group--full">
                            <label>Media (image path or video URL)</label>
                            <input type="text" value={editing.media} onChange={e => upd('media', e.target.value)} />
                            <ImageUpload folder="extra" label="Загрузить картинку"
                                password={pw} onUploaded={path => upd('media', path)} />
                        </div>
                    </div>
                    <div className="admin__form-actions">
                        <button className="admin__btn admin__btn--primary" onClick={save}>Save</button>
                        <button className="admin__btn admin__btn--ghost" onClick={cancel}>Cancel</button>
                    </div>
                </div>
            )}

            <ul className="admin__list">
                {news.map((item, i) => (
                    <li key={i} className={`admin__list-item${!item.show ? ' admin__list-item--hidden' : ''}`}>
                        <div className="admin__list-item-info">
                            <div className="admin__list-item-title">{item.title}</div>
                            <div className="admin__list-item-meta">{fmtDate(item.date)} · {item.type}</div>
                        </div>
                        <div className="admin__list-item-actions">
                            <button className="admin__btn admin__btn--icon" onClick={() => startEdit(i)}>✎</button>
                            <button className="admin__btn admin__btn--danger" onClick={() => remove(i)}>✕</button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

// ─── Bio Tab ──────────────────────────────────────────────────────────────────

function BioTab({ bio, onChange }: { bio: string; onChange: (b: string) => void }) {
    return (
        <>
            <div className="admin__section-header"><h2>Bio (HTML)</h2></div>
            <div className="admin__form">
                <div className="admin__form-group">
                    <label>Bio text (HTML tags supported)</label>
                    <textarea style={{ minHeight: 180 }} value={bio} onChange={e => onChange(e.target.value)} />
                </div>
                <p style={{ fontSize: 11, color: '#888', marginTop: 8 }}>
                    Preview: <span dangerouslySetInnerHTML={{ __html: bio }} style={{ color: '#e7d1b1' }} />
                </p>
            </div>
        </>
    );
}

// ─── URL Resolver (Bandcamp / SoundCloud / YouTube) ──────────────────────────

interface ResolvedPlayer {
    platform: 'bandcamp' | 'soundcloud' | 'youtube';
    embedUrl?: string;
    title?: string;
    artist?: string;
    thumbnail?: string;
    // bandcamp
    itemType?: 'album' | 'track';
    bandcampAlbum?: number;
    bandcampTrack?: number;
    // soundcloud
    trackId?: string;
    // youtube
    videoId?: string;
}

function UrlResolver({ onApply }: {
    onApply: (data: Partial<DiscItem>) => void;
}) {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ResolvedPlayer | null>(null);
    const [error, setError] = useState<string | null>(null);

    const platformIcon = { bandcamp: '🎵', soundcloud: '🔊', youtube: '▶️' };
    const platformColor = { bandcamp: '#1da0c3', soundcloud: '#ff5500', youtube: '#ff0000' };

    const detect = (u: string) => {
        if (u.includes('bandcamp.com')) return 'bandcamp';
        if (u.includes('soundcloud.com')) return 'soundcloud';
        if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
        return null;
    };

    const resolve = async () => {
        if (!url.trim()) return;
        setLoading(true); setError(null); setResult(null);
        try {
            const res = await fetch('/api/resolve-player', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: url.trim() }),
            });
            const json = await res.json();
            if (!res.ok) { setError(json.error || 'Error'); }
            else { setResult(json); }
        } catch (e: any) { setError(e.message); }
        setLoading(false);
    };

    const apply = () => {
        if (!result) return;
        const patch: Partial<DiscItem> = {};
        if (result.title) patch.title = result.title;
        if (result.artist) patch.author = result.artist;
        if (result.bandcampAlbum) patch.bandcampAlbum = result.bandcampAlbum;
        if (result.bandcampTrack) patch.bandcampTrack = result.bandcampTrack;
        if (result.trackId) patch.soundcloudPlayer = result.trackId;
        if (result.videoId) patch.youtubeId = result.videoId;
        patch.downloadLink = url.trim();
        if (result.platform === 'bandcamp') patch.labelLink = url.trim();
        onApply(patch);
    };

    const detected = detect(url);

    return (
        <div style={{
            background: '#0d0010', border: '1px solid #7f00ff',
            borderRadius: 6, padding: 14, marginBottom: 16
        }}>
            <p style={{ margin: '0 0 10px', fontSize: 12, color: '#f32e92', textTransform: 'uppercase', letterSpacing: 2 }}>
                🔗 URL → Player ID resolver
            </p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <input
                    type="text"
                    placeholder="Вставь ссылку: Bandcamp / SoundCloud / YouTube"
                    value={url}
                    onChange={e => { setUrl(e.target.value); setResult(null); setError(null); }}
                    onKeyDown={e => e.key === 'Enter' && resolve()}
                    style={{ flex: 1 }}
                />
                <button className="admin__btn admin__btn--primary" onClick={resolve} disabled={loading || !url.trim()} style={{ whiteSpace: 'nowrap' }}>
                    {loading ? '⏳' : '🔍 Resolve'}
                </button>
            </div>

            {/* Подсказка платформы */}
            {detected && !result && !loading && (
                <p style={{ fontSize: 11, color: platformColor[detected], margin: '4px 0' }}>
                    {platformIcon[detected]} Определено: {detected}
                </p>
            )}

            {error && <p style={{ color: '#ff2244', fontSize: 12, margin: '4px 0' }}>✗ {error}</p>}

            {result && (
                <div style={{ marginTop: 12 }}>
                    {/* Метаданные */}
                    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                        {result.thumbnail && (
                            <img src={result.thumbnail} alt="" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }} />
                        )}
                        <div style={{ fontSize: 12 }}>
                            <p style={{ margin: 0, color: platformColor[result.platform] }}>
                                {platformIcon[result.platform]} {result.platform.toUpperCase()}
                                {result.itemType ? ` · ${result.itemType}` : ''}
                            </p>
                            {result.title && <p style={{ margin: '2px 0', color: '#e7d1b1', fontWeight: 'bold' }}>{result.title}</p>}
                            {result.artist && <p style={{ margin: 0, color: '#aaa' }}>{result.artist}</p>}
                            {result.bandcampAlbum && <p style={{ margin: '2px 0', color: '#888', fontSize: 11 }}>Album ID: <b style={{ color: '#00ff88' }}>{result.bandcampAlbum}</b></p>}
                            {result.bandcampTrack && <p style={{ margin: '2px 0', color: '#888', fontSize: 11 }}>Track ID: <b style={{ color: '#00ff88' }}>{result.bandcampTrack}</b></p>}
                            {result.trackId && <p style={{ margin: '2px 0', color: '#888', fontSize: 11 }}>SoundCloud ID: <b style={{ color: '#00ff88' }}>{result.trackId}</b></p>}
                            {result.videoId && <p style={{ margin: '2px 0', color: '#888', fontSize: 11 }}>YouTube ID: <b style={{ color: '#00ff88' }}>{result.videoId}</b></p>}
                        </div>
                    </div>

                    {/* Превью плеера */}
                    {result.embedUrl && (
                        <div style={{ marginBottom: 10 }}>
                            <p style={{ fontSize: 11, color: '#888', margin: '0 0 6px' }}>Preview:</p>
                            {result.platform === 'youtube' ? (
                                <iframe
                                    src={result.embedUrl}
                                    width="100%" height="200"
                                    frameBorder="0" allow="autoplay; encrypted-media"
                                    allowFullScreen title="YouTube preview"
                                    style={{ borderRadius: 4 }}
                                />
                            ) : result.platform === 'soundcloud' ? (
                                <iframe
                                    src={result.embedUrl}
                                    width="100%" height="166"
                                    frameBorder="no" scrolling="no"
                                    allow="autoplay" title="SoundCloud preview"
                                    style={{ borderRadius: 4 }}
                                />
                            ) : (
                                <iframe
                                    src={result.embedUrl}
                                    seamless width="100%" height="200"
                                    title="Bandcamp preview"
                                    style={{ borderRadius: 4 }}
                                />
                            )}
                        </div>
                    )}

                    <button className="admin__btn admin__btn--success" onClick={apply}>
                        ✓ Применить в форму
                    </button>
                </div>
            )}
        </div>
    );
}

// ─── Image Upload Component ───────────────────────────────────────────────────

function ImageUpload({ onUploaded, folder = 'albums', label = 'Загрузить обложку', password = '' }: {
    onUploaded: (path: string) => void;
    folder?: 'albums' | 'extra' | 'games';
    label?: string;
    password?: string;
}) {
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            setStatus({ ok: false, msg: 'Файл больше 5MB' }); return;
        }

        setPreview(URL.createObjectURL(file));
        setUploading(true);
        setStatus(null);

        try {
            // Конвертируем в base64
            const base64 = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const result = reader.result as string;
                    resolve(result.split(',')[1]); // убираем data:image/...;base64,
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

            const pw = password || DEFAULT_PASS || '';

            const res = await fetch('/api/upload-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    password: pw,
                    filename: file.name,
                    content: base64,
                    folder,
                }),
            });

            const json = await res.json();
            if (res.ok && json.ok) {
                setStatus({ ok: true, msg: `✓ ${json.filename}` });
                onUploaded(json.path);
            } else {
                setStatus({ ok: false, msg: `✗ ${json.error}` });
            }
        } catch (e: any) {
            setStatus({ ok: false, msg: `✗ ${e.message}` });
        }
        setUploading(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                    type="button"
                    className="admin__btn admin__btn--secondary"
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                    style={{ fontSize: 12 }}
                >
                    {uploading ? '⏳ Загрузка...' : `🖼 ${label}`}
                </button>
                {status && (
                    <span style={{ fontSize: 11, color: status.ok ? '#00ff88' : '#ff2244' }}>
                        {status.msg}
                    </span>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
            </div>
            {preview && (
                <img src={preview} alt="preview"
                    style={{ maxWidth: 120, maxHeight: 120, borderRadius: 4, border: '1px solid #3d0050', objectFit: 'cover' }} />
            )}
        </div>
    );
}

// ─── Settings Tab ─────────────────────────────────────────────────────────────

function SettingsTab({ vs, onChange }: { vs: VisibleSections; onChange: (v: VisibleSections) => void }) {
    const toggle = (k: keyof VisibleSections) => onChange({ ...vs, [k]: !vs[k] });
    const labels: Record<keyof VisibleSections, string> = {
        bio: 'Bio', news: 'Новости', discography: 'Дискография', game: 'Game',
        player: 'Player', events: 'События', donate: 'Донат', contacts: 'Контакты',
        mup: 'Mup', emulator: 'Эмулятор', kits: 'Kits'
    };

    return (
        <>
            <div className="admin__section-header"><h2>Visible Sections</h2></div>
            <div className="admin__form">
                {(Object.keys(vs) as (keyof VisibleSections)[]).map(k => (
                    <div key={k} className="admin__toggle">
                        <label className="admin__toggle-label">{labels[k]}</label>
                        <input type="checkbox" checked={vs[k]} onChange={() => toggle(k)} />
                        <span style={{ fontSize: 11, color: vs[k] ? '#00ff88' : '#888' }}>
                            {vs[k] ? 'visible' : 'hidden'}
                        </span>
                    </div>
                ))}
            </div>
        </>
    );
}
