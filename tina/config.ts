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
                label: "Statistiky & Sociální důkaz",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: `${item?.number || "Statistika"} - ${item?.label || ""}` }),
                },
                fields: [
                  { type: "string", name: "number", label: "Číslo / Údaj (např. 10+ let)" },
                  { type: "string", name: "label", label: "Popis (např. aktivní lektorské praxe)" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "about",
            label: "Sekce O mně & Metodika",
            fields: [
              { type: "string", name: "badge", label: "Odznáček" },
              { type: "string", name: "title", label: "Nadpis sekce" },
              { type: "string", name: "teacherName", label: "Jméno lektora" },
              { type: "string", name: "role", label: "Titul / Pozice" },
              { type: "string", name: "bio", label: "Představení a filosofie", ui: { component: "textarea" } },
              { type: "string", name: "quote", label: "Osobní motto / Citát", ui: { component: "textarea" } },
              { type: "string", name: "experienceYears", label: "Délka praxe" },
              {
                type: "object",
                name: "pillars",
                label: "4 Pilíře metodiky výuky",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.title || "Pilíř" }),
                },
                fields: [
                  { type: "string", name: "icon", label: "Ikona (MessageSquare, ShieldCheck, Compass, Laptop)" },
                  { type: "string", name: "title", label: "Název pilíře" },
                  { type: "string", name: "description", label: "Popis pilíře", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "services",
            label: "Služby a kurzy",
            fields: [
              { type: "string", name: "badge", label: "Odznáček" },
              { type: "string", name: "title", label: "Nadpis sekce" },
              { type: "string", name: "subtitle", label: "Podnadpis sekce", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Jednotlivé kurzy",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.title || "Kurz" }),
                },
                fields: [
                  { type: "string", name: "id", label: "Identifikátor (např. individual)" },
                  { type: "string", name: "badge", label: "Štítek (např. Nejžádanější)" },
                  { type: "string", name: "title", label: "Název kurzu" },
                  { type: "string", name: "description", label: "Popis", ui: { component: "textarea" } },
                  { type: "string", name: "features", label: "Výhody a body", list: true },
                  { type: "string", name: "ctaText", label: "Text tlačítka" },
                  { type: "string", name: "ctaLink", label: "Odkaz tlačítka" },
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
              { type: "string", name: "guarantee", label: "Text garance spokojenosti", ui: { component: "textarea" } },
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
                  { type: "string", name: "price", label: "Cena (např. 5 850 Kč)" },
                  { type: "string", name: "period", label: "Období / Počet lekcí (např. / 10× 60 minut)" },
                  { type: "string", name: "description", label: "Popis balíčku", ui: { component: "textarea" } },
                  { type: "boolean", name: "isPopular", label: "Zvýraznit jako nejpopulárnější?" },
                  { type: "string", name: "badge", label: "Štítek (např. Nejvýhodnější)" },
                  { type: "string", name: "features", label: "Seznam výhod a položek v ceně", list: true },
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
                label: "Recenze studentů",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: `${item?.name || "Student"} (${item?.role || ""})` }),
                },
                fields: [
                  { type: "string", name: "name", label: "Jméno studenta" },
                  { type: "string", name: "role", label: "Pozice / Povolání a město" },
                  { type: "number", name: "rating", label: "Počet hvězdiček (1-5)" },
                  { type: "string", name: "quote", label: "Citace / Zkušenost", ui: { component: "textarea" } },
                  { type: "string", name: "avatar", label: "Iniciály nebo URL fotky" },
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
            label: "Kontaktní informace a formulář",
            fields: [
              { type: "string", name: "badge", label: "Odznáček" },
              { type: "string", name: "title", label: "Nadpis sekce" },
              { type: "string", name: "subtitle", label: "Podnadpis sekce", ui: { component: "textarea" } },
              { type: "string", name: "email", label: "Kontaktní e-mail" },
              { type: "string", name: "phone", label: "Telefonní číslo (pro volání)" },
              { type: "string", name: "phoneFormatted", label: "Telefon (zobrazený formát)" },
              { type: "string", name: "whatsapp", label: "Odkaz na WhatsApp (např. https://wa.me/...)" },
              { type: "string", name: "location", label: "Místo výuky (např. Online & Osobně)" },
              { type: "string", name: "hours", label: "Dostupnost / Pracovní doba" },
              { type: "string", name: "web3formsKey", label: "Web3Forms Access Key (pro doručování formuláře do e-mailu)" },
            ],
          },
        ],
      },
    ],
  },
});
