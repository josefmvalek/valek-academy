import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function makeFavicons() {
  const root = process.cwd();
  const src = path.join(root, 'public', 'images', 'valek-academy-logo.jpg');
  
  if (!fs.existsSync(src)) {
    console.error('Source logo not found at:', src);
    return;
  }

  const size = 1024;
  const radius = 490;
  const cx = 509;
  const cy = 502;
  
  // Create SVG circle mask
  const circleSvg = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${cx}" cy="${cy}" r="${radius}" fill="white" /></svg>`
  );
  
  // Composite mask over logo to get transparent corners
  const maskedLogo = await sharp(src)
    .composite([{
      input: circleSvg,
      blend: 'dest-in'
    }])
    .png()
    .toBuffer();

  const pngBuffers = [];
  const icoSizes = [16, 32, 48];

  for (const s of icoSizes) {
    const buf = await sharp(maskedLogo)
      .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    pngBuffers.push({ buffer: buf, width: s, height: s });
  }

  // Create standard ICO format
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  let offset = 6 + count * 16;
  const dirEntries = [];
  for (const img of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // image offset
    dirEntries.push(entry);
    offset += img.buffer.length;
  }

  const icoBuf = Buffer.concat([header, ...dirEntries, ...pngBuffers.map(b => b.buffer)]);
  fs.writeFileSync(path.join(root, 'public', 'favicon.ico'), icoBuf);

  // Generate PNG sizes
  await sharp(maskedLogo).resize(48, 48).png().toFile(path.join(root, 'public', 'favicon-48x48.png'));
  await sharp(maskedLogo).resize(96, 96).png().toFile(path.join(root, 'public', 'favicon-96x96.png'));
  await sharp(maskedLogo).resize(192, 192).png().toFile(path.join(root, 'public', 'favicon-192x192.png'));
  await sharp(maskedLogo).resize(32, 32).png().toFile(path.join(root, 'public', 'favicon-32x32.png'));
  
  // Apple touch icon (180x180 with solid soft background #FAF7F2 for iOS)
  await sharp(src)
    .resize(180, 180, { fit: 'cover' })
    .flatten({ background: '#FAF7F2' })
    .png()
    .toFile(path.join(root, 'public', 'apple-touch-icon.png'));

  console.log('✓ All favicons generated successfully (favicon.ico, favicon-48x48.png, favicon-96x96.png, favicon-192x192.png, apple-touch-icon.png)!');
}

makeFavicons().catch(console.error);
