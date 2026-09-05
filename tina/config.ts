import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

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
        label: "Obsah webu",
        path: "content/pages",
        format: "json",
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
            name: "hero",
            label: "Hero sekce",
            fields: [
              { type: "string", name: "badge", label: "Horní odznáček / Tagline" },
              { type: "string", name: "title", label: "Hlavní nadpis" },
              { type: "string", name: "subtitle", label: "Podnadpis", ui: { component: "textarea" } },
              { type: "string", name: "ctaPrimaryText", label: "Text primárního tlačítka" },
              { type: "string", name: "ctaPrimaryLink", label: "Odkaz primárního tlačítka" },
              { type: "string", name: "ctaSecondaryText", label: "Text sekundárního tlačítka" },
              { type: "string", name: "ctaSecondaryLink", label: "Odkaz sekundárního tlačítka" },
              {
                type: "object",
                name: "stats",
                label: "Statistiky & Důvěryhodnost",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: `${item?.number || "Statistika"} - ${item?.label || ""}` }),
                },
                fields: [
                  { type: "string", name: "number", label: "Číslo (např. 10+ let)" },
                  { type: "string", name: "label", label: "Popis (např. praxe v ČR)" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "audience",
            label: "3 Cílové skupiny (ZŠ, SŠ, Dospělí)",
            fields: [
              { type: "string", name: "badge", label: "Odznáček sekce" },
              { type: "string", name: "title", label: "Nadpis sekce" },
              { type: "string", name: "subtitle", label: "Podnadpis", ui: { component: "textarea" } },
              {
                type: "object",
                name: "segments",
                label: "Karty cílových skupin",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: `${item?.title || "Skupina"} (${item?.age || ""})` }),
                },
                fields: [
                  { type: "string", name: "id", label: "Identifikátor (zs, ss, dospeli)" },
                  { type: "string", name: "icon", label: "Ikona (emoji např. 🎒, 🎓, 💼)" },
                  { type: "string", name: "title", label: "Název skupiny" },
                  { type: "string", name: "age", label: "Věková kategorie (např. 6–15 let)" },
                  { type: "string", name: "badge", label: "Štítek" },
                  { type: "string", name: "highlight", label: "Hlavní tahák / přínos" },
                  { type: "string", name: "description", label: "Podrobný popis", ui: { component: "textarea" } },
                  { type: "string", name: "points", label: "Výhody a body", list: true },
                  { type: "string", name: "ctaText", label: "Text tlačítka" },
                  { type: "string", name: "ctaLink", label: "Odkaz tlačítka" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "scio",
            label: "Sekce SCIO & Přijímačky na SŠ",
            fields: [
              { type: "string", name: "badge", label: "Odznáček" },
              { type: "string", name: "title", label: "Hlavní nadpis" },
              { type: "string", name: "subtitle", label: "Podnadpis", ui: { component: "textarea" } },
              { type: "string", name: "tagline", label: "Slogan" },
              { type: "string", name: "features", label: "Body a výhody přípravy", list: true },
              { type: "string", name: "ctaText", label: "Text tlačítka" },
              { type: "string", name: "ctaLink", label: "Odkaz tlačítka" },
            ],
          },
          {
            type: "object",
            name: "about",
            label: "Sekce O lektorovi & Metodika",
            fields: [
              { type: "string", name: "badge", label: "Odznáček" },
              { type: "string", name: "title", label: "Nadpis sekce" },
              { type: "string", name: "teacherName", label: "Jméno lektora" },
              { type: "string", name: "role", label: "Titul / Pozice" },
              { type: "string", name: "bio", label: "Životopis a přístup", ui: { component: "textarea" } },
              { type: "string", name: "quote", label: "Citát / Motto", ui: { component: "textarea" } },
              {
                type: "object",
                name: "pillars",
                label: "4 Pilíře výuky",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.title || "Pilíř" }),
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
            label: "Ceník a balíčky",
            fields: [
              { type: "string", name: "badge", label: "Odznáček" },
              { type: "string", name: "title", label: "Nadpis sekce" },
              { type: "string", name: "subtitle", label: "Podnadpis sekce", ui: { component: "textarea" } },
              { type: "string", name: "guarantee", label: "Garance spokojenosti", ui: { component: "textarea" } },
              {
                type: "object",
                name: "tiers",
                label: "Cenové balíčky",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: `${item?.name || "Balíček"} - ${item?.price || ""}` }),
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
            ],
          },
          {
            type: "object",
            name: "testimonials",
            label: "Reference a recenze",
            fields: [
              { type: "string", name: "badge", label: "Odznáček" },
              { type: "string", name: "title", label: "Nadpis sekce" },
              { type: "string", name: "subtitle", label: "Podnadpis sekce", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Recenze studentů a rodičů",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: `${item?.name || "Student"} (${item?.role || ""})` }),
                },
                fields: [
                  { type: "string", name: "name", label: "Jméno studenta / rodiče" },
                  { type: "string", name: "role", label: "Pozice / Role a město" },
                  { type: "number", name: "rating", label: "Počet hvězdiček (1-5)" },
                  { type: "string", name: "quote", label: "Citace / Zkušenost", ui: { component: "textarea" } },
                  { type: "string", name: "avatar", label: "Iniciály" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "faq",
            label: "Časté dotazy (FAQ)",
            fields: [
              { type: "string", name: "badge", label: "Odznáček" },
              { type: "string", name: "title", label: "Nadpis sekce" },
              { type: "string", name: "subtitle", label: "Podnadpis sekce", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Otázky a odpovědi",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.question || "Otázka" }),
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
            label: "Kontaktní informace",
            fields: [
              { type: "string", name: "badge", label: "Odznáček" },
              { type: "string", name: "title", label: "Nadpis sekce" },
              { type: "string", name: "subtitle", label: "Podnadpis sekce", ui: { component: "textarea" } },
              { type: "string", name: "email", label: "Kontaktní e-mail" },
              { type: "string", name: "phone", label: "Telefonní číslo" },
              { type: "string", name: "phoneFormatted", label: "Telefon (zobrazený formát)" },
              { type: "string", name: "whatsapp", label: "Odkaz na WhatsApp" },
              { type: "string", name: "location", label: "Místo výuky" },
              { type: "string", name: "hours", label: "Pracovní doba" },
              { type: "string", name: "web3formsKey", label: "Web3Forms Access Key" },
            ],
          },
        ],
      },
    ],
  },
});
