import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = await request.json();
    const filePath = path.join(process.cwd(), 'content', 'pages', 'home.json');
    
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
                } else {
                  target[key][i] = item;
                }
              });
            } else if (source[key] && typeof source[key] === 'object') {
              for (const subKey of Object.keys(source[key])) {
                const idx = Number(subKey);
                if (!isNaN(idx) && idx >= 0) {
                  if (idx < target[key].length && typeof target[key][idx] === 'object' && typeof source[key][subKey] === 'object') {
                    target[key][idx] = deepMerge(target[key][idx], source[key][subKey]);
                  } else {
                    target[key][idx] = source[key][subKey];
                  }
                }
              }
            } else {
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

    return new Response(JSON.stringify({ success: true, message: "Obsah byl úspěšně uložen do home.json" }), {
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
