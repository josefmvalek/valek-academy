import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../tina/__generated__/client';
import homeContent from '../../content/pages/home.json';
import privacyContent from '../../content/legal/privacy.json';
import termsContent from '../../content/legal/terms.json';

export type PageData = typeof homeContent;
export type LegalData = typeof privacyContent;

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

