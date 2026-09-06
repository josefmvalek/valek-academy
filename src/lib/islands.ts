import type { IslandRegistry } from '@tinacms/astro/experimental';
import type { QueryResult } from '@tinacms/astro/data';
import type { PageQuery } from '../../tina/__generated__/types';
import PageContent from '../components/PageContent.astro';
import { getHomePageDataQuery } from './data';

export const islands: IslandRegistry = {
  page: {
    fetch: () => getHomePageDataQuery(),
    component: PageContent,
    wrapper: { tag: 'main', className: 'flex-grow overflow-x-hidden w-full max-w-full min-w-0' },
    propsFromData: (data) => ({
      page: (data as QueryResult<PageQuery>).data?.page,
    }),
  },
};
