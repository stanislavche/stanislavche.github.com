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
    id: string;
    title: string;
    author: string;
    year: string;
    cover: string;
    bandcampAlbum?: number;
    bandcampTrack?: number;
    soundcloudPlayer?: string;
    type: 'album' | 'single';
    hidden: boolean;
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
    news: NewsItem[];
    discography: DiscographyItem[];
    events: EventItem[];
}
