# 📝 Příručka správy obsahu & CMS – VALEK ACADEMY

> **Kompletní manuál pro správu obsahu, TinaCMS schéma a In-Page Visual Editor na webu [valekacademy.cz](https://valekacademy.cz).**

---

## 💎 Filozofie: 100% CMS-First architektura

Každé slovo, číslo, odkaz, ikona, štítek a obrázek na webu VALEK ACADEMY je plně editovatelný bez nutnosti sahat do zdrojového kódu šablon. Web podporuje dva doplňující se způsoby editace:

1. **TinaCMS Administrace (`/admin`):** Plnohodnotné redakční prostředí napojené na Git repozitář s podporou verzování, větví a RichText editoru.
2. **In-Page Visual Editor (Přímo na stránce):** Interaktivní režim v lokálním vývoji (`npm run dev`), kde stačí kliknout na text nebo fotografii přímo v živém rozhraní.

---

## 🗂️ Přehled kolekcí v `tina/config.ts` a `content/`

| Kolekce | Cesta v repozitáři | Formát | Popis a klíčové sekce |
| :--- | :--- | :--- | :--- |
| **`page`** | [`content/pages/home.json`](file:///c:/Users/Jozka/Desktop/ValekAcademy/content/pages/home.json) | JSON | Hlavní stránka (`/`): SEO, Navbar, Hero, Audio preview, Audience, Metodika, Rozvrhové bloky, Ceník, Srovnání, Reference, SCIO, Blog preview, FAQ, Kontakt, Footer, Sticky CTA a WhatsApp widget. |
| **`pricing`** | [`content/pricing/cenik.json`](file:///c:/Users/Jozka/Desktop/ValekAcademy/content/pricing/cenik.json) | JSON | Samostatná podstránka ceníku (`/cenik`): Ceníkové karty balíčků, kalkulátor slev, srovnávací tabulka, garance a FAQ ceníku. |
| **`schedule`** | [`content/schedule/rozvrh.json`](file:///c:/Users/Jozka/Desktop/ValekAcademy/content/schedule/rozvrh.json) | JSON | Týdenní rozvrh (`/rozvrh`): 15 zvířecích skupinek, dny v týdnu, časy, počty obsazených míst, maximální kapacity, stavy a bloky pro dospělé a 1 na 1. |
| **`gallery`** | [`content/gallery/gallery.json`](file:///c:/Users/Jozka/Desktop/ValekAcademy/content/gallery/gallery.json) | JSON | Fotogalerie (`/galerie`): Fotografie doučovny, didaktických her, výuky a knihovničky, včetně popisků pro Image Sitemap. |
| **`legal`** | [`content/legal/terms.json`](file:///c:/Users/Jozka/Desktop/ValekAcademy/content/legal/terms.json)<br>[`content/legal/privacy.json`](file:///c:/Users/Jozka/Desktop/ValekAcademy/content/legal/privacy.json) | JSON | Právní náležitosti: Obchodní podmínky (`/obchodni-podminky`) a Zásady ochrany osobních údajů (`/ochrana-osobnich-udaju`). |
| **`blog`** | [`content/blog/*.json`](file:///c:/Users/Jozka/Desktop/ValekAcademy/content/blog/) | JSON | Články pro rodiče (`/blog/[slug]`): Titulek, kategorie, doba čtení, autor, profilová fotka, text článku, tip lektora a CTA box. |

---

## ✏️ Duální Click-to-Edit systém

Aby byl prvek plně editovatelný v obou editorech, komponenty v `src/components/` nesou dva typy data atributů:

```astro
---
import { tinaField } from '@tinacms/astro/tina-field';
import { formatRichText } from '../lib/richText';

const { hero = {} } = Astro.props;
const title = hero.title || "Výchozí nadpis";
---

<h1
  data-tina-field={tinaField(hero, 'title')}
  data-edit-key="hero.title"
  data-edit-label="Hlavní nadpis v Hero"
  set:html={formatRichText(title)}
/>
```

### Význam atributů:
- **`data-tina-field={tinaField(obj, 'field')}`:** Propojuje prvek s TinaCMS Live Editing iframe v `/admin`. Po kliknutí se v postranním panelu TinaCMS otevře odpovídající formulářové pole.
- **`data-edit-key="cesta.v.json"`:** Určuje tečkovou notaci v JSON souboru (např. `hero.title`, `schedule.groups[0].occupiedSeats`). Slouží pro In-Page Visual Editor.
- **`data-edit-label="Český název"`:** Čitelný popisek zobrazený v tooltipu a editačním dialogu In-Page editoru.

---

## 🔤 Formátování RichText (`formatRichText`)

Pro nadpisy a texty, které vyžadují grafické zvýraznění slov (např. zlaté či tučné slovo), se v šablonách používá pomocná funkce [`formatRichText()`](file:///c:/Users/Jozka/Desktop/ValekAcademy/src/lib/richText.ts):

### Podporovaná syntaxe:
* `**tučný text**` nebo `<b>tučný text</b>` nebo `<strong>tučný text</strong>` $\rightarrow$ **tučné písmo**
* `*kurzíva*` nebo `_kurzíva_` nebo `<i>kurzíva</i>` $\rightarrow$ *kurzíva*
* `__podtržený text__` nebo `<u>podtržený text</u>` $\rightarrow$ <u>podtržený text</u>
* Nový řádek $\rightarrow$ `<br />`
* Dva nové řádky $\rightarrow$ blokový odstavec `<span class="block mt-3"></span>`

### Zabezpečení:
Funkce automaticky escapuje a maže jakékoliv tagy `<script>`, `<iframe>` nebo inline javascriptové události (`onclick` apod.).

---

## 🛠️ In-Page Visual Editor (`VisualEditor.astro`)

In-Page Editor je aktivní pouze v lokálním vývojovém režimu (`import.meta.env.DEV`).

### Jak pracovat s In-Page editorem:
1. Spusťte `npm run dev` a otevřete `http://localhost:4321`.
2. V levém dolním rohu klikněte na zlaté plovoucí tlačítko **✏️ Upravit web**.
3. Na horním okraji obrazovky se vysune ovládací lišta **Režim úprav aktivní**.
4. **Editace textů:** Klikněte na jakýkoliv text označený rámečkem a přepište jej přímo v živé stránce.
5. **Výměna obrázků:** Kliknutím na obrázek se otevře modální okno umožňující:
   - Nahrát novou fotografii z disku počítače (automaticky se zkonvertuje přes Sharp do WebP o šířce max 1920 px).
   - Vybrat existující fotografii z přednastavené knihovničky doučovny.
6. **Uložení:** Klikněte na tlačítko **💾 Uložit změny**. Změny se odešlou na `/api/save-content`, kde proběhne přetypování a zápis do příslušného JSON souboru.

### Typová koerce (`coerceValue`):
Endpoint [`/api/save-content`](file:///c:/Users/Jozka/Desktop/ValekAcademy/src/pages/api/save-content.ts) inteligentně převádí hodnoty:
- Pokud uživatel do číselného pole zadá `"320 Kč"`, backend automaticky vyextrahuje číslo `320`.
- Zabraňuje se tak poškození číselných a logických typů ve schématu TinaCMS.

---

## 🦘 Nastavení týdenního rozvrhu skupinek (`rozvrh.json`)

V rozvrhu je definováno **15 zvířecích skupinek** (Klokánci, Koaly, Vombati, Dingo, Krokodýli...). Každá skupinka má následující konfigurační parametry:

```json
{
  "id": "kangaroos",
  "day": "Pondělí",
  "time": "12:30 – 13:30",
  "animal": "Kangaroos",
  "emoji": "🦘",
  "cohort": "1.–3. třída",
  "cohortBadge": "Hravé deskovky & základy",
  "walkHint": "📍 Ze ZŠ UNESCO přes přechod 90 vteřin",
  "occupiedSeats": 5,
  "maxSeats": 8,
  "waitingListSeats": 4,
  "statusOverride": "auto",
  "description": "Základy angličtiny formou didaktických deskovek..."
}
```

### Logika stavů obsazenosti:
- **`statusOverride: "auto"` (Výchozí):**
  - Obsazenost `< maxSeats` (např. 0–7 z 8) $\rightarrow$ 🟢 **Volná místa**
  - Obsazenost $\ge$ `maxSeats` (8–11) $\rightarrow$ 🟡 **Čekací listina (Waiting list)**
  - Obsazenost $\ge$ `maxSeats + waitingListSeats` (12+) $\rightarrow$ 🔴 **Obsazeno (We're full)**
- **Manuální přepsání (`statusOverride`):**
  - `"open"` $\rightarrow$ Vynutí stav Volno bez ohledu na počty
  - `"waiting_list"` $\rightarrow$ Vynutí Čekací listinu
  - `"full"` $\rightarrow$ Vynutí Plně obsazeno

---

## 🧮 Nastavení dynamického kalkulátoru slev (`cenik.json`)

Kalkulátor slev podporuje dva oddělené režimy výuky:
1. **Děti ZŠ (60 min):** Základní sazba `basePrice` (např. 320 Kč).
2. **SŠ a dospělí (90 min):** Základní sazba `basePriceTeens` (např. 480 Kč).

Ceny jednotlivých období (1 měsíc, 3 měsíce, Pololetí, Celý rok) se **automaticky dynamicky dopočítávají** z procentuální slevy `baseDiscount`:
$$\text{Cena za lekci} = \text{basePrice} \times \left(1 - \frac{\text{baseDiscount}}{100}\right)$$
$$\text{Celková cena} = \text{Cena za lekci} \times \text{počet týdnů}$$

Kalkulátor navíc obsahuje volitelný přepínač **Kamarádské / sourozenecké slevy (Tandem bonus -5 %)**, který po zaškrtnutí automaticky odečte dalších 5 % z celkové sumy a připraví konverzní odkaz přímo do WhatsAppu lektora.
