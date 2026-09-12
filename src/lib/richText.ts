/**
 * Formátuje text s podporou bezpečného inline formátování (tučné, kurzíva, podtržení).
 * Podporuje jak standardní HTML značky (<b>, <strong>, <i>, <em>, <u>),
 * tak jednoduchý Markdown zápis (**tučné**, *kurzíva*, __podtržené__).
 */
export function formatRichText(text?: string | null): string {
  if (!text) return '';

  let formatted = String(text);

  // 1. Převod Markdown syntaxe na standardní značky
  // **tučné** -> <b>tučné</b>
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');

  // __podtržené__ -> <u>podtržené</u>
  formatted = formatted.replace(/__([^_]+)__/g, '<u>$1</u>');

  // *kurzíva* -> <i>kurzíva</i>
  formatted = formatted.replace(/(^|[^\*])\*([^*\n]+)\*([^\*]|$)/g, '$1<i>$2</i>$3');

  // _kurzíva_ -> <i>kurzíva</i>
  formatted = formatted.replace(/(^|[^_])_([^_\n]+)_([^_]|$)/g, '$1<i>$2</i>$3');

  // 2. Bezpečnostní ošetření: odstranění nebezpečných značek a událostí
  formatted = formatted
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');

  return formatted;
}
