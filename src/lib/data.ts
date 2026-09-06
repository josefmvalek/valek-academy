import homeContent from '../../content/pages/home.json';

export type PageData = typeof homeContent;

/**
 * Načte data domovské stránky.
 * Pokud je vygenerován Tina client a běží CMS, dotáže se Tina klienta.
 * V opačném případě bezpečně vrátí načtená data z lokálního JSON souboru.
 */
export async function getHomePageData(): Promise<PageData> {
  try {
    // Dynamický import pro Tina klienta generovaného z tina/config.ts
    // @ts-ignore
    const tinaClient = await import('../../tina/__generated__/client').catch(() => null);
    if (tinaClient?.default?.queries?.page) {
      const res = await tinaClient.default.queries.page({ relativePath: 'home.json' });
      if (res?.data?.page) {
        return res.data.page as unknown as PageData;
      }
    }
  } catch (e) {
    // Tichý fallback na lokální JSON
  }

  return homeContent as PageData;
}
