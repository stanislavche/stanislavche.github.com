// Сжатие изображений в public/images без потери качества отображения
// JPG/JPEG → качество 82, PNG → PNG с сжатием, GIF → пропускаем
// Оригиналы перезаписываются (сделайте git commit перед запуском)

const sharp = require('sharp');
const fs    = require('fs');
const path  = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const QUALITY_JPG = 82;
const QUALITY_PNG_COMPRESSION = 9; // 0–9, 9 = максимум сжатия без потерь

let totalBefore = 0;
let totalAfter  = 0;
let processed   = 0;
let skipped     = 0;

function getAllFiles(dir) {
    let files = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) files = files.concat(getAllFiles(full));
        else files.push(full);
    }
    return files;
}

async function compress(filePath) {
    const ext  = path.extname(filePath).toLowerCase();
    const stat = fs.statSync(filePath);
    const sizeBefore = stat.size;

    // GIF — sharp не умеет хорошо, пропускаем
    if (ext === '.gif') { skipped++; return; }
    if (!['.jpg','.jpeg','.png','.webp'].includes(ext)) { skipped++; return; }

    // Минимальный порог — не трогаем файлы меньше 100KB
    if (sizeBefore < 100 * 1024) { skipped++; return; }

    try {
        const tmpPath = filePath + '.tmp';
        const image   = sharp(filePath);

        if (ext === '.png') {
            await image
                .png({ compressionLevel: QUALITY_PNG_COMPRESSION, effort: 10 })
                .toFile(tmpPath);
        } else {
            await image
                .jpeg({ quality: QUALITY_JPG, mozjpeg: true, progressive: true })
                .toFile(tmpPath);
        }

        const sizeAfter = fs.statSync(tmpPath).size;

        if (sizeAfter < sizeBefore) {
            fs.renameSync(tmpPath, filePath);
            const saved = ((sizeBefore - sizeAfter) / 1024).toFixed(0);
            const pct   = (((sizeBefore - sizeAfter) / sizeBefore) * 100).toFixed(1);
            console.log(`✓ ${path.relative(IMAGES_DIR, filePath).padEnd(45)} ${(sizeBefore/1024).toFixed(0).padStart(6)} KB → ${(sizeAfter/1024).toFixed(0).padStart(6)} KB  (-${saved} KB, ${pct}%)`);
            totalBefore += sizeBefore;
            totalAfter  += sizeAfter;
            processed++;
        } else {
            fs.unlinkSync(tmpPath);
            console.log(`  ${path.relative(IMAGES_DIR, filePath).padEnd(45)} уже оптимальный`);
            skipped++;
        }
    } catch (err) {
        console.error(`✗ ${filePath}: ${err.message}`);
        skipped++;
    }
}

(async () => {
    const files = getAllFiles(IMAGES_DIR);
    console.log(`Найдено файлов: ${files.length}\n`);

    for (const f of files) await compress(f);

    const savedMB = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(2);
    console.log(`\n═══════════════════════════════════════════`);
    console.log(`Обработано: ${processed}  |  Пропущено: ${skipped}`);
    console.log(`Было: ${(totalBefore/1024/1024).toFixed(2)} MB  →  Стало: ${(totalAfter/1024/1024).toFixed(2)} MB`);
    console.log(`Сэкономлено: ${savedMB} MB`);
})();

