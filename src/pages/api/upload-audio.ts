import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

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
      return new Response(JSON.stringify({ success: false, error: 'Nebyl nahrán žádný zvukový soubor.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const originalName = file.name || 'nahravka.mp3';
    const ext = path.extname(originalName).toLowerCase() || '.mp3';

    // Check mime type and extension
    const validMimeTypes = [
      'audio/mpeg',
      'audio/mp3',
      'audio/wav',
      'audio/wave',
      'audio/x-wav',
      'audio/ogg',
      'application/ogg',
      'audio/m4a',
      'audio/x-m4a',
      'audio/mp4',
      'audio/aac',
      'audio/x-aac',
      'audio/webm',
    ];
    const validExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.webm'];

    const hasValidMime = validMimeTypes.includes(file.type);
    const hasValidExt = validExtensions.includes(ext);

    if (!hasValidMime && !hasValidExt) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Povoleny jsou pouze zvukové soubory (MP3, WAV, OGG, M4A, AAC, WEBM).' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Max 25MB limit
    if (file.size > 25 * 1024 * 1024) {
      return new Response(JSON.stringify({ success: false, error: 'Velikost zvukového souboru nesmí přesáhnout 25 MB.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Ensure public/uploads/audio directory exists
    const uploadsAudioDir = path.join(process.cwd(), 'public', 'uploads', 'audio');
    await fs.mkdir(uploadsAudioDir, { recursive: true });

    // Sanitize filename
    const baseName = path.basename(originalName, ext)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'nahravka';

    const timestamp = Date.now();
    const finalFilename = `${baseName}-${timestamp}${ext}`;
    const destinationPath = path.join(uploadsAudioDir, finalFilename);

    // Write file
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(destinationPath, buffer);

    const publicUrl = `/uploads/audio/${finalFilename}`;

    return new Response(JSON.stringify({
      success: true,
      url: publicUrl,
      filename: finalFilename,
      size: file.size,
      message: 'Zvukový soubor byl úspěšně nahrán.'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Error uploading audio:', err);
    return new Response(JSON.stringify({
      success: false,
      error: err.message || 'Chyba při nahrávání zvukového souboru na server.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
