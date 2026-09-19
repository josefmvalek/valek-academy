import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../tina/__generated__/client';
import homeContent from '../../content/pages/home.json';
import privacyContent from '../../content/legal/privacy.json';
import termsContent from '../../content/legal/terms.json';
import galleryContent from '../../content/gallery/gallery.json';
import cenikContent from '../../content/pricing/cenik.json';
import rozvrhContent from '../../content/schedule/rozvrh.json';
import blog1 from '../../content/blog/proc-deskovky-funguji.json';

export type PageData = typeof homeContent;
export type LegalData = typeof privacyContent;
export type GalleryData = typeof galleryContent;
export type CenikData = typeof cenikContent;
export type SchedulePageData = typeof rozvrhContent;
export type BlogPost = typeof blog1;

const rawBlogModules = import.meta.glob<{ default: BlogPost }>('../../content/blog/*.json', { eager: true });
export const defaultBlogPosts: BlogPost[] = Object.values(rawBlogModules)
  .map((mod: any) => (mod.default || mod) as BlogPost)
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

export function getBlogPosts(includeDisabled = false): BlogPost[] {
  if (includeDisabled) {
    return defaultBlogPosts;
  }
  return defaultBlogPosts.filter((p: any) => p.enabled !== false);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const clean = (slug || '').replace(/\.json$/, '');
  return defaultBlogPosts.find((p) => p.slug === clean);
}

/**
 * Načte data konkrétního článku blogu pomocí Tina clienta zabaleného do requestWithMetadata.
 * Umožní živou vizuální editaci a napojení formuláře článku v TinaCMS sidebaru v /admin.
 */
export async function getBlogPostDataQuery(slug: string) {
  const cleanSlug = (slug || '').replace(/\.json$/, '');
  const relativePath = `${cleanSlug}.json`;
  const fallback = getBlogPostBySlug(cleanSlug);
  try {
    return await requestWithMetadata(
      (client.queries as any).blog({ relativePath }),
      { priority: 'primary' }
    );
  } catch (e) {
    return {
      data: { blog: fallback as any },
      query: '',
      variables: { relativePath },
      id: cleanSlug,
    };
  }
}

/**
 * Načte data domovské stránky pomocí Tina clienta zabaleného do requestWithMetadata.
 * requestWithMetadata zajistí:
 * 1. Propojení s TinaCMS bridge pro live visual editing v /admin iframe
 * 2. Zaznamenání formuláře pro Tina sidebar
 * 3. Opatření dat metadaty pro click-to-edit (tinaField)
 * V případě, že GraphQL server neběží, bezpečně vrátí fallback z content/pages/home.json.
 */
export async function getHomePageDataQuery() {
  try {
    return await requestWithMetadata(
      client.queries.page({ relativePath: 'home.json' }),
      { priority: 'primary' }
    );
  } catch (e) {
    // Bezpečný fallback, pokud GraphQL server ještě nenaběhl nebo běží statický build
    return {
      data: { page: homeContent as any },
      query: '',
      variables: { relativePath: 'home.json' },
      id: 'home',
    };
  }
}

export async function getHomePageData(): Promise<PageData> {
  const result = await getHomePageDataQuery();
  return (result?.data?.page || homeContent) as PageData;
}

/**
 * Načte data právní stránky (privacy / terms) pomocí Tina clienta zabaleného do requestWithMetadata.
 */
export async function getLegalPageDataQuery(relativePath: 'privacy.json' | 'terms.json') {
  const fallback = relativePath === 'privacy.json' ? privacyContent : termsContent;
  try {
    return await requestWithMetadata(
      client.queries.legal({ relativePath }),
      { priority: 'primary' }
    );
  } catch (e) {
    return {
      data: { legal: fallback as any },
      query: '',
      variables: { relativePath },
      id: relativePath.replace('.json', ''),
    };
  }
}

export async function getLegalPageData(relativePath: 'privacy.json' | 'terms.json') {
  const result = await getLegalPageDataQuery(relativePath);
  const fallback = relativePath === 'privacy.json' ? privacyContent : termsContent;
  return (result?.data?.legal || fallback) as typeof fallback;
}

/**
 * Načte data fotogalerie pomocí Tina clienta zabaleného do requestWithMetadata.
 */
export async function getGalleryDataQuery() {
  try {
    return await requestWithMetadata(
      (client.queries as any).gallery({ relativePath: 'gallery.json' }),
      { priority: 'primary' }
    );
  } catch (e) {
    return {
      data: { gallery: galleryContent as any },
      query: '',
      variables: { relativePath: 'gallery.json' },
      id: 'gallery',
    };
  }
}

export async function getGalleryData(): Promise<GalleryData> {
  const result = await getGalleryDataQuery();
  return ((result?.data as any)?.gallery || galleryContent) as GalleryData;
}

/**
 * Načte data stránky podrobného ceníku pomocí Tina clienta zabaleného do requestWithMetadata.
 */
export async function getPricingPageDataQuery() {
  try {
    return await requestWithMetadata(
      (client.queries as any).cenik({ relativePath: 'cenik.json' }),
      { priority: 'primary' }
    );
  } catch (e) {
    return {
      data: { cenik: cenikContent as any },
      query: '',
      variables: { relativePath: 'cenik.json' },
      id: 'cenik',
    };
  }
}

export async function getPricingPageData(): Promise<CenikData> {
  const result = await getPricingPageDataQuery();
  return ((result?.data as any)?.cenik || cenikContent) as CenikData;
}

/**
 * Načte data stránky rozvrhu pomocí Tina clienta zabaleného do requestWithMetadata.
 */
export async function getSchedulePageDataQuery() {
  try {
    return await requestWithMetadata(
      (client.queries as any).rozvrh({ relativePath: 'rozvrh.json' }),
      { priority: 'primary' }
    );
  } catch (e) {
    return {
      data: { rozvrh: rozvrhContent as any },
      query: '',
      variables: { relativePath: 'rozvrh.json' },
      id: 'rozvrh',
    };
  }
}

export async function getSchedulePageData(): Promise<SchedulePageData> {
  const result = await getSchedulePageDataQuery();
  return ((result?.data as any)?.rozvrh || rozvrhContent) as SchedulePageData;
}



