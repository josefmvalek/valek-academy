import type { IslandRegistry } from '@tinacms/astro/experimental';
import type { QueryResult } from '@tinacms/astro/data';
import type { PageQuery, LegalQuery, GalleryQuery } from '../../tina/__generated__/types';
import PageContent from '../components/PageContent.astro';
import LegalContent from '../components/LegalContent.astro';
import GalleryView from '../components/GalleryView.astro';
import CenikContent from '../components/CenikContent.astro';
import { getHomePageDataQuery, getLegalPageDataQuery, getGalleryDataQuery, getPricingPageDataQuery } from './data';

export const islands: IslandRegistry = {
  page: {
    fetch: () => getHomePageDataQuery(),
    component: PageContent,
    wrapper: { tag: 'div', className: 'flex flex-col flex-grow min-h-screen w-full max-w-full min-w-0' },
    propsFromData: (data) => ({
      page: (data as QueryResult<PageQuery>).data?.page,
    }),
  },
  gallery: {
    fetch: () => getGalleryDataQuery(),
    component: GalleryView,
    wrapper: { tag: 'div', className: 'flex flex-col flex-grow w-full max-w-full min-w-0' },
    propsFromData: (data) => ({
      gallery: (data as QueryResult<GalleryQuery>).data?.gallery,
    }),
  },
  cenik: {
    fetch: () => getPricingPageDataQuery(),
    component: CenikContent,
    wrapper: { tag: 'div', className: 'flex flex-col flex-grow w-full max-w-full min-w-0' },
    propsFromData: (data) => ({
      cenik: (data as any).data?.cenik,
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

