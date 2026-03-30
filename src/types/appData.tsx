export interface NewsItem {
    date: number;
    title: string;
    description: string;
    link: string;
    type: 'image' | 'video';
    media: string;
    hidden: boolean;
}

export interface DiscographyItem {
    show: boolean;
    type: 'album' | 'single';
    title: string;
    author: string;
    year: string;
    labelName?: string;
    labelLink?: string;
    releaseId?: string;
    coverLink: string;
    downloadLink?: string;
    soundcloudPlayer?: string;
    bandcampAlbum?: number;
    bandcampTrack?: number;
    youtubeId?: string;
    tracklist?: string[];
    description?: string;
}

export interface EventItem {
    id: string;
    title: string;
    description: string;
    date: number;
    location: string;
    image?: string;
    link?: string;
    hidden: boolean;
}

export interface AppData {
    bio: string;
    bio_ru?: string;
    news: NewsItem[];
    discography: DiscographyItem[];
    events: EventItem[];
}
