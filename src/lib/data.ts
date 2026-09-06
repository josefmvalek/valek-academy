import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../tina/__generated__/client';
import homeContent from '../../content/pages/home.json';

export type PageData = typeof homeContent;

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
