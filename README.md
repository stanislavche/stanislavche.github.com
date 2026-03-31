<div align="center">
  <img src="./public/images/extra/boy.gif" alt="S_TN" width="80" />

  # S_TN — Сайт чип-музыканта

  **React 18 · TypeScript · Vite · SCSS · Vercel**

  [![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
  [![ROMs: Non-Commercial](https://img.shields.io/badge/ROMs-Non--Commercial-blue.svg)](./LICENSE.md)

  > Персональный сайт Стаса / **S_TN** / **Stress_TN** — чип-музыканта и автора саундтреков к видеоиграм.  
  > Все данные хранятся в одном JSON-файле и управляются через встроенную CMS-панель без пересборки кода.

</div>

---

## Содержание

1. [О проекте](#о-проекте)
2. [Стек технологий](#стек-технологий)
3. [Архитектура проекта](#архитектура-проекта)
4. [Секции сайта](#секции-сайта)
5. [Структура данных data.json](#структура-данных-datajson)
6. [Переменные окружения](#переменные-окружения)
7. [Быстрый старт](#быстрый-старт)
8. [Команды](#команды)
9. [Деплой на Vercel](#деплой-на-vercel)
10. [Работа с Админ-панелью /cms](#работа-с-админ-панелью-cms)
11. [API-эндпоинты Serverless](#api-эндпоинты-serverless)
12. [Как добавить новый релиз](#как-добавить-новый-релиз)
13. [Как добавить концерт](#как-добавить-концерт)
14. [Как опубликовать новость](#как-опубликовать-новость)
15. [Загрузка изображений](#загрузка-изображений)
16. [LSDJ Kits](#lsdj-kits)
17. [FAQ / Частые проблемы](#faq--частые-проблемы)

---

## О проекте

Сайт выполнен в ретро-эстетике **Commodore 64** с элементами глитча и пиксельных шрифтов. При первом открытии страницы запускается анимация отрисовки контура **Gameboy** (библиотека `lazy-line-painter`), после завершения которой подгружаются данные из `data.json` и рендерится основной контент.

Вся контентная часть сайта (биография, новости, дискография, события) управляется через CMS-панель по адресу `/cms`. Изменения сохраняются прямо в GitHub-репозиторий через API — сайт автоматически перестраивается на Vercel в течение ~1 минуты.

---

## Стек технологий

| Слой | Технология |
|---|---|
| UI | React 18, TypeScript, SCSS/Sass |
| Сборка | Vite 6, `@vitejs/plugin-react`, `vite-plugin-svgr` |
| Роутинг | React Router DOM v6 |
| Медиа | `react-player` (SoundCloud / YouTube) |
| Анимация | `lazy-line-painter` (SVG-анимация Gameboy) |
| Флаги стран | `flag-icons` |
| Backend / API | Vercel Serverless Functions (Node.js) |
| Деплой | Vercel + GitHub |
| Данные | `public/data.json` (загружается в рантайме) |
| **Мультиязычность** | **Встроенная i18n (RU/EN), `localStorage`** |

---

## Мультиязычность (i18n)

Сайт поддерживает **русский** и **английский** языки.

### Переключение языка

В **правом верхнем углу** страницы (фиксированная кнопка) отображается переключатель **`RU / EN`**.  
Кнопка всегда видна при прокрутке (`position: fixed`).  
Клик мгновенно переключает язык всех статических надписей на сайте.  
Выбор сохраняется в `localStorage` и применяется при следующем визите.  
При первом посещении язык определяется автоматически по языку браузера.

### Что переводится

| Элемент | RU | EN |
|---|---|---|
| Заголовки секций | Биография, Новости, Концерты… | Bio, News, Events… |
| **Биография** | из поля `bio_ru` в `data.json` | из поля `bio` в `data.json` |
| Дискография | Альбомы и EP / Синглы и ремиксы | Albums & EPs / Singles and Remixes |
| Футер | Все права принадлежат S_TN | All rights belong to S_TN |
| Страница 404 | Страница не найдена | Page Not Found |
| Лоадер iframe | ЗАГРУЗКА | LOADING |

> **Остальной контент** (новости, названия релизов, события) вводится вручную через админку — автор сам решает на каком языке писать тексты.

### Редактирование биографии (оба языка)

Вкладка **👤 Bio** в Админ-панели содержит два редактора:
- **Bio EN** — английская версия (поле `bio` в `data.json`)
- **Bio RU** — русская версия (поле `bio_ru` в `data.json`)

Оба поля поддерживают HTML-теги и показывают предпросмотр прямо под редактором.  
Если `bio_ru` не заполнен — на русском языке отобразится английская версия.

### Добавить новые тексты / язык

Все строки находятся в одном файле:

```
src/i18n/translations.ts
```

```typescript
const translations = {
    en: { bio: 'Bio', news: 'News', ... },
    ru: { bio: 'Биография', news: 'Новости', ... },
}
```

Чтобы добавить новый язык (например `de`):
1. Добавь объект `de: { ... }` в `translations.ts`
2. Обнови тип `Lang = 'ru' | 'en' | 'de'` в том же файле
3. Добавь кнопку `DE` в компонент `LangSwitcher` в `App.tsx`

---

## Архитектура проекта

```
WEB/
├── api/                          # Vercel Serverless Functions
│   ├── save-data.js              # Сохранение data.json в GitHub
│   ├── upload-image.js           # Загрузка картинок в GitHub
│   ├── resolve-player.js         # Резолв URL → ID плеера (BC/SC/YT)
│   └── bandcamp-desc.js          # Получение описания с Bandcamp
│
├── public/                       # Статика (копируется в build/)
│   ├── data.json                 # ★ ГЛАВНЫЙ ФАЙЛ ДАННЫХ
│   ├── images/
│   │   ├── albums/               # Обложки релизов
│   │   ├── extra/                # Медиа для новостей
│   │   └── games/                # Обложки игр
│   ├── kits/                     # Бесплатные LSDJ-киты
│   └── favicon/                  # Анимированная favicon (0–4.gif)
│
├── src/
│   ├── index.js                  # Точка входа, монтирует Gameboy
│   ├── Gameboy.tsx               # Загрузочный экран + загрузка data.json
│   │
│   ├── context/
│   │   └── AppContext.tsx        # React Context (передаёт AppData по дереву)
│   │
│   ├── types/
│   │   └── appData.tsx           # TypeScript-интерфейсы данных
│   │
│   └── components/
│       ├── App.tsx               # Главный компонент, роутер, раскладка
│       ├── Bio.tsx               # Секция «Биография»
│       ├── News.tsx              # Секция «Новости»
│       ├── Newpost.tsx           # Карточка новости
│       ├── Discography.tsx       # Секция «Дискография»
│       ├── Disc.tsx              # Карточка релиза
│       ├── Popup.tsx             # Попап с деталями релиза
│       ├── Events.js             # Секция «События» (гиги/выступления)
│       ├── Player.tsx            # SoundCloud плейлист
│       ├── Game.tsx              # Ссылки на игры (OST)
│       ├── Emulator.tsx          # Iframe-эмулятор «Hello World»
│       ├── Mup.tsx               # Iframe-виджет «МУП»
│       ├── Kits.tsx              # Скачать LSDJ-киты
│       ├── Cotacts.tsx           # Ссылки на соцсети
│       ├── Donate.tsx            # Кнопка PayPal-доната
│       └── admin/
│           └── AdminPanel.tsx    # ★ CMS-панель (/cms)
│
├── vercel.json                   # Правила роутинга и редиректов Vercel
├── vite.config.ts                # Конфигурация сборщика
└── package.json
```

### Поток данных

```
GitHub (public/data.json)
        │
        │  fetch() при загрузке страницы
        ▼
   Gameboy.tsx  ──►  AppContext.Provider  ──►  App.tsx
                                                  │
                     ┌────────────────────────────┤
                     ▼           ▼           ▼    ▼
                   Bio        News      Discography  Events ...
                     (читают данные из AppContext)
```

Данные **не кэшируются в localStorage** — каждый раз при открытии сайта они загружаются заново по URL:
- На Vercel: `https://raw.githubusercontent.com/{owner}/{repo}/{branch}/public/data.json`
- Локально: `/data.json`

---

## Секции сайта

| Секция | Компонент | Данные из JSON | Описание |
|---|---|---|---|
| **Bio** | `Bio.tsx` | `bio` (HTML-строка) | Биография, поддерживает HTML-теги |
| **News** | `News.tsx` | `news[]` | Посты: изображение / видео / текст |
| **Discography** | `Discography.tsx` | `discography[]` | Альбомы и синглы с плеерами |
| **Events** | `Events.js` | `events[]` | Концерты, сгруппированы по годам |
| **Player** | `Player.tsx` | hardcoded URL | SoundCloud-плейлист |
| **Games OST** | `Game.tsx` | hardcoded | Ссылки на игры Kinto Games |
| **Hello World** | `Emulator.tsx` | iframe | Встроенный C64-эмулятор |
| **MUP** | `Mup.tsx` | iframe | Интерактивный виджет «МУП» |
| **LSDJ Kits** | `Kits.tsx` | hardcoded | Скачать бесплатные саундкиты |
| **Subscribe** | `Cotacts.tsx` | hardcoded | Соцсети (Spotify, VK, YouTube…) |
| **Donate** | `Donate.tsx` | hardcoded | PayPal-форма доната |

> Каждую секцию можно включить/выключить через **Settings** в Админ-панели (поле `visibleSections` в `data.json`).

---

## Структура данных `data.json`

```json
{
  "visibleSections": {
    "bio": true,
    "news": true,
    "discography": true,
    "game": true,
    "player": true,
    "events": true,
    "donate": false,
    "contacts": true,
    "mup": true,
    "emulator": true,
    "kits": true
  },

  "bio": "<p>HTML-текст биографии...</p>",

  "news": [
    {
      "show": true,
      "date": 1618207620,
      "title": "Название поста",
      "description": "Описание",
      "link": "https://...",
      "type": "image",
      "media": "./images/extra/boy.gif"
    }
  ],

  "discography": [
    {
      "show": true,
      "type": "album",
      "title": "Название",
      "author": "S_TN",
      "year": "2025",
      "bandcampAlbum": 569378756,
      "bandcampTrack": null,
      "soundcloudPlayer": "123",
      "youtubeId": "dQw4w9WgXcQ",
      "labelName": "Self-released",
      "labelLink": "https://...",
      "releaseId": "STN-001",
      "coverLink": "../images/albums/cover.jpg",
      "downloadLink": "https://band.link/...",
      "tracklist": ["Track 1", "Track 2"]
    }
  ],

  "events": [
    {
      "date": "21 February 2026",
      "country": "Russia",
      "city": "Moscow",
      "title": "Название концерта",
      "link": "https://..."
    }
  ]
}
```

---

## Переменные окружения

Создай файл `.env.local` в корне проекта (не коммитится в git):

```env
# Пароль для входа в админку (фронтенд)
VITE_ADMIN_PASSWORD=your_password

# Для загрузки данных с GitHub Raw (фронтенд)
VITE_GITHUB_OWNER=stanislavche
VITE_GITHUB_REPO=web
VITE_GITHUB_BRANCH=master
```

На **Vercel** нужно добавить ещё серверные переменные (**Project Settings → Environment Variables**):

```env
# Пароль (бэкенд, должен совпадать с VITE_ADMIN_PASSWORD)
ADMIN_PASSWORD=your_password

# GitHub Personal Access Token (нужны права repo → write contents)
GITHUB_TOKEN=ghp_xxxxxxxxxxxx

# Репозиторий
GITHUB_OWNER=stanislavche
GITHUB_REPO=web
GITHUB_BRANCH=master

# Путь к файлу данных (необязательно, по умолчанию: public/data.json)
DATA_FILE_PATH=public/data.json
```

> **Важно:** `VITE_ADMIN_PASSWORD` и `ADMIN_PASSWORD` должны совпадать.  
> Переменные с префиксом `VITE_` доступны в браузере, без префикса — только на сервере.

---

## Быстрый старт

### 1. Клонировать и установить зависимости

```bash
git clone https://github.com/stanislavche/web.git
cd web
npm install
```

### 2. Настроить переменные окружения

```bash
# Создать .env.local и заполнить значениями (см. раздел выше)
```

### 3. Запустить dev-сервер

```bash
npm start
# → http://localhost:3000
```

---

## Команды

```bash
# Запустить в режиме разработки
npm start

# Собрать продакшн-билд (→ папка build/)
npm run build

# Предпросмотр продакшн-билда локально
npm run preview

# Запустить тесты
npm test
```

---

## Деплой на Vercel

### Первичная настройка

1. Зарегистрируйся на [vercel.com](https://vercel.com) и подключи GitHub-репозиторий
2. В настройках проекта укажи:
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
3. Добавь все переменные окружения (см. раздел выше)
4. Первый деплой запустится автоматически при пуше в репозиторий

### Как работает автообновление данных

```
Админ-панель (/cms)
       │
       │  POST /api/save-data
       ▼
  Vercel Function
       │
       │  GitHub API (PUT contents/public/data.json)
       ▼
  GitHub коммит
       │
       │  Vercel webhook → новый деплой
       ▼
  Сайт обновляется за ~1 мин
```

> Данные загружаются из GitHub Raw напрямую в браузер — изменения видны сразу после деплоя.

---

## Работа с Админ-панелью `/cms`

### Вход

Перейди по адресу **`https://твой-домен/cms`**

Введи пароль из переменной `VITE_ADMIN_PASSWORD`. По умолчанию: `s_tn`

> Сессия хранится в `sessionStorage` и сбрасывается при закрытии вкладки.

---

### Интерфейс панели

```
┌──────────────────────────────────────────────────────────────────────┐
│  ◆ S_TN ADMIN              [🚀 Save & Deploy]  [⬇ Download]  [Logout] │
├──────────┬────────────┬──────────┬──────────┬────────────────────────┤
│ 🎤 Events│ 💿 Disc    │ 📰 News  │ 👤 Bio   │ ⚙ Settings             │
├──────────┴────────────┴──────────┴──────────┴────────────────────────┤
│                                                                      │
│                        [ Контент вкладки ]                           │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

### Вкладка 🎤 Events — Концерты

Список выступлений, сгруппированных по годам на главной странице.

**Добавить событие:**
1. Нажми `+ Add Event`
2. Заполни поля:
   - **Date** — текстовая дата: `21 February 2026`
   - **Country** — выбери из списка (появится флаг страны)
   - **City** — название города
   - **Title** — название мероприятия
   - **Link** — URL (необязательно; если указан, строка становится кликабельной)
3. Нажми `Save`

**Управление списком:** `▲ ▼` — сортировка, `✎` — редактирование, `✕` — удаление.

---

### Вкладка 💿 Discography — Дискография

Список альбомов и синглов с встроенными плеерами.

**Добавить релиз:**
1. Нажми `+ Add`
2. В блоке **🔗 URL-ресолвера** вставь ссылку на Bandcamp/SoundCloud/YouTube и нажми `🔍 Resolve`:
   - Автоматически определит платформу и извлечёт метаданные
   - Нажми `✓ Применить в форму`
3. Дозаполни поля вручную при необходимости:

| Поле | Описание |
|---|---|
| **Type** | `album` или `single` |
| **Show** | Visible — показывать, Hidden — скрыть |
| **Title** | Название релиза |
| **Author** | Исполнитель (по умолчанию S_TN) |
| **Year** | Год выхода |
| **Label Name / Link** | Лейбл и ссылка на него |
| **Release ID** | Каталожный номер (напр. `STN-001`) |
| **Bandcamp Album ID** | Числовой ID альбома на Bandcamp |
| **Bandcamp Track ID** | Числовой ID трека (для синглов) |
| **SoundCloud Player ID** | Числовой ID трека SoundCloud |
| **YouTube Video ID** | 11-значный ID (напр. `dQw4w9WgXcQ`) |
| **Cover Link** | Путь к обложке: `../images/albums/name.jpg` |
| **Download Link** | Ссылка для скачивания/покупки |
| **Tracklist** | Список треков (по одному) |

4. Нажми `Save`

**Фильтры:** `All / Album / Single` — для навигации по большому списку.  
**Иконки 👁 / 🚫** — быстро скрыть/показать релиз без удаления.

---

### Вкладка 📰 News — Новости

**Добавить пост:**
1. Нажми `+ Add Post`
2. Заполни поля:

| Поле | Описание |
|---|---|
| **Show** | Visible / Hidden |
| **Date** | Unix timestamp (секунды). Текущее время подставляется автоматически |
| **Title** | Заголовок поста |
| **Type** | `image` — с картинкой, `video` — видео, `text` — текст |
| **Description** | Описание (поддерживает HTML) |
| **Link** | Ссылка при клике на пост |
| **Media** | Путь к картинке (`./images/extra/...`) или URL видео |

3. Для загрузки картинки используй кнопку **🖼 Загрузить картинку** (макс. 5 МБ)
4. Нажми `Save`

> Посты отображаются в обратном хронологическом порядке — новые сверху.

---

### Вкладка 👤 Bio — Биография

Редактор биографии с поддержкой HTML-тегов:

```html
<p class="container__text">Основной текст</p>
<b>Жирный</b>
<a href="https://...">Ссылка</a>
<br />
```

Предпросмотр обновляется прямо под полем ввода.

---

### Вкладка ⚙ Settings — Настройки видимости

Переключатели для каждой секции главной страницы:

| Ключ | Секция на сайте |
|---|---|
| `bio` | Биография |
| `news` | Новости |
| `discography` | Дискография |
| `game` | Игры (OST) |
| `player` | Плеер SoundCloud |
| `events` | Концерты |
| `donate` | Кнопка доната |
| `contacts` | Соцсети |
| `mup` | Виджет МУП |
| `emulator` | Эмулятор Hello World |
| `kits` | Скачать LSDJ Kits |

---

### Кнопки шапки панели

| Кнопка | Действие |
|---|---|
| **🚀 Save & Deploy** | Отправляет JSON в GitHub → триггерит перестройку ��айта |
| **⬇ Download** | Скачивает `data.json` локально (резервная копия) |
| **Logout** | Завершить сессию |

> Если `Save & Deploy` недоступен (нет env-переменных) — используй **Download**, затем вручную замени `public/data.json` в репозитории.

---

## API-эндпоинты Serverless

| Метод | URL | Описание |
|---|---|---|
| `POST` | `/api/save-data` | Обновляет `data.json` в GitHub репозитории |
| `POST` | `/api/upload-image` | Загружает изображение в GitHub |
| `POST` | `/api/resolve-player` | URL → ID плеера (Bandcamp/SoundCloud/YouTube) |
| `POST` | `/api/bandcamp-desc` | Парсит описание альбома с Bandcamp |

### `/api/save-data`
```json
// Запрос:
{ "password": "your_password", "data": { ...AppData } }
// Ответ:
{ "ok": true, "message": "Saved! Site will rebuild in ~1 min." }
```

### `/api/upload-image`
```json
// Запрос:
{
  "password": "your_password",
  "filename": "cover.jpg",
  "content": "base64...",
  "folder": "albums"
}
// Ответ:
{ "ok": true, "path": "../images/albums/cover.jpg", "filename": "cover.jpg" }
```

### `/api/resolve-player`
```json
// Запрос:
{ "url": "https://stresstn.bandcamp.com/album/chiptune-is-not-dead" }
// Ответ:
{
  "platform": "bandcamp",
  "bandcampAlbum": 569378756,
  "title": "Chiptune is not dead",
  "artist": "S_TN",
  "thumbnail": "https://..."
}
```

---

## Как добавить новый релиз

### Через Админ-панель (рекомендуется)

1. Открой `/cms` → вкладка **💿 Discography** → `+ Add`
2. В URL-ресолвере вставь ссылку на Bandcamp/SoundCloud/YouTube → `🔍 Resolve` → `✓ Применить`
3. Загрузи обложку кнопкой **🖼 Загрузить обложку**
4. Добавь треклист
5. Нажми `Save` → `🚀 Save & Deploy`

### Найти ID плеера вручную

- **Bandcamp:** на странице альбома нажми `Share → Embed`, из iframe-кода скопируй число после `album=`
- **SoundCloud:** `Share → Embed`, из HTML найди `tracks%2F123456789` — число и есть ID
- **YouTube:** из URL `youtube.com/watch?v=XXXXXXXXXXX` — 11 символов после `v=`

---

## Как добавить концерт

1. `/cms` → **🎤 Events** → `+ Add Event`
2. Формат даты: `21 February 2026`
3. Для прошедших концертов ссылку можно не указывать
4. `Save` → `🚀 Save & Deploy`

---

## Как опубликовать новость

1. `/cms` → **📰 News** → `+ Add Post`
2. Тип `image`: загрузи картинку через **🖼 Загрузить картинку**
3. Дата задаётся автоматически, её можно исправить (Unix timestamp в секундах)
4. `Save` → `🚀 Save & Deploy`

---

## Загрузка изображений

| Папка | Назначение | Путь в коде |
|---|---|---|
| `public/images/albums/` | Обложки релизов | `../images/albums/name.jpg` |
| `public/images/extra/` | Медиа для новостей | `./images/extra/name.jpg` |
| `public/images/games/` | Логотипы игр | `../images/games/name.png` |

- **Максимальный размер** файла через Upload API: **5 МБ**
- **Форматы:** JPG, PNG, GIF, WebP

---

## LSDJ Kits

В папке `public/kits/` лежат бесплатные саундкиты для [LSDJ](https://www.littlesounddj.com) (Game Boy трекер):

| Kit | Описание |
|---|---|
| `C64_Sam_Reciter_1–4.kit` | Синтез речи SAM (Commodore 64) |
| `Reggae.kit` | Регги-инструменты |
| `Scream.kit` | Скримы и вокальные сэмплы |
| `Speak_and_Spell_numbers.kit` | Цифры Speak & Spell |
| `Speak_and_Spell_Voice_1–4.kit` | Голосовые пресеты Speak & Spell |

Доступны для скачивания на сайте в секции **FREE LSDJ KITS** или напрямую:  
`https://s-tn.space/kits/C64_Sam_Reciter_1.kit`

---

## FAQ / Частые проблемы

**❓ Не работает вход в админку**  
→ Убедись что `VITE_ADMIN_PASSWORD` задан в `.env.local` (локально) или в переменных Vercel.

**❓ `Save & Deploy` возвращает `Missing env vars`**  
→ На Vercel не заданы `GITHUB_TOKEN`, `GITHUB_OWNER` или `GITHUB_REPO`. Добавь их в *Project Settings → Environment Variables*, затем передеплой проект.

**❓ Данные сохранились, но сайт не обновился**  
→ Подожди 1–2 минуты. Vercel пересобирает автоматически. Если через 5 минут изменений нет — проверь вкладку *Deployments* в Vercel Dashboard.

**❓ Картинка не отображается после загрузки**  
→ Нажми `🚀 Save & Deploy` — это зафиксирует изменения и запустит пересборку с новыми файлами.

**❓ URL-ресолвер не находит ID для Bandcamp**  
→ Получи ID вручную: на странице альбома `Share → Embed`, скопируй число после `album=`.

**❓ Сайт не загружается локально**  
→ Проверь, что файл `public/data.json` существует и является валидным JSON.  
Открой в браузере: `http://localhost:3000/data.json`

**❓ Нужно изменить домен**  
→ Отредактируй файл `public/CNAME` (одна строка — домен без `https://`, напр. `s-tn.space`).

---

---

## Лицензия / License

Проект создан в **исследовательских и образовательных целях**.  
Все материалы (код, ассеты, ROM-образы, LSDJ-киты) распространяются на условиях:

**[Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](./LICENSE.md)**

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

- ✅ Свободное использование в учебных и некоммерческих целях
- ✅ Распространение с донатами
- ✅ Изучение и адаптация кода
- ❌ Коммерческое использование без разрешения

💼 По вопросам коммерческого использования: **stress_tn@yahoo.com**

> Сторонние зависимости (React, Vite и др.) распространяются на условиях собственных лицензий.

---

<div align="center">
  <br/>
  <img src="./public/images/extra/boy.gif" alt="S_TN" width="40" />
  <br/>
  <sub>© S_TN (Stress_TN) — CC BY-NC 4.0 — stress_tn@yahoo.com</sub>
</div>

