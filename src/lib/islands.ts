import type { IslandRegistry } from '@tinacms/astro/experimental';
import type { QueryResult } from '@tinacms/astro/data';
import type { PageQuery, LegalQuery } from '../../tina/__generated__/types';
import PageContent from '../components/PageContent.astro';
import LegalContent from '../components/LegalContent.astro';
import { getHomePageDataQuery, getLegalPageDataQuery } from './data';

export const islands: IslandRegistry = {
  page: {
    fetch: () => getHomePageDataQuery(),
    component: PageContent,
    wrapper: { tag: 'div', className: 'flex flex-col flex-grow min-h-screen w-full max-w-full min-w-0' },
    propsFromData: (data) => ({
      page: (data as QueryResult<PageQuery>).data?.page,
    }),
  },
  privacy: {
    fetch: () => getLegalPageDataQuery('privacy.json'),
    component: LegalContent,
    wrapper: { tag: 'div', className: 'flex flex-col flex-grow w-full max-w-full' },
    propsFromData: (data) => ({
      legal: (data as QueryResult<LegalQuery>).data?.legal,
      type: 'privacy' as const,
    }),
  },
  terms: {
    fetch: () => getLegalPageDataQuery('terms.json'),
    component: LegalContent,
    wrapper: { tag: 'div', className: 'flex flex-col flex-grow w-full max-w-full' },
    propsFromData: (data) => ({
      legal: (data as QueryResult<LegalQuery>).data?.legal,
      type: 'terms' as const,
    }),
  },
};

