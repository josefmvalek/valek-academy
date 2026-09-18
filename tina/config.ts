import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const scheduleField: any = {
  type: "object",
  name: "schedule",
  label: "📅 Harmonogram & Rezervace týdenních slotů",
  fields: [
    { type: "boolean", name: "enabled", label: "Zobrazit harmonogram na webu?" },
    { type: "string", name: "badge", label: "Odznáček sekce" },
    { type: "string", name: "title", label: "Nadpis sekce" },
    { type: "string", name: "subtitle", label: "Podnadpis sekce", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },

    // Smart Group Finder Fields
    { type: "string", name: "smartFinderTabLabel", label: "Přepínač: Název záložky Vyhledávače (např. Chytrý 2krokový vyhledávač)" },
    { type: "string", name: "smartFinderTabBadge", label: "Přepínač: Štítek záložky (např. Doporučeno)" },
    { type: "string", name: "fullScheduleTabLabel", label: "Přepínač: Název záložky Celý rozvrh (např. Celý týdenní rozvrh (15))" },
    { type: "string", name: "smartFinderBadge", label: "Vyhledávač: Horní štítek (např. 🎯 RYCHLÝ VÝBĚR VHODNÉ SKUPINKY)" },
    { type: "string", name: "smartFinderTime", label: "Vyhledávač: Odhad času (např. Zabere 15 vteřin)" },
    { type: "string", name: "smartFinderFree", label: "Vyhledávač: Štítek lekce zdarma (např. 🎁 1. lekce 100% ZDARMA)" },
    { type: "string", name: "smartStep1Title", label: "Vyhledávač: Nadpis kroku 1 (např. 1. Do jaké třídy dítě chodí?)" },
    { type: "string", name: "smartCohort1Title", label: "Vyhledávač: Ročník 1 – Název (např. 1.–3. třída ZŠ)" },
    { type: "string", name: "smartCohort1Sub", label: "Vyhledávač: Ročník 1 – Čas (např. 12:30–13:30 • 60 min)" },
    { type: "string", name: "smartCohort2Title", label: "Vyhledávač: Ročník 2 – Název (např. 4.–6. třída ZŠ)" },
    { type: "string", name: "smartCohort2Sub", label: "Vyhledávač: Ročník 2 – Čas (např. 13:30–14:30 • 60 min)" },
    { type: "string", name: "smartCohort3Title", label: "Vyhledávač: Ročník 3 – Název (např. 7.–13. třída & SŠ)" },
    { type: "string", name: "smartCohort3Sub", label: "Vyhledávač: Ročník 3 – Čas (např. 14:30–16:00 • 90 min)" },
    { type: "string", name: "smartStep2Title", label: "Vyhledávač: Nadpis kroku 2 (např. 2. Které dny po škole se vám nejvíc hodí?)" },
    { type: "string", name: "smartDayMultiNote", label: "Vyhledávač: Štítek výběru více dnů (např. ✨ Lze vybrat i více dní najednou)" },
    { type: "string", name: "smartDayAllLabel", label: "Vyhledávač: Filtr pro všechny dny (např. 🌟 Kdykoliv v týdnu)" },
    { type: "string", name: "smartResultsTitle", label: "Vyhledávač: Nadpis doporučených skupinek (např. 🎯 Doporučené zvířecí skupinky pro váš výběr:)" },
    { type: "string", name: "smartEmptyTitle", label: "Vyhledávač: Hláška při nenalezení – Nadpis" },
    { type: "string", name: "smartEmptyText", label: "Vyhledávač: Hláška při nenalezení – Popis", ui: { component: "textarea" } },
    { type: "string", name: "smartEmptyReset", label: "Vyhledávač: Hláška při nenalezení – Text odkazu pro reset" },
    { type: "string", name: "smartSwitchToFull", label: "Vyhledávač: Spodní odkaz na přepnutí do celé tabulky" },

    { type: "string", name: "whyInPersonIcon", label: "Ikona banneru naživo (např. 🎲)" },
    { type: "string", name: "whyInPersonTitle", label: "Nadpis banneru naživo" },
    { type: "string", name: "whyInPersonText", label: "Text banneru naživo", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
    { type: "string", name: "rollingSystemBadge", label: "Štítek plynulého náboru" },
    { type: "string", name: "rollingSystemTitle", label: "Nadpis plynulého celoročního systému" },
    { type: "string", name: "rollingSystemText", label: "Vysvětlení plynulého systému a garance ceny", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
    { type: "string", name: "pillar1Number", label: "Číslo 1. pilíře (např. 8)" },
    { type: "string", name: "pillar1Title", label: "Nadpis 1. pilíře" },
    { type: "string", name: "pillar1Desc", label: "Popis 1. pilíře" },
    { type: "string", name: "pillar2Number", label: "Číslo 2. pilíře (např. 4)" },
    { type: "string", name: "pillar2Title", label: "Nadpis 2. pilíře" },
    { type: "string", name: "pillar2Desc", label: "Popis 2. pilíře" },
    { type: "string", name: "pillar3Icon", label: "Ikona 3. pilíře (např. 🔒)" },
    { type: "string", name: "pillar3Title", label: "Nadpis 3. pilíře" },
    { type: "string", name: "pillar3Desc", label: "Popis 3. pilíře" },
    { type: "string", name: "filterAllLabel", label: "Popisek filtru: Všechny skupinky" },
    { type: "string", name: "filterGrade13Label", label: "Popisek filtru: 1.–3. třída" },
    { type: "string", name: "filterGrade46Label", label: "Popisek filtru: 4.–6. třída" },
    { type: "string", name: "filterGrade713Label", label: "Popisek filtru: 7.–13. třída" },
    { type: "string", name: "legendOpen", label: "Popisek legendy: Volno" },
    { type: "string", name: "legendWaitingList", label: "Popisek legendy: Čekací listina" },
    { type: "string", name: "legendFull", label: "Popisek legendy: We're full" },
    { type: "string", name: "ctaText", label: "Text hlavního tlačítka" },
    {
      type: "object",
      name: "groups",
      label: "Týdenní zvířecí skupinky (15 slotů Po–Pá)",
      list: true,
      ui: {
        itemProps: (item: any) => {
          const occ = Number(item?.occupiedSeats ?? 0);
          const max = Number(item?.maxSeats || 8);
          const isManualFull = item?.statusOverride === "full";
          const isManualWait = item?.statusOverride === "waiting_list";
          const isManualOpen = item?.statusOverride === "open";

          let statusEmoji = "🟢";
          if (isManualFull || (!isManualOpen && occ >= max + 4)) {
            statusEmoji = "🔴";
          } else if (isManualWait || (!isManualOpen && occ >= max)) {
            statusEmoji = "🟡";
          }
          return {
            label: `${statusEmoji} ${item?.emoji || "🐾"} ${item?.day || "Den"} ${item?.time || "Čas"} – ${item?.animal || "Zvíře"} (${occ}/${max})`,
          };
        },
      },
      fields: [
        { type: "string", name: "id", label: "ID skupinky (např. kangaroos)" },
        { type: "string", name: "day", label: "Den v týdnu (Pondělí, Úterý...)" },
        { type: "string", name: "time", label: "Časový blok (např. 12:30 – 13:30)" },
        { type: "string", name: "animal", label: "Název zvířete (anglicky, např. Kangaroos)" },
        { type: "string", name: "emoji", label: "Emoji zvířátka (např. 🦘)" },
        { type: "string", name: "cohort", label: "Ročník / Stupeň (např. 1.–3. třída)" },
        { type: "string", name: "cohortBadge", label: "Štítek zaměření (např. Hravé deskovky & základy)" },
        { type: "string", name: "walkHint", label: "Lokální tip / docházková vzdálenost (např. 📍 Ze ZŠ UNESCO přes přechod 90 vteřin)" },
        {
          type: "number",
          name: "occupiedSeats",
          label: "Počet obsazených míst (0–12)",
          description: "Při dosažení kapacity (8) se skupinka automaticky přepne na čekací listinu 🟡, nad 12 míst na plno 🔴.",
          ui: {
            validate: (val: any) => {
              if (val !== undefined && val !== null && val !== "") {
                const num = Number(val);
                if (isNaN(num)) return "Musí být platné číslo";
                if (num < 0) return "Počet míst nemůže být záporný";
                if (num > 15) return "Maximální povolená hodnota je 15";
              }
            },
          },
        },
        { type: "number", name: "maxSeats", label: "Optimální kapacita (výchozí 8)" },
        { type: "number", name: "waitingListSeats", label: "Kapacita čekací listiny (výchozí 4)" },
        {
          type: "string",
          name: "statusOverride",
          label: "Ruční přepsání stavu",
          options: [
            { value: "auto", label: "Automaticky dle počtu obsazených míst" },
            { value: "open", label: "Vynutit: Volno (přijímáme studenty)" },
            { value: "waiting_list", label: "Vynutit: Čekací listina (Waiting list)" },
            { value: "full", label: "Vynutit: We're full! (Plně obsazeno)" },
          ],
        },
        { type: "string", name: "description", label: "Stručný popis skupinky", ui: { component: "textarea" } },
      ],
    },
    {
      type: "object",
      name: "adultsBlock",
      label: "Spodní blok: Dospělí a profesní skupiny",
      fields: [
        { type: "boolean", name: "enabled", label: "Zobrazit blok pro dospělé?" },
        { type: "string", name: "timeBadge", label: "Štítek času (např. Po – Čt 17:00 – 18:30)" },
        { type: "string", name: "timeNote", label: "Poznámka k času (např. 90 minut • 5 bloků týdně)" },
        { type: "string", name: "icon", label: "Ikona / Emoji" },
        { type: "string", name: "title", label: "Nadpis bloku" },
        { type: "string", name: "subtitle", label: "Podtitul (obory)" },
        { type: "string", name: "desc", label: "Popis bloku", ui: { component: "textarea" } },
        { type: "string", name: "ctaText", label: "Text tlačítka" },
      ],
    },
    {
      type: "object",
      name: "individualBlock",
      label: "Spodní blok: Individuální výuka 1 na 1",
      fields: [
        { type: "boolean", name: "enabled", label: "Zobrazit blok 1 na 1?" },
        { type: "string", name: "timeBadge", label: "Štítek času (např. Dopoledne dle domluvy)" },
        { type: "string", name: "timeNote", label: "Cena a poznámka k času (např. 950 Kč / 60 min)" },
        { type: "string", name: "icon", label: "Ikona / Emoji" },
        { type: "string", name: "title", label: "Nadpis bloku" },
        { type: "string", name: "subtitle", label: "Podtitul" },
        { type: "string", name: "desc", label: "Popis bloku", ui: { component: "textarea" } },
        { type: "string", name: "ctaText", label: "Text tlačítka" },
      ],
    },
  ],
};

const calculatorField: any = {
  type: "object",
  name: "calculator",
  label: "🧮 Kalkulátor slev a balíčků",
  fields: [
    { type: "boolean", name: "enabled", label: "Zobrazit kalkulátor slev na webu?" },
    { type: "string", name: "badge", label: "Odznáček kalkulátoru" },
    { type: "string", name: "title", label: "Nadpis kalkulátoru" },
    { type: "string", name: "subtitle", label: "Podnadpis kalkulátoru", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
    { type: "number", name: "basePrice", label: "Základní cena za 60 min lekci (Děti ZŠ) v Kč (např. 320)" },
    { type: "number", name: "basePriceTeens", label: "Základní cena za 90 min lekci (SŠ & Dospělí) v Kč (např. 480)" },
    { type: "string", name: "step1Title", label: "Krok 1 - Nadpis délky období" },
    { type: "string", name: "step1Badge", label: "Krok 1 - Štítek slevy" },
    { type: "string", name: "step2Title", label: "Krok 2 - Nadpis frekvence" },
    { type: "string", name: "step2Badge", label: "Krok 2 - Štítek bonusu" },
    { type: "string", name: "resultBadge", label: "Štítek výsledné kalkulace" },
    { type: "string", name: "savingsBadge", label: "Štítek úspory" },
    { type: "string", name: "ctaText", label: "Text tlačítka" },
    { type: "string", name: "note", label: "Poznámka pod kalkulátorem", ui: { component: "textarea" } },
    { type: "string", name: "fullPricingBtnText", label: "Spodní odkaz na ceník - text tlačítka" },
    { type: "string", name: "fullPricingBtnNote", label: "Spodní odkaz na ceník - popisek pod tlačítkem", ui: { component: "textarea" } },
    { type: "string", name: "fullPricingBtnLink", label: "Spodní odkaz na ceník - odkaz" },
    {
      type: "object",
      name: "durations",
      label: "Předvolby délky předplatného (balíčky)",
      list: true,
      ui: { itemProps: (item: any) => ({ label: `${item?.popular ? '⭐ ' : item?.bestValue ? '💎 ' : ''}${item?.label || "Období"} (${item?.weeks || 0} týdnů – sleva ${item?.baseDiscount ?? 0} %)` }) },
      fields: [
        {
          type: "number",
          name: "weeks",
          label: "Počet týdnů / lekcí (např. 4, 12, 20, 40)",
          ui: {
            validate: (val: any) => {
              if (val !== undefined && val !== null && val !== "") {
                const num = Number(val);
                if (isNaN(num) || num <= 0) return "Počet týdnů musí být větší než 0";
                if (num > 52) return "Maximální délka je 52 týdnů";
              }
            },
          },
        },
        { type: "string", name: "label", label: "Název období (např. 1 měsíc, Pololetí)" },
        { type: "string", name: "periodDesc", label: "Popis (např. 20 týdnů půl roku)" },
        { type: "string", name: "badge", label: "Štítek slevy (např. 250 Kč / h)" },
        {
          type: "number",
          name: "baseDiscount",
          label: "Základní sleva balíčku v % (např. 22)",
          ui: {
            validate: (val: any) => {
              if (val !== undefined && val !== null && val !== "") {
                const num = Number(val);
                if (isNaN(num) || num < 0 || num > 100) return "Sleva musí být v rozmezí 0 až 100 %";
              }
            },
          },
        },
        { type: "boolean", name: "popular", label: "Zvýraznit jako nejoblíbenější?" },
        { type: "boolean", name: "bestValue", label: "Zvýraznit jako maximální úspora?" },
      ],
    },
    {
      type: "object",
      name: "frequencies",
      label: "Předvolby frekvence docházky (za týden)",
      list: true,
      ui: { itemProps: (item: any) => ({ label: `${item?.recommended ? '🎯 ' : ''}${item?.label || "Frekvence"} (${item?.freq || 1}× týdně – bonus +${item?.bonus ?? 0} %)` }) },
      fields: [
        {
          type: "number",
          name: "freq",
          label: "Počet lekcí týdně (1, 2, 3)",
          ui: {
            validate: (val: any) => {
              if (val !== undefined && val !== null && val !== "") {
                const num = Number(val);
                if (isNaN(num) || num < 1 || num > 7) return "Frekvence musí být v rozmezí 1 až 7 lekcí týdně";
              }
            },
          },
        },
        { type: "string", name: "label", label: "Název (např. 2× týdně)" },
        { type: "string", name: "desc", label: "Popisek (např. Rychlý pokrok)" },
        {
          type: "number",
          name: "bonus",
          label: "Bonusová sleva za frekvenci v % (např. 9)",
          ui: {
            validate: (val: any) => {
              if (val !== undefined && val !== null && val !== "") {
                const num = Number(val);
                if (isNaN(num) || num < 0 || num > 100) return "Bonusová sleva musí být v rozmezí 0 až 100 %";
              }
            },
          },
        },
        { type: "string", name: "badge", label: "Štítek bonusu (např. +9 % extra sleva)" },
        { type: "boolean", name: "recommended", label: "Doporučeno?" },
      ],
    },
  ],
};

export default defineConfig({
  branch,
  clientId: process.env.PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "📄 Obsah hlavní stránky (/)",
        path: "content/pages",
        format: "json",
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "home") {
              return "/";
            }
            return undefined;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Název stránky (SEO Titulek)",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            name: "seo",
            label: "🔍 SEO & Vyhledávače (Google, Seznam)",
            fields: [
              { type: "string", name: "metaTitle", label: "SEO Titulek stránky (<title>)" },
              { type: "string", name: "metaDescription", label: "SEO Popisek pro vyhledávače", ui: { component: "textarea" } },
              { type: "image", name: "ogImage", label: "Obrázek pro sdílení na sítích (OpenGraph 1200x630)", description: "Doporučený rozměr pro sítě: 1200×630 px (poměr 1.91:1), JPG nebo PNG." },
              { type: "string", name: "canonicalUrl", label: "Kanonická URL adresa (např. https://valekacademy.cz/)" },
              { type: "string", name: "keywords", label: "Klíčová slova (oddělená čárkami)" },
            ],
          },
          {
            type: "object",
            name: "navbar",
            label: "🧭 Hlavička & Hlavní navigace",
            fields: [
              { type: "image", name: "logoImage", label: "Vlastní logo / Obrázek maskota", description: "Vlastní logo nebo maskot (průhledné PNG nebo SVG)." },
              { type: "string", name: "brandName", label: "Název značky" },
              { type: "string", name: "brandTagline", label: "Podtitul značky" },
              { type: "string", name: "ctaText", label: "Text tlačítka v menu" },
              { type: "string", name: "ctaLink", label: "Cíl tlačítka v menu (#sekce)" },
              { type: "string", name: "mobileMenuTitle", label: "Nadpis v mobilním menu" },
              { type: "string", name: "drawerTitle", label: "Menu - nadpis v záhlaví rozcestníku" },
              { type: "string", name: "drawerSubtitle", label: "Menu - podnadpis v záhlaví rozcestníku" },
              { type: "string", name: "drawerCloseText", label: "Menu - text tlačítka zavřít" },
              { type: "string", name: "drawerCtaText", label: "Menu - text spodního tlačítka" },
              { type: "string", name: "drawerCtaLink", label: "Menu - cíl spodního tlačítka" },
              { type: "string", name: "drawerLocationNote", label: "Menu - spodní poznámka k adrese" },
              {
                type: "object",
                name: "navLinks",
                label: "Odkazy v horním menu",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: `🔗 ${item?.label || "Odkaz"}` }),
                },
                fields: [
                  { type: "string", name: "label", label: "Text odkazu" },
                  { type: "string", name: "href", label: "Cíl odkazu (#sekce)" },
                  { type: "string", name: "badge", label: "Štítek (např. 1. zdarma)" },
                ],
              },
              {
                type: "object",
                name: "drawerSections",
                label: "Kategorie a položky v bočním menu (Drawer)",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: `📁 ${item?.category || "Kategorie"}` }),
                },
                fields: [
                  { type: "string", name: "category", label: "Název kategorie" },
                  {
                    type: "object",
                    name: "items",
                    label: "Odkazy v kategorii",
                    list: true,
                    ui: {
                      itemProps: (item) => ({ label: `${item?.icon || "🔗"} ${item?.label || "Odkaz"}` }),
                    },
                    fields: [
                      { type: "string", name: "label", label: "Název odkazu" },
                      { type: "string", name: "href", label: "Cíl odkazu (URL nebo #kotva)" },
                      { type: "string", name: "desc", label: "Stručný popisek" },
                      { type: "string", name: "icon", label: "Ikona / Emoji" },
                      { type: "string", name: "badge", label: "Štítek (volitelně)" },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "hero",
            label: "🏠 Hero sekce (Úvodní banner & lektor)",
            fields: [
              { type: "string", name: "badge", label: "Horní odznáček / Tagline" },
              { type: "string", name: "title", label: "Hlavní nadpis", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i>, <u>podtržené</u> (nebo **tučné**, *kurzíva*)" },
              { type: "string", name: "subtitle", label: "Podnadpis", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i>, <u>podtržené</u> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
              { type: "string", name: "ctaPrimaryText", label: "Text primárního tlačítka" },
              { type: "string", name: "ctaPrimaryLink", label: "Odkaz primárního tlačítka" },
              { type: "string", name: "ctaSecondaryText", label: "Text sekundárního tlačítka" },
              { type: "string", name: "ctaSecondaryLink", label: "Odkaz sekundárního tlačítka" },
              {
                type: "object",
                name: "card",
                label: "Karta pana Válka (Mr. Válek) & Hlasová ukázka (vpravo)",
                fields: [
                  { type: "boolean", name: "enabled", label: "Zobrazit kartu pana Válka v Hero na webu?" },
                  { type: "boolean", name: "showBenefits", label: "Zobrazit v kartě spodní minikarty výhod a adresu?" },
                  { type: "image", name: "image", label: "Fotka / Avatar lektora v Hero", description: "Doporučený formát: portrét 800×1000 px, průhledné pozadí nebo ořez, WebP/PNG." },
                  { type: "string", name: "teacherName", label: "Jméno lektora" },
                  { type: "string", name: "teacherRole", label: "Podtitul / Vzdělání (např. BBA Melbourne • 25+ let v ČR)" },
                  { type: "string", name: "teacherTag", label: "Specializace (např. Australský přízvuk & výuka hrou)" },
                  { type: "string", name: "badgeText", label: "Odznáček na kartě (např. 1. lekce ZDARMA)" },
                  {
                    type: "object",
                    name: "audio",
                    label: "Hlasový přehrávač pana Válka",
                    fields: [
                      { type: "string", name: "title", label: "Nadpis přehrávače zvuku" },
                      { type: "string", name: "subtitlePrompt", label: "Výzva k přehrání (např. Klikněte pro přehrání)" },
                      {
                        type: "object",
                        name: "phrases",
                        label: "Zvukové fráze",
                        list: true,
                        ui: {
                          itemProps: (item) => ({ label: `🔊 ${item?.buttonLabel || item?.id || "Fráze"}` }),
                        },
                        fields: [
                          { type: "string", name: "id", label: "Klíč zvuku (gday, dice, noworries)" },
                          { type: "string", name: "buttonLabel", label: "Text na tlačítku" },
                          { type: "string", name: "short", label: "Zkrácený text u vln" },
                          { type: "string", name: "en", label: "Anglická věta", ui: { component: "textarea" } },
                          { type: "string", name: "cz", label: "Český překlad věty", ui: { component: "textarea" } },
                        ],
                      },
                    ],
                  },
                  { type: "string", name: "benefit1Title", label: "Výhoda 1 - Nadpis" },
                  { type: "string", name: "benefit1Desc", label: "Výhoda 1 - Podtitul" },
                  { type: "string", name: "benefit2Title", label: "Výhoda 2 - Nadpis" },
                  { type: "string", name: "benefit2Desc", label: "Výhoda 2 - Podtitul" },
                  { type: "string", name: "locationNote", label: "Adresa v kartě" },
                  { type: "string", name: "onlineNote", label: "Online text v kartě" },
                  { type: "string", name: "teacherBadgePhoto", label: "Jmenovka na fotce lektora v Hero (např. Mr. Válek)" },
                  { type: "string", name: "melbourneTag", label: "Štítek Melbourne na fotce" },
                  { type: "string", name: "ctaText", label: "Text odkazu (např. Rezervovat →)" },
                  { type: "string", name: "ctaLink", label: "Cíl odkazu" },
                ],
              },
              {
                type: "object",
                name: "stats",
                label: "Statistiky & Důvěryhodnost",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: `${item?.icon || '📊'} ${item?.number || "Statistika"} - ${item?.label || ""}` }),
                },
                fields: [
                  { type: "string", name: "number", label: "Číslo (např. 10+ let)" },
                  { type: "string", name: "label", label: "Popis (např. praxe v ČR)" },
                  { type: "string", name: "tag", label: "Horní štítek (např. LOKALITA)" },
                  { type: "string", name: "icon", label: "Ikona / Emoji (např. 📍)" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "audience",
            label: "👥 3 Cílové skupiny (ZŠ, SŠ, Dospělí)",
            fields: [
              { type: "boolean", name: "enabled", label: "Zobrazit sekci Programy & Hry na webu?" },
              { type: "string", name: "badge", label: "Odznáček sekce" },
              { type: "string", name: "title", label: "Nadpis sekce" },
              { type: "string", name: "subtitle", label: "Podnadpis", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
              { type: "string", name: "cohortTabsLabel", label: "Mobilní přepínač ročníků - nadpis" },
              { type: "string", name: "gamesLabel", label: "Karta programu - nadpis her" },
              { type: "string", name: "pointsLabel", label: "Karta programu - nadpis výhod" },
              { type: "string", name: "guaranteeLabel", label: "Karta programu - spodní garance" },
              { type: "string", name: "inPersonBannerText1", label: "Banner výuky naživo – text 1 (doučovna)", ui: { component: "textarea" } },
              { type: "string", name: "inPersonBannerText2", label: "Banner výuky naživo – text 2 (deskovky a stůl)", ui: { component: "textarea" } },
              {
                type: "object",
                name: "kidsPrograms",
                label: "Programy pro žáky ZŠ",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: `${item?.icon || '🎒'} ${item?.title || "Program"} (${item?.age || ""})` }),
                },
                fields: [
                  { type: "string", name: "id", label: "Identifikátor" },
                  { type: "string", name: "icon", label: "Ikona / Emoji" },
                  { type: "image", name: "image", label: "Obrázek programu (ilustrace / fotka)", description: "Ilustrační fotka nebo obrázek programu (poměr 16:9 nebo 4:3, WebP)." },
                  { type: "string", name: "title", label: "Název programu" },
                  { type: "string", name: "age", label: "Věk a velikost skupinky" },
                  { type: "string", name: "badge", label: "Štítek" },
                  { type: "string", name: "highlight", label: "Hlavní tahák / přínos" },
                  { type: "string", name: "description", label: "Popis programu", ui: { component: "textarea" } },
                  { type: "string", name: "games", label: "Představené hry", list: true },
                  { type: "string", name: "points", label: "Body výhod", list: true },
                  { type: "string", name: "capacityNote", label: "Stav volných míst (např. 🟢 Volná 3 místa)" },
                  { type: "string", name: "ctaText", label: "Text tlačítka" },
                  { type: "string", name: "ctaLink", label: "Odkaz tlačítka" },
                ],
              },
              {
                type: "object",
                name: "waitingList",
                label: "Čekací listina pro SŠ a dospělé",
                fields: [
                  { type: "string", name: "badge", label: "Štítek" },
                  { type: "string", name: "title", label: "Nadpis" },
                  { type: "string", name: "description", label: "Popis", ui: { component: "textarea" } },
                  { type: "string", name: "ctaText", label: "Text tlačítka" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "scio",
            label: "🎓 Sekce SCIO & Přijímačky na SŠ",
            fields: [
              { type: "boolean", name: "enabled", label: "Zobrazit sekci SCIO na webu?" },
              { type: "string", name: "badge", label: "Odznáček" },
              { type: "string", name: "title", label: "Hlavní nadpis" },
              { type: "string", name: "subtitle", label: "Podnadpis", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
              { type: "string", name: "tagline", label: "Slogan" },
              { type: "string", name: "features", label: "Body a výhody přípravy", list: true },
              { type: "string", name: "ctaText", label: "Text tlačítka" },
              { type: "string", name: "ctaLink", label: "Odkaz tlačítka" },
              { type: "string", name: "guaranteeNote", label: "Poznámka pod tlačítkem (* Zápis je 100% nezávazný...)" },
              { type: "string", name: "subjectsTitle", label: "Nadpis pravé karty předmětů" },
              { type: "string", name: "subjectsBadge", label: "Štítek pravé karty předmětů" },
              { type: "string", name: "subjectsNote", label: "Spodní poznámka pravé karty předmětů" },
              {
                type: "object",
                name: "subjects",
                label: "Předměty přípravy (Čeština, Matematika...)",
                list: true,
                ui: {
                  itemProps: (item: any) => ({ label: `${item?.icon || "📖"} ${item?.title || "Předmět"}` }),
                },
                fields: [
                  { type: "string", name: "icon", label: "Ikona / Emoji (např. 📖, 📐)" },
                  { type: "string", name: "title", label: "Název předmětu" },
                  { type: "string", name: "subtitle", label: "Podtitul předmětu" },
                  { type: "string", name: "desc", label: "Popis zaměření", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "about",
            label: "👨‍🏫 Sekce O lektorovi & Metodika",
            fields: [
              { type: "boolean", name: "enabled", label: "Zobrazit sekci O lektorovi na webu?" },
              { type: "string", name: "badge", label: "Odznáček" },
              { type: "string", name: "title", label: "Nadpis sekce" },
              { type: "image", name: "image", label: "Hlavní fotka lektora pana Válka", description: "Doporučený formát: 1000×1200 px, kvalitní portrétní foto, WebP." },
              { type: "string", name: "teacherName", label: "Jméno lektora" },
              { type: "string", name: "role", label: "Titul / Pozice" },
              { type: "string", name: "bio", label: "Životopis a přístup", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i>, <u>podtržené</u> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
              { type: "string", name: "quote", label: "Citát / Motto", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i>, <u>podtržené</u> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
              { type: "string", name: "quoteAuthor", label: "Autor citátu" },
              { type: "string", name: "ctaText", label: "Text tlačítka 1. lekce" },
              { type: "string", name: "locationNote", label: "Poznámka s adresou" },
              { type: "string", name: "teacherGreeting", label: "Pozdrav lektora (např. Ahoj, jsem nebo Dobrý den, já jsem)" },
              { type: "string", name: "melbournePhotoTag", label: "Štítek na fotce lektora (např. Melbourne)" },
              { type: "string", name: "locationPhotoBadge", label: "Štítek adresy na fotce doučovny (např. 📍 Růžová 1238, UH)" },
              { type: "string", name: "melbourneTag", label: "Štítek původu u role (např. Vyrůstal v Melbourne, Austrálie 🇦🇺)" },
              {
                type: "object",
                name: "credentials",
                label: "Karta zkušeností (Proč se učit s panem Válkem)",
                fields: [
                  { type: "string", name: "title", label: "Nadpis karty" },
                  { type: "string", name: "subtitle", label: "Podtitul" },
                  { type: "string", name: "points", label: "Body zkušeností", list: true },
                  { type: "string", name: "note", label: "Spodní poznámka" },
                  { type: "string", name: "guarantee", label: "Zvýrazněný text (1. lekce ZDARMA)" },
                ],
              },
              {
                type: "object",
                name: "pillars",
                label: "4 Pilíře výuky",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: `${item?.icon || "📌"} ${item?.title || "Pilíř"}` }),
                },
                fields: [
                  { type: "string", name: "icon", label: "Ikona / Emoji" },
                  { type: "string", name: "title", label: "Název pilíře" },
                  { type: "string", name: "description", label: "Popis pilíře", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "pricing",
            label: "💰 Ceník a cenové balíčky",
            fields: [
              { type: "boolean", name: "enabled", label: "Zobrazit sekci Ceník na webu?" },
              { type: "string", name: "badge", label: "Odznáček" },
              { type: "string", name: "title", label: "Nadpis sekce" },
              { type: "string", name: "subtitle", label: "Podnadpis sekce", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
              { type: "string", name: "tabsLabel", label: "Mobilní přepínač ceníku - nadpis" },
              { type: "string", name: "featuresLabel", label: "Karta ceníku - nadpis položek v ceně" },
              { type: "string", name: "guarantee", label: "Garance spokojenosti", ui: { component: "textarea" } },
              {
                type: "object",
                name: "tiers",
                label: "Cenové balíčky",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: `${item?.isPopular ? "⭐ " : ""}${item?.name || "Balíček"} – ${item?.price || ""}` }),
                },
                fields: [
                  { type: "string", name: "name", label: "Název balíčku" },
                  { type: "string", name: "price", label: "Cena" },
                  { type: "string", name: "period", label: "Čas / Počet lekcí" },
                  { type: "string", name: "description", label: "Popis balíčku", ui: { component: "textarea" } },
                  { type: "boolean", name: "isPopular", label: "Zvýraznit jako nejpopulárnější?" },
                  { type: "string", name: "badge", label: "Štítek" },
                  { type: "string", name: "features", label: "Položky v ceně", list: true },
                  { type: "string", name: "ctaText", label: "Text tlačítka" },
                  { type: "string", name: "ctaLink", label: "Odkaz tlačítka" },
                ],
              },
              {
                type: "object",
                name: "pillars",
                label: "3 Garance ceníku (dole)",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: `${item?.icon || "🛡️"} ${item?.title || "Garance"}` }),
                },
                fields: [
                  { type: "string", name: "icon", label: "Ikona (emoji)" },
                  { type: "string", name: "title", label: "Název" },
                  { type: "string", name: "desc", label: "Popis", ui: { component: "textarea" } },
                ],
              },
              calculatorField,
            ],
          },
          {
            type: "object",
            name: "comparison",
            label: "⚖️ Srovnávací tabulka (Škola vs Doučování vs Valek)",
            fields: [
              { type: "boolean", name: "enabled", label: "Zobrazit Srovnávací tabulku na webu?" },
              { type: "string", name: "badge", label: "Odznáček" },
              { type: "string", name: "title", label: "Nadpis srovnání" },
              { type: "string", name: "subtitle", label: "Podnadpis srovnání", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
              { type: "string", name: "ctaText", label: "Text tlačítka 1. lekce (vítěz)" },
              { type: "string", name: "ctaLink", label: "Odkaz tlačítka (vítěz)" },
              { type: "string", name: "toggleButtonText", label: "Text tlačítka pro mobilní srovnání" },
              { type: "string", name: "labelSpeakingTime", label: "Popisek: Mluvení a prostor pro řeč" },
              { type: "string", name: "labelAtmosphere", label: "Popisek: Atmosféra & stres" },
              { type: "string", name: "labelMethod", label: "Popisek: Metodika výuky" },
              { type: "string", name: "labelAccent", label: "Popisek: Přízvuk a lektor" },
              { type: "string", name: "labelMotivation", label: "Popisek: Motivace dítěte" },
              {
                type: "object",
                name: "columns",
                label: "Srovnávací sloupce",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: `${item?.isWinner ? "🏆 " : "📊 "}${item?.title || "Sloupec"} (${item?.price || ""})` }),
                },
                fields: [
                  { type: "string", name: "type", label: "Typ (school, private, valek)" },
                  { type: "string", name: "title", label: "Název" },
                  { type: "string", name: "subtitle", label: "Podtitul (počet dětí)" },
                  { type: "string", name: "badge", label: "Štítek" },
                  { type: "string", name: "price", label: "Cena" },
                  { type: "string", name: "priceNote", label: "Poznámka k ceně" },
                  { type: "string", name: "speakingTime", label: "Prostor pro mluvení" },
                  { type: "string", name: "atmosphere", label: "Atmosféra & stres" },
                  { type: "string", name: "method", label: "Metodika & hry" },
                  { type: "string", name: "accent", label: "Přízvuk lektora" },
                  { type: "string", name: "motivation", label: "Motivace & výsledky" },
                  { type: "string", name: "footerNote", label: "Spodní poznámka karty" },
                  { type: "boolean", name: "isWinner", label: "Je vítěz srovnání? (Zlaté zvýraznění)" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "testimonials",
            label: "⭐ Reference a recenze studentů a rodičů",
            fields: [
              { type: "boolean", name: "enabled", label: "Zobrazit sekci Reference na webu?" },
              { type: "string", name: "badge", label: "Odznáček" },
              { type: "string", name: "title", label: "Nadpis sekce" },
              { type: "string", name: "subtitle", label: "Podnadpis sekce", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
              { type: "string", name: "ratingScore", label: "Skóre hodnocení" },
              { type: "string", name: "ratingNote", label: "Poznámka k hodnocení" },
              {
                type: "object",
                name: "reviews",
                label: "Recenze studentů a rodičů",
                list: true,
                ui: {
                  itemProps: (item: any) => {
                    const rating = Math.min(5, Math.max(1, Number(item?.rating) || 5));
                    const stars = "⭐".repeat(rating);
                    return { label: `${stars} ${item?.name || "Student"} (${item?.location || item?.role || "Rodič"})` };
                  },
                },
                fields: [
                  { type: "string", name: "name", label: "Jméno studenta / rodiče" },
                  { type: "string", name: "role", label: "Pozice / Role a město" },
                  { type: "string", name: "location", label: "Město" },
                  { type: "number", name: "rating", label: "Počet hvězdiček (1-5)" },
                  { type: "string", name: "highlight", label: "Hlavní přínos / Zvýraznění" },
                  { type: "string", name: "quote", label: "Citace / Zkušenost", ui: { component: "textarea" } },
                  { type: "string", name: "avatarText", label: "Iniciály" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "howItWorks",
            label: "🎲 Jak funguje výuka hrou & Deskovky",
            fields: [
              { type: "boolean", name: "enabled", label: "Zobrazit sekci Jak výuka hrou funguje na webu?" },
              { type: "string", name: "badge", label: "Odznáček" },
              { type: "string", name: "title", label: "Hlavní nadpis" },
              { type: "string", name: "subtitle", label: "Podnadpis", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
              { type: "string", name: "quote", label: "Citát / Zvýrazněná věta" },
              { type: "string", name: "gamesTitle", label: "Nadpis představených her" },
              { type: "string", name: "gamesSubtitle", label: "Podnadpis představených her" },
              { type: "string", name: "phrasesLabel", label: "Popisek ukázkových vět" },
              {
                type: "object",
                name: "gameSpotlights",
                label: "Představené deskovky",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: `${item?.icon || "🎲"} ${item?.title || "Deskovka"} [${item?.badge || item?.tag || ""}]` }),
                },
                fields: [
                  { type: "string", name: "icon", label: "Ikona / Emoji" },
                  { type: "string", name: "title", label: "Název hry" },
                  { type: "string", name: "tag", label: "Zaměření" },
                  { type: "string", name: "badge", label: "Štítek / Věk" },
                  { type: "string", name: "accent", label: "Barevný akcent (CSS třída)" },
                  { type: "string", name: "desc", label: "Popis přínosu", ui: { component: "textarea" } },
                  { type: "string", name: "phrases", label: "Ukázky vět ze hry", list: true },
                ],
              },
              {
                type: "object",
                name: "steps",
                label: "3 Kroky lekce",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: `${item?.badge || "Krok"}: ${item?.title || "Krok"}` }),
                },
                fields: [
                  { type: "string", name: "badge", label: "Štítek kroku" },
                  { type: "string", name: "title", label: "Název kroku" },
                  { type: "string", name: "desc", label: "Popis kroku", ui: { component: "textarea" } },
                ],
              },
              {
                type: "object",
                name: "poster",
                label: "Obrázkový poster s deskovkami",
                fields: [
                  { type: "image", name: "image", label: "Obrázek deskových her / Doučovny", description: "Doporučený formát: na šířku 16:9 nebo 4:3, min. 1200 px šířka, WebP." },
                  { type: "string", name: "tag", label: "Štítek (např. Atmosféra naší doučovny)" },
                  { type: "string", name: "title", label: "Nadpis posteru" },
                  { type: "string", name: "desc", label: "Popis posteru", ui: { component: "textarea" } },
                ],
              },
              {
                type: "object",
                name: "bottomCta",
                label: "Spodní výzva / banner lekce",
                fields: [
                  { type: "string", name: "title", label: "Nadpis výzvy" },
                  { type: "string", name: "desc", label: "Popis výzvy" },
                  { type: "string", name: "ctaText", label: "Text tlačítka" },
                  { type: "string", name: "ctaLink", label: "Cíl odkazu" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "timeline",
            label: "⏱️ Časová osa lekce (60 minut)",
            fields: [
              { type: "boolean", name: "enabled", label: "Zobrazit Časovou osu 60 min lekce na webu?" },
              { type: "string", name: "badge", label: "Odznáček" },
              { type: "string", name: "title", label: "Hlavní nadpis" },
              { type: "string", name: "subtitle", label: "Podnadpis", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
              { type: "string", name: "calloutTitle", label: "Výzva/Garance - nadpis" },
              { type: "string", name: "calloutDesc", label: "Výzva/Garance - popis", ui: { component: "textarea" } },
              { type: "string", name: "calloutCtaText", label: "Výzva/Garance - text tlačítka" },
              { type: "string", name: "calloutCtaLink", label: "Výzva/Garance - odkaz tlačítka" },
              {
                type: "object",
                name: "phases",
                label: "4 Fáze lekce",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: `${item?.icon || "⏱️"} ${item?.time || "Čas"} – ${item?.title || "Fáze"}` }),
                },
                fields: [
                  { type: "string", name: "icon", label: "Ikona / Emoji fáze (např. ☕, 🎲, 🎒, 🌟)" },
                  { type: "string", name: "time", label: "Čas (např. 00–10 min)" },
                  { type: "string", name: "badge", label: "Štítek" },
                  { type: "string", name: "title", label: "Název fáze" },
                  { type: "string", name: "desc", label: "Popis fáze", ui: { component: "textarea" } },
                  { type: "string", name: "highlight", label: "Hlavní přínos" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "location",
            label: "📍 Kde učíme & Doučovna Uherské Hradiště",
            fields: [
              { type: "string", name: "badge", label: "Odznáček" },
              { type: "string", name: "title", label: "Hlavní nadpis" },
              { type: "string", name: "subtitle", label: "Podnadpis", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
              { type: "string", name: "galleryBadge", label: "Fotogalerie - odznáček" },
              { type: "string", name: "galleryTitle", label: "Fotogalerie - nadpis" },
              { type: "string", name: "gallerySubtitle", label: "Fotogalerie - podnadpis", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
              { type: "string", name: "fullGalleryButtonText", label: "Text tlačítka pro otevření celé fotogalerie" },
              { type: "string", name: "galleryCtaBannerTitle", label: "Nadpis spodního banneru fotogalerie" },
              { type: "string", name: "galleryCtaBannerDesc", label: "Popis spodního banneru fotogalerie", ui: { component: "textarea" } },
              { type: "string", name: "galleryCtaBannerButton", label: "Text tlačítka spodního banneru fotogalerie" },
              { type: "string", name: "addressTitle", label: "Nadpis adresy" },
              { type: "string", name: "address", label: "Adresa" },
              { type: "string", name: "parkingInfo", label: "Informace o parkování" },
              { type: "string", name: "hoursTitle", label: "Nadpis otevírací doby" },
              { type: "string", name: "hours", label: "Otevírací doba" },
              {
                type: "object",
                name: "perks",
                label: "Výhody lokality",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: `${item?.icon || "✨"} ${item?.title || "Výhoda"}` }),
                },
                fields: [
                  { type: "string", name: "icon", label: "Ikona / Emoji" },
                  { type: "string", name: "title", label: "Název" },
                  { type: "string", name: "desc", label: "Popis", ui: { component: "textarea" } },
                ],
              },
              { type: "string", name: "surroundingTowns", label: "Spádové obce v okolí", ui: { component: "textarea" } },
              {
                type: "object",
                name: "gallery",
                label: "Fotogalerie doučovny",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: `📸 ${item?.title || "Fotografie"}` }),
                },
                fields: [
                  { type: "image", name: "image", label: "Obrázek", description: "Doporučený formát: 4:3 nebo 16:9, max. 1920 px šířka, WebP." },
                  { type: "string", name: "title", label: "Název fotky" },
                  { type: "string", name: "desc", label: "Popisek fotky" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "groupMatcher",
            label: "🎯 Rozřazovač do skupinek",
            fields: [
              { type: "boolean", name: "enabled", label: "Zobrazit Rozřazovač do skupinek na webu?" },
              { type: "string", name: "badge", label: "Odznáček" },
              { type: "string", name: "title", label: "Hlavní nadpis" },
              { type: "string", name: "subtitle", label: "Podnadpis", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
              { type: "string", name: "step1Title", label: "Nadpis 1. kroku" },
              { type: "string", name: "step2Title", label: "Nadpis 2. kroku" },
              { type: "string", name: "step3Title", label: "Nadpis 3. kroku" },
              { type: "string", name: "ticketBadge", label: "Zlatá vstupenka - štítek" },
              { type: "string", name: "availabilityBadge", label: "Zlatá vstupenka - dostupnost" },
              { type: "string", name: "gamesLabel", label: "Vybrané hry - nadpis" },
              { type: "string", name: "guaranteeText", label: "Zlatá vstupenka - garance" },
              { type: "string", name: "whatsappText", label: "Text tlačítka WhatsApp" },
              { type: "string", name: "ctaText", label: "Text tlačítka" },
              {
                type: "object",
                name: "grades",
                label: "Krok 1: Volby ročníků",
                list: true,
                ui: { itemProps: (item) => ({ label: `${item?.icon || "🎒"} ${item?.title || "Třída"} (${item?.age || ""})` }) },
                fields: [
                  { type: "string", name: "id", label: "ID (1-3, 4-6, 7-9, ss)" },
                  { type: "string", name: "icon", label: "Ikona / Emoji" },
                  { type: "string", name: "title", label: "Název třídy" },
                  { type: "string", name: "age", label: "Věk" },
                  { type: "string", name: "recommendedTitle", label: "Doporučená skupinka - název" },
                  { type: "string", name: "recommendedDesc", label: "Doporučená skupinka - popis", ui: { component: "textarea" } },
                  { type: "string", name: "recommendedGames", label: "Doporučená skupinka - hry", list: true },
                ],
              },
              {
                type: "object",
                name: "interests",
                label: "Krok 2: Volby zájmů",
                list: true,
                ui: { itemProps: (item) => ({ label: `${item?.icon || "🎯"} ${item?.title || "Zájem"}` }) },
                fields: [
                  { type: "string", name: "id", label: "ID (fantasy, words, speed, strategy)" },
                  { type: "string", name: "icon", label: "Ikona / Emoji" },
                  { type: "string", name: "title", label: "Název zájmu" },
                  { type: "string", name: "desc", label: "Příklady her" },
                ],
              },
              {
                type: "object",
                name: "goals",
                label: "Krok 3: Cíle žáka",
                list: true,
                ui: { itemProps: (item) => ({ label: `${item?.icon || "⭐"} ${item?.title || "Cíl"}` }) },
                fields: [
                  { type: "string", name: "id", label: "ID (confidence, grades, fun)" },
                  { type: "string", name: "icon", label: "Ikona / Emoji" },
                  { type: "string", name: "title", label: "Název cíle" },
                  { type: "string", name: "desc", label: "Popis potřeby" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "faq",
            label: "❓ Časté dotazy (FAQ)",
            fields: [
              { type: "boolean", name: "enabled", label: "Zobrazit sekci Časté dotazy (FAQ) na webu?" },
              { type: "string", name: "badge", label: "Odznáček" },
              { type: "string", name: "title", label: "Nadpis sekce" },
              { type: "string", name: "subtitle", label: "Podnadpis sekce", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
              { type: "string", name: "contactPrompt", label: "Spodní výzva FAQ (otázka)" },
              { type: "string", name: "contactPromptLinkText", label: "Spodní výzva FAQ (text odkazu)" },
              {
                type: "object",
                name: "items",
                label: "Otázky a odpovědi",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: `❓ ${item?.question || "Otázka"}` }),
                },
                fields: [
                  { type: "string", name: "question", label: "Otázka" },
                  { type: "string", name: "answer", label: "Odpověď", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "contact",
            label: "📞 Kontaktní informace & Rezervační formulář",
            fields: [
              { type: "string", name: "badge", label: "Odznáček" },
              { type: "string", name: "title", label: "Nadpis sekce" },
              { type: "string", name: "subtitle", label: "Podnadpis sekce", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
              { type: "image", name: "tutorImage", label: "Fotka lektora u kontaktu", description: "Portrét lektora (čtverec nebo portrét, WebP)." },
              { type: "string", name: "tutorName", label: "Jméno lektora na kartě" },
              { type: "string", name: "tutorCredentials", label: "Titul a zkušenosti" },
              { type: "string", name: "tutorRole", label: "Místo / Doučovna" },
              { type: "string", name: "introText", label: "Úvodní text pod lektorem", ui: { component: "textarea" } },
              { type: "string", name: "email", label: "Kontaktní e-mail" },
              { type: "string", name: "phone", label: "Telefonní číslo", description: "Číslo s mezinárodní předvolbou (např. +420 792 372 642)." },
              { type: "string", name: "phoneFormatted", label: "Telefon (zobrazený formát)" },
              { type: "string", name: "whatsapp", label: "Odkaz na WhatsApp", description: "Číslo bez mezer pro odkaz (např. 420792372642)." },
              { type: "string", name: "whatsappText", label: "Text odkazu na WhatsApp" },
              { type: "string", name: "whatsappMessage", label: "Předvyplněná zpráva pro WhatsApp", ui: { component: "textarea" } },
              { type: "string", name: "location", label: "Místo výuky" },
              { type: "string", name: "hours", label: "Pracovní doba" },
              { type: "string", name: "guaranteeTitle", label: "Karta garance - nadpis" },
              { type: "string", name: "guaranteeDesc", label: "Karta garance - popis", ui: { component: "textarea" } },
              { type: "string", name: "formBadge", label: "Formulář - štítek" },
              { type: "string", name: "formBadgeNote", label: "Formulář - poznámka ke štítku" },
              { type: "string", name: "formTitle", label: "Formulář - nadpis" },
              { type: "string", name: "formSubtitle", label: "Formulář - podnadpis", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
              { type: "string", name: "programLabel", label: "Formulář - popisek výběru programu" },
              { type: "string", name: "formatLabel", label: "Formulář - popisek formy výuky" },
              { type: "string", name: "formatInPersonTitle", label: "Formulář - volba osobně nadpis" },
              { type: "string", name: "formatInPersonNote", label: "Formulář - volba osobně popisek" },
              { type: "string", name: "formatOnlineTitle", label: "Formulář - volba online nadpis" },
              { type: "string", name: "formatOnlineNote", label: "Formulář - volba online popisek" },
              { type: "string", name: "formatUndecidedTitle", label: "Formulář - volba nerozhodnuto nadpis" },
              { type: "string", name: "formatUndecidedNote", label: "Formulář - volba nerozhodnuto popisek" },
              { type: "string", name: "parentNameLabel", label: "Formulář - popisek jméno rodiče" },
              { type: "string", name: "childNameLabel", label: "Formulář - popisek jméno a věk dítěte" },
              { type: "string", name: "phoneLabel", label: "Formulář - popisek telefonní číslo" },
              { type: "string", name: "emailLabel", label: "Formulář - popisek e-mailová adresa" },
              { type: "string", name: "levelLabel", label: "Formulář - popisek třída/úroveň" },
              { type: "string", name: "levelLabelNote", label: "Formulář - poznámka k úrovni" },
              { type: "string", name: "daysLabel", label: "Formulář - popisek dnů" },
              { type: "string", name: "daysNote", label: "Formulář - poznámka ke dnům" },
              { type: "string", name: "daysTimeNote", label: "Formulář - časová poznámka" },
              { type: "string", name: "messageLabel", label: "Formulář - popisek poznámky" },
              { type: "string", name: "stepsTitle", label: "Formulář - nadpis kroků po odeslání" },
              { type: "string", name: "step1Text", label: "Formulář - krok 1 text" },
              { type: "string", name: "step2Text", label: "Formulář - krok 2 text" },
              { type: "string", name: "step3Text", label: "Formulář - krok 3 text" },
              { type: "string", name: "selectedGroupCalloutTitle", label: "Nadpis rámečku vybrané skupinky (např. 🎯 Vybraná zvířecí skupinka z rozvrhu)" },
              { type: "string", name: "selectedGroupClearText", label: "Text tlačítka pro zrušení výběru (např. ✕ Změnit)" },
              { type: "string", name: "formSuccessTitle", label: "Nadpis úspěšného odeslání (např. Děkuji za zprávu!)" },
              { type: "string", name: "formSuccessText", label: "Text potvrzení po odeslání", ui: { component: "textarea" } },
              { type: "string", name: "formErrorTitle", label: "Nadpis chybového hlášení" },
              { type: "string", name: "formErrorText", label: "Text chybového hlášení", ui: { component: "textarea" } },
              { type: "string", name: "programOptions", label: "Možnosti programů ve formuláři", list: true },
              { type: "string", name: "levelOptions", label: "Možnosti ročníků ve formuláři", list: true },
              { type: "string", name: "submitButtonText", label: "Formulář - text tlačítka" },
              { type: "string", name: "adultNameLabel", label: "Formulář (Dospělí) - popisek celého jména" },
              { type: "string", name: "adultSubmitButtonText", label: "Formulář (Dospělí) - text tlačítka" },
              { type: "string", name: "teenNameLabel", label: "Formulář (Středoškoláci) - popisek jména studenta" },
              { type: "string", name: "teenChildNameLabel", label: "Formulář (Středoškoláci) - popisek jména rodiče" },
              { type: "string", name: "teenSubmitButtonText", label: "Formulář (Středoškoláci) - text tlačítka" },
              { type: "string", name: "securityNote", label: "Formulář - bezpečnostní poznámka" },
              { type: "string", name: "web3formsKey", label: "Web3Forms Access Key" },
              { type: "string", name: "whatsappConfirmationMessage", label: "Předvyplněná zpráva na WhatsApp po odeslání ({attendee} = zájemce, {group} = skupinka)", ui: { component: "textarea" } },
              { type: "string", name: "calendarEventTitle", label: "Název události v Google Kalendáři" },
              { type: "string", name: "calendarEventDesc", label: "Popis události v Google Kalendáři ({attendee} = zájemce, {group} = skupinka)", ui: { component: "textarea" } },
              { type: "string", name: "receiptBadge", label: "Potvrzovací lístek - horní odznak" },
              { type: "string", name: "receiptGuaranteeBadge", label: "Potvrzovací lístek - odznak záruky zdarma" },
              { type: "string", name: "receiptGreetingTitle", label: "Potvrzovací lístek - nadpis poděkování" },
              { type: "string", name: "receiptWhatToBring", label: "Potvrzovací lístek - co si vzít s sebou", ui: { component: "textarea" } },
              { type: "string", name: "receiptLocation", label: "Potvrzovací lístek - adresa a místo" },
              { type: "string", name: "receiptPrice", label: "Potvrzovací lístek - popisek ceny" },
              { type: "string", name: "receiptGoogleCalBtnText", label: "Potvrzovací lístek - text tlačítka Google Kalendář" },
              { type: "string", name: "receiptWhatsAppBtnText", label: "Potvrzovací lístek - text tlačítka WhatsApp" },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "🦶 Patička webu & Právní informace",
            fields: [
              { type: "string", name: "brandName", label: "Název akademie" },
              { type: "string", name: "brandTagline", label: "Slogan akademie" },
              { type: "string", name: "description", label: "Popis o akademii", ui: { component: "textarea" } },
              { type: "string", name: "locationNote", label: "Poznámka s adresou" },
              { type: "string", name: "navTitle", label: "Nadpis rychlé navigace" },
              {
                type: "object",
                name: "navLinks",
                label: "Odkazy v rychlé navigaci",
                list: true,
                ui: { itemProps: (item) => ({ label: `🔗 ${item?.label || "Odkaz"}` }) },
                fields: [
                  { type: "string", name: "label", label: "Text odkazu" },
                  { type: "string", name: "href", label: "Cíl odkazu" },
                ],
              },
              { type: "string", name: "contactTitle", label: "Nadpis kontaktu v patičce" },
              { type: "string", name: "icoInfo", label: "IČO informace (v kontaktu)" },
              { type: "string", name: "commuteNote", label: "Poznámka k dostupnosti obcí" },
              { type: "string", name: "bottomCtaText", label: "Spodní odkaz na 1. lekci" },
              { type: "string", name: "adminLinkText", label: "Spodní odkaz na Admin" },
              { type: "string", name: "copyright", label: "Copyright text" },
              { type: "string", name: "legalRegistryInfo", label: "Zápis v rejstříku (spodní řádek)" },
              { type: "string", name: "privacyLinkText", label: "Text odkazu Ochrana údajů" },
              { type: "string", name: "termsLinkText", label: "Text odkazu Obchodní podmínky" },
            ],
          },
          {
            type: "object",
            name: "stickyCta",
            label: "📱 Mobilní plovoucí lišta",
            fields: [
              { type: "boolean", name: "enabled", label: "Zobrazit mobilní plovoucí lištu?" },
              { type: "string", name: "text", label: "Text výzvy" },
              { type: "string", name: "buttonText", label: "Text tlačítka" },
              { type: "string", name: "link", label: "Cíl odkazu tlačítka (#kontakt)" },
            ],
          },
          {
            type: "object",
            name: "whatsappWidget",
            label: "💬 Plovoucí tlačítko WhatsApp",
            fields: [
              { type: "boolean", name: "enabled", label: "Zobrazit plovoucí WhatsApp tlačítko na webu?" },
              { type: "string", name: "phone", label: "Telefonní číslo pro WhatsApp (bez mezer, např. 420792372642)" },
              { type: "string", name: "tooltipText", label: "Text bubliny při najetí (např. Napsat panu Válkovi na WhatsApp →)" },
              { type: "string", name: "message", label: "Předvyplněná zpráva", ui: { component: "textarea" } },
              { type: "string", name: "badgeNotificationText", label: "Číslo v červeném puntíku (např. 1)" },
            ],
          },
        ],
      },
      {
        name: "legal",
        label: "⚖️ Právní dokumenty (GDPR & VOP)",
        path: "content/legal",
        format: "json",
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "privacy") {
              return "/ochrana-osobnich-udaju";
            }
            if (document._sys.filename === "terms") {
              return "/obchodni-podminky";
            }
            return undefined;
          },
        },
        fields: [
          {
            type: "string",
            name: "backLinkText",
            label: "Text tlačítka zpět na hlavní stránku",
          },
          {
            type: "string",
            name: "title",
            label: "Hlavní nadpis stránky",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "seoDescription",
            label: "SEO Popis pro vyhledávače",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "badge",
            label: "Horní odznáček / Štítek",
          },
          {
            type: "string",
            name: "subtitle",
            label: "Úvodní popis stránky",
            description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "effectiveDate",
            label: "Datum účinnosti (např. 1. září 2025)",
          },
          {
            type: "string",
            name: "locationNote",
            label: "Poznámka k místu",
          },
          {
            type: "string",
            name: "clientNote",
            label: "Definice klienta (VOP sekce 1)",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "contactBoxTitle",
            label: "Spodní box - nadpis dotazu",
          },
          {
            type: "string",
            name: "contactBoxSubtitle",
            label: "Spodní box - podnadpis dotazu",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "adminInfo",
            label: "Údaje o správci (Zásady ochrany údajů)",
            fields: [
              { type: "string", name: "name", label: "Jméno a příjmení" },
              { type: "string", name: "ico", label: "IČO" },
              { type: "string", name: "address", label: "Sídlo a adresa" },
              { type: "string", name: "registry", label: "Živnostenský zápis" },
              { type: "string", name: "taxStatus", label: "Daňový status (např. Neplátce DPH)" },
              { type: "string", name: "email", label: "Kontaktní e-mail" },
              { type: "string", name: "phone", label: "Kontaktní telefon" },
            ],
          },
          {
            type: "object",
            name: "providerInfo",
            label: "Údaje o poskytovateli (Obchodní podmínky)",
            fields: [
              { type: "string", name: "name", label: "Jméno a příjmení" },
              { type: "string", name: "ico", label: "IČO" },
              { type: "string", name: "address", label: "Sídlo a adresa" },
              { type: "string", name: "registry", label: "Živnostenský zápis" },
              { type: "string", name: "taxStatus", label: "Daňový status" },
              { type: "string", name: "email", label: "Kontaktní e-mail" },
              { type: "string", name: "phone", label: "Kontaktní telefon" },
            ],
          },
          {
            type: "object",
            name: "sections",
            label: "Jednotlivé sekce a odstavce",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: `📄 ${item?.number ? item.number + '. ' : ''}${item?.title || 'Sekce'}`,
              }),
            },
            fields: [
              { type: "string", name: "number", label: "Číslo sekce" },
              { type: "string", name: "title", label: "Nadpis sekce", required: true },
              { type: "string", name: "content", label: "Text sekce", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
              {
                type: "object",
                name: "bullets",
                label: "Odrážky / Seznam (volitelné)",
                list: true,
                fields: [
                  { type: "string", name: "label", label: "Tučný název odrážky" },
                  { type: "string", name: "text", label: "Text odrážky", ui: { component: "textarea" } },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "gallery",
        label: "🖼️ Fotogalerie (/galerie)",
        path: "content/gallery",
        format: "json",
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "gallery") {
              return "/galerie";
            }
            return undefined;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Název stránky (SEO Titulek)",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "backLinkText",
            label: "Text tlačítka Zpět na hlavní stránku",
          },
          {
            type: "string",
            name: "badge",
            label: "Štítek / Odznáček",
          },
          {
            type: "string",
            name: "heading",
            label: "Hlavní nadpis galerie (H1)",
          },
          {
            type: "string",
            name: "subtitle",
            label: "Podnadpis galerie",
            description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "filterTitle",
            label: "Nadpis lišty filtrů (např. Filtrovat fotografie podle kategorie:)",
          },
          {
            type: "string",
            name: "allPhotosFilterLabel",
            label: "Popisek tlačítka pro všechny snímky (např. Všechny snímky)",
          },
          {
            type: "object",
            name: "trustBadges",
            label: "✨ Odznáčky důvěry pod nadpisem",
            list: true,
            ui: {
              itemProps: (item: any) => ({ label: `${item?.icon || "✨"} ${item?.text || "Odznáček"}` }),
            },
            fields: [
              { type: "string", name: "icon", label: "Ikona / Emoji" },
              { type: "string", name: "text", label: "Text odznáčku" },
              { type: "boolean", name: "isHighlight", label: "Zvýraznit žlutě (např. 1. lekce ZDARMA)?" },
            ],
          },
          {
            type: "object",
            name: "categories",
            label: "📁 Kategorie fotogalerie",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: `${item?.icon || '📁'} ${item?.name || 'Nová kategorie'} (${(item?.photos || []).length} fotek)`,
              }),
            },
            fields: [
              { type: "string", name: "id", label: "Kód kategorie (např. ucebna, deskovky, vyuka)", required: true },
              { type: "string", name: "name", label: "Název kategorie (např. Učebna & Doučovna)", required: true },
              { type: "string", name: "icon", label: "Ikona / Emoji (např. 🏠, 🎲, 🎒, 📚)" },
              { type: "string", name: "description", label: "Krátký popis kategorie", ui: { component: "textarea" } },
              {
                type: "object",
                name: "photos",
                label: "📸 Fotografie v této kategorii",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: `${item?.hidden ? '🚫 [SKRYTO] ' : '📸 '}${item?.title || "Fotografie"}`,
                  }),
                },
                fields: [
                  { type: "boolean", name: "hidden", label: "🚫 Skrýt tento obrázek na webu?" },
                  { type: "image", name: "image", label: "Fotografie (soubor)", description: "Doporučený formát: 4:3 nebo 16:9, max. 1920 px šířka, WebP nebo JPG.", required: true },
                  { type: "string", name: "title", label: "Název / popisek fotky", required: true },
                  { type: "string", name: "description", label: "Podrobnější text / poznámka k fotce", ui: { component: "textarea" } },
                  { type: "boolean", name: "isFeatured", label: "Zvýraznit (širší karta)?" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "ctaBanner",
            label: "📣 Spodní výzva k akci (CTA banner)",
            fields: [
              { type: "string", name: "badge", label: "Štítek banneru (např. Přijďte se přesvědčit naživo)" },
              { type: "string", name: "title", label: "Nadpis banneru" },
              { type: "string", name: "subtitle", label: "Podnadpis banneru", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
              { type: "string", name: "buttonText", label: "Text tlačítka" },
              { type: "string", name: "buttonLink", label: "Odkaz tlačítka" },
            ],
          },
        ],
      },
      {
        name: "cenik",
        label: "💳 Podrobný ceník (/cenik)",
        path: "content/pricing",
        format: "json",
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "cenik") {
              return "/cenik";
            }
            return undefined;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Název stránky (SEO Titulek)",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            name: "seo",
            label: "🔍 SEO Nastavení",
            fields: [
              { type: "string", name: "metaTitle", label: "SEO Titulek (<title>)" },
              { type: "string", name: "metaDescription", label: "SEO Popis pro vyhledávače", ui: { component: "textarea" } },
              { type: "string", name: "canonicalUrl", label: "Kanonická URL" },
            ],
          },
          {
            type: "string",
            name: "backLinkText",
            label: "Text odkazu Zpět (např. Zpět na hlavní stránku)",
          },
          {
            type: "object",
            name: "header",
            label: "🏷️ Hlavička stránky ceníku",
            fields: [
              { type: "string", name: "badge", label: "Štítek / Odznáček" },
              { type: "string", name: "title", label: "Hlavní nadpis (H1)", ui: { component: "textarea" } },
              { type: "string", name: "subtitle", label: "Úvodní popis / perex", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "programs",
            label: "📦 4 Hlavní výukové programy",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: `${item?.icon || '🏷️'} ${item?.title || 'Program'} (${item?.baseRate || ''})`,
              }),
            },
            fields: [
              { type: "string", name: "id", label: "ID programu (např. kids, teens, adults, individual)", required: true },
              { type: "string", name: "icon", label: "Emoji / Ikona (např. 🎲, 🎓, 💼, 👤)" },
              { type: "string", name: "cohortBadge", label: "Štítek věku / skupiny (např. 1.–6. třída ZŠ • 60 minut)" },
              { type: "string", name: "popularBadge", label: "Zvýrazňující odznak (např. ⭐ Nejoblíbenější • 1. lekce ZDARMA)" },
              { type: "string", name: "title", label: "Název programu", required: true },
              { type: "string", name: "description", label: "Popis programu", ui: { component: "textarea" } },
              { type: "string", name: "baseRate", label: "Základní cena (např. 320 Kč)" },
              { type: "string", name: "baseRateNote", label: "Poznámka k zákl. ceně (např. / 60 min)" },
              { type: "string", name: "packageRate", label: "Cena s balíčkem (např. 250 Kč)" },
              { type: "string", name: "packageRateNote", label: "Poznámka k balíčku (např. / h (jen cca 1 000 Kč/měsíc))" },
              { type: "string", name: "fullYearRate", label: "Cena roční / druhá frekvence (např. od 220 Kč)" },
              { type: "string", name: "fullYearRateNote", label: "Poznámka k roční ceně (např. / hodina (sleva až 31 %))" },
              { type: "string", name: "timeSlots", label: "Časové sloty (např. Po–Pá 12:30–13:30...)" },
              { type: "string", name: "features", label: "Výhody a obsah balíčku", list: true },
              { type: "string", name: "ctaPrimaryText", label: "Text primárního tlačítka" },
              { type: "string", name: "ctaPrimaryLink", label: "Odkaz primárního tlačítka" },
              { type: "string", name: "ctaSecondaryText", label: "Text sekundárního tlačítka" },
              { type: "string", name: "ctaSecondaryLink", label: "Odkaz sekundárního tlačítka" },
            ],
          },
          calculatorField,
          {
            type: "object",
            name: "comparisonTable",
            label: "📊 Srovnávací tabulka slev a balíčků",
            fields: [
              { type: "string", name: "badge", label: "Štítek nadpisu" },
              { type: "string", name: "title", label: "Nadpis tabulky" },
              { type: "string", name: "subtitle", label: "Popis pod nadpisem", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
              {
                type: "object",
                name: "rows",
                label: "Řádky srovnávací tabulky",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: `${item?.isPopular ? '⭐ ' : item?.isRecommended ? '🟢 ' : item?.isBestValue ? '💎 ' : ''}${item?.period || 'Období'} (${item?.frequency || ''}) - ${item?.totalPrice || ''}`,
                  }),
                },
                fields: [
                  { type: "string", name: "period", label: "Období balíčku (např. Pololetí (20 týdnů))", required: true },
                  { type: "string", name: "tag", label: "Štítek (např. Nejoblíbenější, Doporučeno, Max. úspora)" },
                  { type: "string", name: "frequency", label: "Frekvence (např. 1× týdně)" },
                  { type: "string", name: "lessons", label: "Celkem lekcí (např. 20 lekcí)" },
                  { type: "string", name: "basePrice", label: "Základní cena (přeškrtnutá, např. 6 400 Kč)" },
                  { type: "string", name: "discount", label: "Sleva (např. -22 %)" },
                  { type: "string", name: "unitPrice", label: "Cena za 1 lekci (např. 250 Kč)" },
                  { type: "string", name: "totalPrice", label: "Celková cena balíčku (např. 5 000 Kč)" },
                  { type: "boolean", name: "isPopular", label: "Zvýraznit žlutě (nejoblíbenější)?" },
                  { type: "boolean", name: "isRecommended", label: "Zvýraznit zeleně (doporučeno)?" },
                  { type: "boolean", name: "isBestValue", label: "Zvýraznit světle zeleně (max úspora)?" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "guarantees",
            label: "🛡️ Férová pravidla & Platební podmínky (4 pilíře)",
            fields: [
              { type: "string", name: "badge", label: "Štítek nadpisu" },
              { type: "string", name: "title", label: "Nadpis sekce" },
              { type: "string", name: "subtitle", label: "Podnadpis sekce", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Položky záruk (4 karty)",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: `${item?.icon || '🛡️'} ${item?.title || 'Záruka'}`,
                  }),
                },
                fields: [
                  { type: "string", name: "icon", label: "Ikona (emoji, např. 🎁, 💳, 🔄, 🔒)" },
                  { type: "string", name: "title", label: "Nadpis pravidla", required: true },
                  { type: "string", name: "text", label: "Popis pravidla", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "faq",
            label: "❓ Časté dotazy ke ceníku (FAQ)",
            fields: [
              { type: "string", name: "title", label: "Nadpis FAQ" },
              {
                type: "object",
                name: "items",
                label: "Otázky a odpovědi",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: `❓ ${item?.question || 'Otázka'}`,
                  }),
                },
                fields: [
                  { type: "string", name: "question", label: "Otázka", required: true },
                  { type: "string", name: "answer", label: "Odpověď", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "ctaBanner",
            label: "📣 Spodní výzva k akci (CTA banner)",
            fields: [
              { type: "string", name: "badge", label: "Štítek banneru" },
              { type: "string", name: "title", label: "Hlavní nadpis banneru" },
              { type: "string", name: "subtitle", label: "Podnadpis banneru", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
              { type: "string", name: "primaryBtnText", label: "Text primárního tlačítka" },
              { type: "string", name: "primaryBtnLink", label: "Odkaz primárního tlačítka" },
              { type: "string", name: "secondaryBtnText", label: "Text sekundárního tlačítka" },
              { type: "string", name: "secondaryBtnLink", label: "Odkaz sekundárního tlačítka" },
            ],
          },
        ],
      },
      {
        name: "rozvrh",
        label: "📅 Rozvrh hodin (/rozvrh)",
        path: "content/schedule",
        format: "json",
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "rozvrh") {
              return "/rozvrh";
            }
            return undefined;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Název stránky (SEO Titulek)",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            name: "seo",
            label: "🔍 SEO Nastavení",
            fields: [
              { type: "string", name: "metaTitle", label: "SEO Titulek (<title>)" },
              { type: "string", name: "metaDescription", label: "SEO Popis pro vyhledávače", ui: { component: "textarea" } },
              { type: "string", name: "canonicalUrl", label: "Kanonická URL" },
            ],
          },
          {
            type: "string",
            name: "backLinkText",
            label: "Text odkazu Zpět (např. Zpět na hlavní stránku)",
          },
          scheduleField,
          {
            type: "object",
            name: "reservation",
            label: "📝 Spodní sekce rezervace a formuláře (#kontakt)",
            fields: [
              { type: "string", name: "badge", label: "Štítek sekce" },
              { type: "string", name: "title", label: "Hlavní nadpis formuláře" },
              { type: "string", name: "subtitle", label: "Podnadpis formuláře", description: "Podporuje formátování: <b>tučné</b>, <i>kurzíva</i> (nebo **tučné**, *kurzíva*)", ui: { component: "textarea" } },
            ],
          },
        ],
      },
    ],
  },
});
