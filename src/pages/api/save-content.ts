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
    const payload = await request.json();
    const targetFileName = typeof payload._file === 'string' ? payload._file : 'home.json';
    delete payload._file;

    const fileMap: Record<string, string> = {
      'home.json': path.join(process.cwd(), 'content', 'pages', 'home.json'),
      'cenik.json': path.join(process.cwd(), 'content', 'pricing', 'cenik.json'),
      'rozvrh.json': path.join(process.cwd(), 'content', 'schedule', 'rozvrh.json'),
      'gallery.json': path.join(process.cwd(), 'content', 'gallery', 'gallery.json'),
      'privacy.json': path.join(process.cwd(), 'content', 'legal', 'privacy.json'),
      'terms.json': path.join(process.cwd(), 'content', 'legal', 'terms.json'),
      'ochrana-osobnich-udaju.json': path.join(process.cwd(), 'content', 'legal', 'privacy.json'),
      'obchodni-podminky.json': path.join(process.cwd(), 'content', 'legal', 'terms.json'),
    };

    let filePath = fileMap[targetFileName];
    if (!filePath && targetFileName.startsWith('blog/')) {
      filePath = path.join(process.cwd(), 'content', targetFileName);
    }
    if (!filePath) {
      filePath = fileMap['home.json'];
    }

    // If target is a blog article and payload contains blog.<slug> namespace, unwrap it
    if (targetFileName.startsWith('blog/') && payload.blog && typeof payload.blog === 'object') {
      const slug = targetFileName.replace(/^blog\//, '').replace(/\.json$/, '');
      if (slug && payload.blog[slug]) {
        const blogData = payload.blog[slug];
        delete payload.blog;
        Object.assign(payload, blogData);
      }
    }

    // If target is gallery.json and payload contains gallery namespace, unwrap it
    if (targetFileName === 'gallery.json' && payload.gallery && typeof payload.gallery === 'object') {
      const galleryData = payload.gallery;
      delete payload.gallery;
      Object.assign(payload, galleryData);
    }

    // If target is cenik.json and payload contains cenik namespace, unwrap it
    if (targetFileName === 'cenik.json' && payload.cenik && typeof payload.cenik === 'object') {
      const cenikData = payload.cenik;
      delete payload.cenik;
      Object.assign(payload, cenikData);
    }

    // If target is rozvrh.json and payload contains rozvrh namespace, unwrap it
    if (targetFileName === 'rozvrh.json' && payload.rozvrh && typeof payload.rozvrh === 'object') {
      const rozvrhData = payload.rozvrh;
      delete payload.rozvrh;
      Object.assign(payload, rozvrhData);
    }

    // If target is privacy.json or terms.json and payload contains legal namespace, unwrap it
    if ((targetFileName === 'privacy.json' || targetFileName === 'terms.json' || targetFileName === 'ochrana-osobnich-udaju.json' || targetFileName === 'obchodni-podminky.json') && payload.legal && typeof payload.legal === 'object') {
      const legalData = payload.legal;
      delete payload.legal;
      Object.assign(payload, legalData);
    }

    // Read current file to preserve structure
    const currentRaw = await fs.readFile(filePath, 'utf-8');
    const currentData = JSON.parse(currentRaw);

    // Deep merge helper that properly preserves arrays and objects
    function deepMerge(target: any, source: any): any {
      if (!source || typeof source !== 'object') {
        return source;
      }
      if (!target || typeof target !== 'object') {
        return source;
      }

      if (Array.isArray(target)) {
        const sourceKeys = Object.keys(source);
        for (const key of sourceKeys) {
          const idx = Number(key);
          if (!isNaN(idx) && idx >= 0) {
            if (idx < target.length && typeof target[idx] === 'object' && typeof source[key] === 'object') {
              target[idx] = deepMerge(target[idx], source[key]);
            } else {
              target[idx] = source[key];
            }
          }
        }
        return target;
      }

      for (const key of Object.keys(source)) {
        if (key in target) {
          if (Array.isArray(target[key])) {
            if (Array.isArray(source[key])) {
              source[key].forEach((item: any, i: number) => {
                if (i < target[key].length && typeof target[key][i] === 'object' && typeof item === 'object') {
                  target[key][i] = deepMerge(target[key][i], item);
                } else if (item !== undefined) {
                  target[key][i] = item;
                }
              });
            } else if (source[key] && typeof source[key] === 'object') {
              for (const subKey of Object.keys(source[key])) {
                const idx = Number(subKey);
                if (!isNaN(idx) && idx >= 0) {
                  if (idx < target[key].length && typeof target[key][idx] === 'object' && typeof source[key][subKey] === 'object') {
                    target[key][idx] = deepMerge(target[key][idx], source[key][subKey]);
                  } else if (source[key][subKey] !== undefined) {
                    target[key][idx] = source[key][subKey];
                  }
                }
              }
            } else if (source[key] !== undefined) {
              target[key] = source[key];
            }
          } else if (target[key] && typeof target[key] === 'object' && source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            target[key] = deepMerge(target[key], source[key]);
          } else {
            target[key] = source[key];
          }
        } else {
          target[key] = source[key];
        }
      }
      return target;
    }

    const updatedData = deepMerge(currentData, payload);

    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), 'utf-8');

    return new Response(JSON.stringify({ success: true, message: `Obsah byl úspěšně uložen do ${path.basename(filePath)}` }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Error saving content:', err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
