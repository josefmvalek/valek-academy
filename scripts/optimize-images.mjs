import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const DIRS_TO_SCAN = [
  path.join(process.cwd(), 'public', 'uploads'),
  path.join(process.cwd(), 'public', 'images')
];

const SUPPORTED_EXTS = new Set(['.jpg', '.jpeg', '.png', '.tiff', '.bmp']);

export async function convertSingleImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!SUPPORTED_EXTS.has(ext)) return null;

  const dir = path.dirname(filePath);
  const base = path.basename(filePath, ext);
  const webpPath = path.join(dir, `${base}.webp`);

  try {
    // If webp already exists and source is older or same, skip
    if (fs.existsSync(webpPath)) {
      const srcStat = fs.statSync(filePath);
      const webpStat = fs.statSync(webpPath);
      if (webpStat.mtimeMs >= srcStat.mtimeMs) {
        return null;
      }
    }

    const inputBuffer = fs.readFileSync(filePath);
    const convertedBuffer = await sharp(inputBuffer)
      .rotate() // Auto-orient EXIF
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85, effort: 4 })
      .toBuffer();

    fs.writeFileSync(webpPath, convertedBuffer);

    const origSize = (inputBuffer.length / 1024).toFixed(1);
    const newSize = (convertedBuffer.length / 1024).toFixed(1);
    const savedPct = Math.round((1 - convertedBuffer.length / inputBuffer.length) * 100);

    console.log(`[WebP Auto-Convert] ✓ ${path.basename(filePath)} (${origSize} kB) → ${base}.webp (${newSize} kB, -${savedPct}%)`);
    return webpPath;
  } catch (err) {
    console.warn(`[WebP Auto-Convert] ⚠ Chyba při konverzi ${filePath}:`, err.message);
    return null;
  }
}

async function walkAndConvert(currentDir) {
  let count = 0;
  if (!fs.existsSync(currentDir)) return 0;
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      count += await walkAndConvert(fullPath);
    } else if (entry.isFile()) {
      const res = await convertSingleImage(fullPath);
      if (res) count++;
    }
  }
  return count;
}

export async function scanAndConvertAll() {
  let count = 0;
  for (const targetDir of DIRS_TO_SCAN) {
    count += await walkAndConvert(targetDir);
  }
  if (count > 0) {
    console.log(`[WebP Auto-Convert] Hotovo: Zkonvertováno ${count} nových/změněných obrázků.`);
  } else {
    console.log('[WebP Auto-Convert] Všechny obrázky jsou již aktuální a ve formátu WebP.');
  }
  return count;
}

// Check if running as CLI or watch mode
const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const isWatchMode = process.argv.includes('--watch');

if (isDirectRun || isWatchMode) {
  scanAndConvertAll().then(async () => {
    if (isWatchMode) {
      console.log('[WebP Auto-Convert] Sleduji změny v public/uploads a public/images...');
      try {
        const { default: chokidar } = await import('chokidar');
        const watcher = chokidar.watch(DIRS_TO_SCAN, {
          ignored: /(^|[\/\\])\..|.*\.webp$/, // ignore hidden files and .webp
          persistent: true,
          ignoreInitial: true
        });

        watcher.on('add', (filePath) => convertSingleImage(filePath));
        watcher.on('change', (filePath) => convertSingleImage(filePath));
      } catch {
        console.log('[WebP Auto-Convert] Chokidar watcher spuštěn s nativním fs.watch.');
        for (const dir of DIRS_TO_SCAN) {
          if (fs.existsSync(dir)) {
            fs.watch(dir, (eventType, filename) => {
              if (filename && !filename.endsWith('.webp')) {
                convertSingleImage(path.join(dir, filename));
              }
            });
          }
        }
      }
    }
  });
}
