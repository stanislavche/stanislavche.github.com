export type Lang = 'ru' | 'en';

const translations = {
    en: {
        // Section headers
        bio:             'Bio',
        news:            'News',
        albumsEps:       'Albums & EPs',
        singlesRemixes:  'Singles and Remixes',
        events:          'Events',
        music:           'MUSIC',
        gamesOst:        'Games, OST',
        helloWorld:      'HELLO WORLD',
        mup:             'MUP',
        freeLsdjKits:    'FREE LSDJ KITS',
        subscribe:       'Subscribe',
        // Footer
        footer:          'All rights belong to S_TN',
        // 404 page
        error404title:   '**** PAGE NOT FOUND ****',
        error404code:    'ERROR 404',
        errorReady:      'READY.',
        errorFileNotFound: 'FILE NOT FOUND',
        errorGotoMain:   'GOTO MAIN PAGE',
        // Loader
        loading:         'LOADING',
    },
    ru: {
        // Section headers
        bio:             'Биография',
        news:            'Новости',
        albumsEps:       'Альбомы и EP',
        singlesRemixes:  'Синглы и ремиксы',
        events:          'Концерты',
        music:           'МУЗЫКА',
        gamesOst:        'Игры, OST',
        helloWorld:      'HELLO WORLD',
        mup:             'MUP',
        freeLsdjKits:    'БЕСПЛАТНЫЕ LSDJ KITS',
        subscribe:       'Подписаться',
        // Footer
        footer:          'Все права принадлежат S_TN',
        // 404 page
        error404title:   '**** СТРАНИЦА НЕ НАЙДЕНА ****',
        error404code:    'ОШИБКА 404',
        errorReady:      'ГОТОВО.',
        errorFileNotFound: 'ФАЙЛ НЕ НАЙДЕН',
        errorGotoMain:   'НА ГЛАВНУЮ',
        // Loader
        loading:         'ЗАГРУЗКА',
    },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function translate(lang: Lang, key: TranslationKey): string {
    return translations[lang][key] as string;
}

export default translations;

