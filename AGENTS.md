# 🤖 VALEK ACADEMY – Developer & Agent Guidelines

> **Závazná metodická příručka pro vývojáře a AI agenty pracující v repozitáři [valekacademy.cz](https://valekacademy.cz).**  
> Tato pravidla mají nejvyšší prioritu a musí být bezvýhradně dodržována při jakékoliv úpravě či tvorbě kódu.

---

## 🏛️ 1. Architektura & CMS-First Zákon

Projekt využívá hybridní architekturu:
* **Astro v5 (output: 'server' na Vercelu):** Bleskový statický prerendering veřejných stránek v kombinaci se serverless API.
* **TinaCMS v3 (`/admin`):** Git-backed headless CMS ukládající data přímo do JSON souborů v [`content/`](file:///c:/Users/Jozka/Desktop/ValekAcademy/content/).
* **In-Page Visual Editor:** Živá editace textů a médií přímo v prohlížeči v lokálním režimu (`import.meta.env.DEV`).

### ⚠️ ZÁVAZNÉ PRAVIDLO: Všechno vygenerované musí být editovatelné v CMS
1. **Žádné hardcoded texty v šablonách:**  
   Každé slovo, nadpis, podnadpis, odznak, tlačítko, odkaz, ikona, tooltip i vysvětlující poznámka musí mít:
   - Definici typu v [`tina/config.ts`](file:///c:/Users/Jozka/Desktop/ValekAcademy/tina/config.ts)
   - Výchozí českou hodnotu v příslušném JSON souboru v [`content/`](file:///c:/Users/Jozka/Desktop/ValekAcademy/content/)
   - Bezpečný fallback přímo v `.astro` komponentě:
     ```typescript
     const title = props.title || "Výchozí český nadpis";
     ```
2. **Povinné Click-to-Edit atributy:**  
   Každý zobrazovaný textový nebo mediální prvek musí nést oba atributy pro oba editory:
   ```astro
   <h2
     data-tina-field={tinaField(section, 'title')}
     data-edit-key="nazevSekce.title"
     data-edit-label="Nadpis sekce"
     set:html={formatRichText(title)}
   />
   ```
3. **Formátování RichText:**  
   Pro podporu zvýrazněných slov (tučné/kurzíva) používejte výhradně pomocnou funkci:
   ```astro
   import { formatRichText } from '../lib/richText';
   // ...
   <p set:html={formatRichText(subtitle)} />
   ```
   *Nikdy nepoužívejte holé `set:html` bez očištění přes `formatRichText()`!*
4. **Typová bezpečnost v CMS schématu:**  
   Číselná pole (např. `occupiedSeats`, `basePrice`, `weeks`) definujte jako `type: "number"`. Při ukládání přes `/api/save-content` se aplikuje funkce `coerceValue`, která chrání schéma před stringovými vstupy.

---

## 🧩 2. Standard tvorby komponent (`src/components/`)

Při vytváření nebo rozšiřování komponent dodržujte tuto strukturu:

```astro
---
import { tinaField } from '@tinacms/astro/tina-field';
import { formatRichText } from '../lib/richText';

interface Props {
  data?: {
    enabled?: boolean;
    badge?: string;
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    [key: string]: any;
  };
  className?: string;
}

const { data = {}, className = "" } = Astro.props;

// 1. Bezpečné fallbacky pro každé pole
const enabled = data.enabled !== false;
const badge = data.badge || "Štítek sekce";
const title = data.title || "Hlavní nadpis sekce";
const subtitle = data.subtitle || "Doplňující podnadpis";
const ctaText = data.ctaText || "Akční tlačítko";
const ctaLink = data.ctaLink || "#kontakt";

if (!enabled) return null;
---

<section class:list={["py-16 sm:py-24 relative overflow-hidden", className]}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Záhlaví sekce -->
    <div class="text-center max-w-3xl mx-auto mb-12">
      <span
        class="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300"
        data-tina-field={tinaField(data, 'badge')}
        data-edit-key="mojeSekce.badge"
        data-edit-label="Štítek sekce"
      >
        {badge}
      </span>
      <h2
        class="text-fluid-h2 font-heading font-black text-espresso-950 mt-3"
        data-tina-field={tinaField(data, 'title')}
        data-edit-key="mojeSekce.title"
        data-edit-label="Nadpis sekce"
        set:html={formatRichText(title)}
      />
      <p
        class="text-fluid-body text-stone-600 mt-4"
        data-tina-field={tinaField(data, 'subtitle')}
        data-edit-key="mojeSekce.subtitle"
        data-edit-label="Podnadpis sekce"
        set:html={formatRichText(subtitle)}
      />
    </div>

    <!-- Tělo komponenty -->
    <div class="game-tile p-6 sm:p-8">
      <!-- ... -->
    </div>
  </div>
</section>
```

---

## 🛡️ 3. Zásady odolnosti a záložních řešení (Resilience)

1. **Formulářové poptávky:**  
   Jakýkoliv rezervační či kontaktní mechanismus musí podporovat duální odesílání:
   - **Primární:** `/api/send-reservation` přes Resend.
   - **Sekundární fallback:** Web3Forms API.  
   *Uživatel nesmí v žádném případě přijít o rozepsanou poptávku.*
2. **Čtení dat z CMS:**  
   Všechny dotazy v [`src/lib/data.ts`](file:///c:/Users/Jozka/Desktop/ValekAcademy/src/lib/data.ts) musí obsahovat `try/catch` s fallbackem na lokální JSON soubory, aby web fungoval offline a bez spuštěného Tina GraphQL serveru.
3. **Vývojové endpointy:**  
   Všechny routy měnící soubory na disku (`save-content`, `upload-image`, `upload-audio`) musí začínat:
   ```typescript
   if (!import.meta.env.DEV) {
     return new Response(JSON.stringify({ success: false, error: 'Endpoint dostupný pouze v DEV.' }), { status: 403 });
   }
   ```

---

## 🎨 4. Design & Typografická pravidla

1. **Žádné externí Google Fonts z CDN:** Používejte výhradně self-hosted `@fontsource` importované v `global.css`.
2. **Herní fyzikalita:** Tlačítka a karty stylovat pomocí tříd `.game-btn`, `.game-btn-gold`, `.game-tile`, `.game-card`.
3. **Barvy:** Držet se definovaných tokenů:
   - `espresso-950` / `espresso-900` pro texty (nikdy čisté `#000000`).
   - `parchment-50` / `#FAF7F2` pro pozadí (nikdy ostré čisté `#ffffff` pro celé tělo webu).
   - `gold-500` / `gold-600` / `gold-700` pro australský akcent.
   - `oxford-700` / `oxford-800` pro modrý kontrast.
   - `eucalyptus-600` pro zelené úspěšné stavy a volná místa 🟢.
4. **Responzivní škálování:** Používejte `text-fluid-h1` až `text-fluid-small`.

---

## 🔍 5. SEO & Kontrolní checklist před odevzdáním kódu

Před dokončením jakéhokoliv úkolu musí agent provést následující ověření:

- [ ] **Typecheck:** Příkaz `npm run typecheck` musí proběhnout s výsledkem **0 errors, 0 warnings, 0 hints**.
- [ ] **CMS synchronizace:** Každé nové pole v `tina/config.ts` má zrcadlovou výchozí hodnotu v odpovídajícím `content/**/*.json`.
- [ ] **Click-to-Edit:** Prvek má správně nastavené `data-tina-field` i `data-edit-key` a `data-edit-label`.
- [ ] **RichText bezpečnost:** Formátovaný text prochází přes `formatRichText()`.
- [ ] **Obrázky:** Nové obrázky jsou ve formátu WebP (max šířka 1920 px).
- [ ] **Odkazy na dokumentaci:** Změny jsou v souladu s podrobnými průvodci v adresáři [`docs/`](file:///c:/Users/Jozka/Desktop/ValekAcademy/docs/):
  - [docs/ARCHITECTURE.md](file:///c:/Users/Jozka/Desktop/ValekAcademy/docs/ARCHITECTURE.md)
  - [docs/CMS_AND_CONTENT_GUIDE.md](file:///c:/Users/Jozka/Desktop/ValekAcademy/docs/CMS_AND_CONTENT_GUIDE.md)
  - [docs/DESIGN_SYSTEM.md](file:///c:/Users/Jozka/Desktop/ValekAcademy/docs/DESIGN_SYSTEM.md)
  - [docs/SEO_AND_PERFORMANCE.md](file:///c:/Users/Jozka/Desktop/ValekAcademy/docs/SEO_AND_PERFORMANCE.md)
