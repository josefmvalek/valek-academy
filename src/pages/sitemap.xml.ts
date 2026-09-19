import type { APIRoute } from 'astro';
import galleryData from '../../content/gallery/gallery.json';

export const prerender = true;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  const siteUrl = 'https://valekacademy.cz';
  const today = new Date().toISOString().split('T')[0];

  // Extract gallery photos for Google Image Sitemap
  const galleryImages: Array<{ url: string; title: string; caption?: string }> = [];
  if (galleryData?.categories && Array.isArray(galleryData.categories)) {
    for (const cat of galleryData.categories) {
      if (Array.isArray(cat.photos)) {
        for (const photo of cat.photos) {
          if (photo.image) {
            galleryImages.push({
              url: photo.image.startsWith('http') ? photo.image : `${siteUrl}${photo.image}`,
              title: photo.title || 'VALEK ACADEMY Uherské Hradiště',
              caption: photo.description || ''
            });
          }
        }
      }
    }
  }

  const pages = [
    {
      loc: `${siteUrl}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '1.0',
      images: [
        {
          url: `${siteUrl}/images/valek-academy-logo.webp`,
          title: 'VALEK ACADEMY • Angličtina v Uherském Hradišti hrou a deskovkami',
          caption: 'Lektor Josef Válek vyrostl v Austrálii a učí děti v malých skupinkách.'
        },
        {
          url: `${siteUrl}/images/josef-valek.webp`,
          title: 'Lektor Josef Válek – Melbourne roots, 25+ let v ČR',
          caption: 'Výuka angličtiny formou deskových her v centru Uherského Hradiště.'
        },
        {
          url: `${siteUrl}/images/board-games-3d.webp`,
          title: 'Deskové hry pro hravou výuku angličtiny',
          caption: 'Karak, Scrabble, Dixit a didaktické hry ve VALEK ACADEMY.'
        },
        {
          url: `${siteUrl}/images/doucovna-stul.webp`,
          title: 'Útulná doučovna s herním stolem pro 4–8 dětí',
          caption: 'Růžová 1238, Uherské Hradiště (naproti ZŠ UNESCO).'
        }
      ]
    },
    {
      loc: `${siteUrl}/rozvrh`,
      lastmod: today,
      changefreq: 'daily',
      priority: '0.9',
      images: []
    },
    {
      loc: `${siteUrl}/cenik`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.9',
      images: []
    },
    {
      loc: `${siteUrl}/galerie`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8',
      images: galleryImages
    },
    {
      loc: `${siteUrl}/obchodni-podminky`,
      lastmod: today,
      changefreq: 'yearly',
      priority: '0.3',
      images: []
    },
    {
      loc: `${siteUrl}/ochrana-osobnich-udaju`,
      lastmod: today,
      changefreq: 'yearly',
      priority: '0.3',
      images: []
    }
  ];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages
  .map(
    (page) => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${
      page.images && page.images.length > 0
        ? '\n' +
          page.images
            .map(
              (img) => `    <image:image>
      <image:loc>${escapeXml(img.url)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>${
        img.caption ? `\n      <image:caption>${escapeXml(img.caption)}</image:caption>` : ''
      }
    </image:image>`
            )
            .join('\n')
        : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600'
    }
  });
};
