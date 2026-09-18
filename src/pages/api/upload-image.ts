import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.DEV) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Tento endpoint je dostupný pouze v lokálním vývojovém prostředí.' 
    }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ success: false, error: 'Nebyl nahrán žádný soubor obrázku.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check mime type
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif'];
    if (!validMimeTypes.includes(file.type)) {
      return new Response(JSON.stringify({ success: false, error: 'Povoleny jsou pouze obrázky (JPEG, PNG, WebP, GIF, SVG, AVIF).' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Max 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      return new Response(JSON.stringify({ success: false, error: 'Velikost obrázku nesmí přesáhnout 10 MB.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Ensure public/uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    // Sanitize filename
    const originalName = file.name || 'image.jpg';
    const ext = path.extname(originalName) || '.jpg';
    const baseName = path.basename(originalName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'obrazek';
    
    // Process buffer and convert to WebP unless it's SVG
    const arrayBuffer = await file.arrayBuffer();
    let buffer: any = Buffer.from(arrayBuffer);
    let finalExt = ext.toLowerCase();

    if (file.type !== 'image/svg+xml') {
      try {
        buffer = await sharp(buffer)
          .rotate() // Auto-orient phone photos
          .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 85, effort: 4 })
          .toBuffer();
        finalExt = '.webp';
      } catch (sharpErr) {
        console.warn('Auto WebP conversion failed, falling back to original:', sharpErr);
      }
    }

    const timestamp = Date.now();
    const finalFilename = `${baseName}-${timestamp}${finalExt}`;
    const destinationPath = path.join(uploadsDir, finalFilename);

    // Write file
    await fs.writeFile(destinationPath, buffer);

    const publicUrl = `/uploads/${finalFilename}`;

    return new Response(JSON.stringify({
      success: true,
      url: publicUrl,
      filename: finalFilename,
      message: 'Obrázek byl úspěšně nahrán.'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Error uploading image:', err);
    return new Response(JSON.stringify({
      success: false,
      error: err.message || 'Chyba při nahrávání obrázku na server.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
