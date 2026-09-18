# 🦘 VALEK ACADEMY – Výuka a doučování angličtiny hrou
> **Oficiální webová prezentace a rezervační systém pro akademii angličtiny Josefa Válka v Uherském Hradišti.**

[![Astro v5](https://img.shields.io/badge/Astro-v5.0+-BC52EE.svg?style=flat-square&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TinaCMS](https://img.shields.io/badge/TinaCMS-Git_Backed-FF6A00.svg?style=flat-square&logo=tinacms&logoColor=white)](https://tina.io/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-000000.svg?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)
[![Email](https://img.shields.io/badge/Email-Resend-000000.svg?style=flat-square&logo=resend&logoColor=white)](https://resend.com/)

Web běží na živé doméně: **[valekacademy.cz](https://valekacademy.cz)**

---

## 📖 O projektu

**VALEK ACADEMY** představuje moderní, konverzně zaměřený a interaktivní web pro lektora angličtiny Josefa Válka (*Mr. Válek*), který vyrostl a studoval v Austrálii (RMIT Melbourne) a přes 25 let žije a vyučuje v ČR. Výuka probíhá v útulné doučovně naproti ZŠ UNESCO v Uherském Hradišti v malých skupinkách (4–8 dětí) hravou formou didaktických deskových her (Karak, Scrabble, Dixit, Dobble, Story Cubes) i formou konverzací pro dospělé a přípravy na Scio/přijímačky.

Web je postaven na hybridní architektuře **Astro v5 + TinaCMS + In-Page Visual Editor**, nabízí bleskurychlý statický rendering (SSG), dynamické API pro rezervace a kompletní editovatelnost veškerého obsahu.

---

## ✨ Klíčové funkce a interaktivní prvky

### 🎯 1. 3krokový rozřazovač skupinek (`GroupMatcher.astro`)
* Interaktivní kvíz pro rodiče a studenty (věk dítěte, úroveň angličtiny, preference cílů).
* Zvukové efekty generované přímo přes **Web Audio API** (bez zátěže externích souborů).
* Automatické doporučení zvířecí skupinky (*Klokánci, Koaly, Vombati, Dingo, Klokani, Krokodýli*).
* Generování virtuální **zlaté VIP vstupenky** na 1. lekci zdarma s přímým propisem do rezervačního formuláře.

### 💰 2. Interaktivní kalkulátor balíčků & slev (`PackageCalculator.astro`)
* Přepínání platebních módů: měsíční flexibilní platba vs. zvýhodněné balíčky lekcí (úspora až 31 %).
* Přepínač sourozenecké slevy (+10 % navíc).
* Dynamický výpočet ceny za 60min lekci, celkové ceny i absolutní úspory v Kč v reálném čase.

### 📅 3. Týdenní rozvrh hodin s přímou rezervací (`ScheduleBlocks.astro`)
* 100% datově řízený z [content/schedule/rozvrh.json](file:///c:/Users/Jozka/Desktop/ValekAcademy/content/schedule/rozvrh.json).
* Přehledné vizuální bloky pro všech 15 skupinek od pondělí do pátku (13:00 – 18:30).
* Kapacitní indikátory obsazenosti a tlačítko rychlé rezervace konkrétního termínu na 1 klik.

### 🖼️ 4. Dynamická filtrovatelná fotogalerie (`GalleryView.astro`)
* Okamžité přepínání kategorií (*Učebna, Deskovky, Výuka, Knihovna*) na straně klienta.
* Moderní WebP formát fotografií s nativním líným načítáním (`loading="lazy"`).

### 🔊 5. Zvukový přehrávač reálných hlášek lektora
* Tlačítka pro přehrání autentických australských pozdravů (*G'day mate!*, *No worries*) v podání Josefa Válka uložených ve složce [public/audio/](file:///c:/Users/Jozka/Desktop/ValekAcademy/public/audio/).

### 🧭 6. Značková 404 stránka & Mobile PWA
* Vlastní [src/pages/404.astro](file:///c:/Users/Jozka/Desktop/ValekAcademy/src/pages/404.astro) s rychlou navigací na Domů, Rozvrh, Ceník a WhatsApp.
* PWA Webmanifest [public/site.webmanifest](file:///c:/Users/Jozka/Desktop/ValekAcademy/public/site.webmanifest) a meta tag `theme-color` `#FAF7F2` pro barevné sladění horní lišty mobilních prohlížečů (Safari na iOS i Chrome na Androidu).

---

## 🏗️ Architektura: CMS-First & Dvojí editace

Projekt striktně dodržuje pravidlo **žádných hardcoded textů v šablonách**:
1. **TinaCMS (`/admin`):** Plnohodnotná vizuální administrace napojená na Git repozitář a Tina Cloud. Definice kolekcí je v [tina/config.ts](file:///c:/Users/Jozka/Desktop/ValekAcademy/tina/config.ts).
2. **In-Page Visual Editor (`VisualEditor.astro`):** V lokálním vývojovém režimu umožňuje editovat texty přímo na živé stránce kliknutím a ukládat je přes interní endpoint `/api/save-content` přímo do JSON souborů v `content/`.
3. **Click-to-Edit atributy:**
   * `data-tina-field={tinaField(obj, 'key')}` pro TinaCMS
   * `data-edit-key="cesta.v.json"` a `data-edit-label="Název"` pro In-Page Editor

### Struktura datových JSON souborů (`content/`):
```
content/
├── pages/
│   └── home.json          # Texty úvodní stránky (Hero, About, Timeline, Contact, FAQ...)
├── schedule/
│   └── rozvrh.json        # Harmonogram, skupinky, dny, časy a kapacita
├── pricing/
│   └── cenik.json         # Cenové balíčky, výhody, srovnávací tabulka a kalkulátor
├── gallery/
│   └── gallery.json       # Seznam fotografií, popisky a kategorie
└── legal/
    ├── terms.json         # Všeobecné obchodní podmínky (VOP)
    └── privacy.json       # Zásady ochrany osobních údajů (GDPR)
```

---

## 📬 E-mailový rezervační systém (Resend)

Formulář [ContactForm.astro](file:///c:/Users/Jozka/Desktop/ValekAcademy/src/components/ContactForm.astro) odesílá data na serverless API endpoint [src/pages/api/send-reservation.ts](file:///c:/Users/Jozka/Desktop/ValekAcademy/src/pages/api/send-reservation.ts):
* **Potvrzení pro klienta:** Krásně nastylovaný HTML e-mail s rekapitulací rezervované skupinky, dnem, časem a informacemi k 1. lekci zdarma.
* **Upozornění pro lektora:** Okamžitá notifikace s kontaktními údaji rodiče (telefon, e-mail, jméno dítěte, poznámka).
* **Zabezpečení:** Odesílá se přes [Resend](https://resend.com/) s ověřenými DKIM a SPF záznamy přímo z domény `@valekacademy.cz`.

---

## 🚀 Lokální spuštění (Development)

### Požadavky
* **Node.js** 20+ (nebo 22 LTS)
* **npm** 10+

### 1. Klonování repozitáře a instalace
```bash
git clone https://github.com/josefmvalek/valek-academy.git
cd valek-academy
npm install
```

### 2. Konfigurace prostředí
V kořenu projektu vytvořte soubor `.env` (můžete zkopírovat vzorový [.env.example](file:///c:/Users/Jozka/Desktop/ValekAcademy/.env.example)):
```bash
cp .env.example .env
```

### 3. Spuštění vývojového serveru
```bash
npm run dev
```
Tento příkaz paralelně nastartuje:
* Astro dev server na **`http://localhost:4321`**
* TinaCMS lokální GraphQL server na **`http://localhost:4001`**
* Vizuální administraci na **`http://localhost:4321/admin`**

---

## 🛠️ Dostupné npm skripty

| Příkaz | Popis |
| :--- | :--- |
| `npm run dev` | Spustí lokální vývojový server Astro + TinaCMS |
| `npm run build` | Zkompiluje Tina schema a sestaví produkční bundle (`astro build`) |
| `npm run typecheck` | Zkontroluje integritu TypeScript typů a Astro diagnostiku (**0 errors**) |
| `node build.js` | Robustní produkční sestavení pro nasazení (používáno na Vercelu) |
| `npm run optimize-images`| Optimalizuje a převede obrázky ve složce `public/images/` do formátu WebP |

---

## ⚙️ Proměnné prostředí (Environment Variables)

Při nasazení na **Vercel** nastavte v sekci *Project Settings → Environment Variables*:

| Proměnná | Popis | Příklad |
| :--- | :--- | :--- |
| `RESEND_API_KEY` | Tajný API klíč z [resend.com](https://resend.com) | `re_123456789...` |
| `RESEND_FROM_EMAIL` | Oficiální odesílatel potvrzovacích e-mailů | `VALEK ACADEMY <info@valekacademy.cz>` |
| `RESEND_TO_ADMIN` | E-mail pro zasílání notifikací lektorovi | `info@valekacademy.cz` |
| `PUBLIC_TINA_CLIENT_ID`| ID projektu v Tina Cloud | `...` |
| `TINA_TOKEN` | Read/write přístupový token z Tina Cloud | `...` |

---

## 🔍 SEO & Strukturovaná data (Schema.org)

Web má špičkovou technickou SEO optimalizaci:
* **JSON-LD Schema.org graf:**
  * `@type: "EducationalOrganization"` – kompletní profil lektora, IČO, adresa v UH, GPS souřadnice, otevírací doba a obsluhované obce (*Uherské Hradiště, Kunovice, Staré Město, Babice, Uherský Brod...*).
  * `@type: "FAQPage"` – dynamicky generováno z FAQ sekce pro zobrazení rozbalovacích otázek přímo ve výsledcích vyhledávání na Googlu.
  * `@type: "Course"` – strukturované informace o kurzech angličtiny.
  * `@type: "BreadcrumbList"` – navigace na podstránkách.
* **Meta značky:** Open Graph (Facebook, WhatsApp), Twitter Summary Card s velkým náhledovým obrázkem.
* **Sitemap:** Automaticky generovaná dynamická sitemapa na [/sitemap.xml](https://valekacademy.cz/sitemap.xml).
* **Robots.txt:** Nastaveno pro optimální indexaci roboty Googlebot a Seznambot.

---

## 📁 Struktura projektu

```text
valek-academy/
├── content/                     # Git-backed JSON datové soubory pro CMS
│   ├── gallery/                 # Data fotogalerie
│   ├── legal/                   # Obchodní podmínky a GDPR
│   ├── pages/                   # Obsah úvodní stránky
│   ├── pricing/                 # Ceník, kalkulačka a srovnání
│   └── schedule/                # Rozvrh a definice skupinek
├── public/                      # Statické soubory
│   ├── admin/                   # TinaCMS administrátorská SPA aplikace
│   ├── audio/                   # Zvukové nahrávky lektora (.mp3)
│   ├── images/                  # Optimalizované WebP fotografie a loga
│   ├── site.webmanifest         # PWA manifest pro mobilní instalaci
│   └── robots.txt               # Pravidla pro vyhledávače
├── src/
│   ├── components/              # Modulární Astro komponenty
│   │   ├── GroupMatcher.astro   # Interaktivní rozřazovač skupinek
│   │   ├── PackageCalculator.astro # Cenová kalkulačka slev
│   │   ├── ScheduleBlocks.astro # Harmonogram výuky
│   │   ├── ContactForm.astro    # Rezervační formulář
│   │   ├── GalleryView.astro    # Filtrovatelná fotogalerie
│   │   ├── VisualEditor.astro   # Živý In-Page vizuální editor
│   │   └── ...                  # Hero, Navbar, Footer, FAQ, Testimonials
│   ├── layouts/
│   │   └── Layout.astro         # Hlavní layout, SEO hlavička, Schema.org
│   ├── lib/
│   │   ├── data.ts              # Načítání JSON dat a Tina queries
│   │   └── islands.ts           # Konfigurace Tina ostrovů
│   ├── pages/
│   │   ├── api/
│   │   │   ├── save-content.ts  # Endpoint pro ukládání z Visual Editoru
│   │   │   ├── send-reservation.ts # Serverless odesílání e-mailů
│   │   │   └── upload-image.ts  # Upload obrázků
│   │   ├── 404.astro            # Stylová chybová stránka
│   │   ├── cenik.astro          # Podrobný ceník & kalkulátor
│   │   ├── galerie.astro        # Fotogalerie učebny a her
│   │   ├── index.astro          # Úvodní stránka
│   │   ├── rozvrh.astro         # Rozvrh hodin
│   │   └── sitemap.xml.ts       # Dynamický generátor sitemapy
│   └── styles/
│       └── global.css           # Globální styly a Tailwind direktivy
├── tina/
│   └── config.ts                # Kompletní schéma kolekcí TinaCMS
├── .env.example                 # Vzorové proměnné prostředí
├── astro.config.mjs             # Konfigurace Astro a Vercel adaptéru
├── build.js                     # Produkční build skript
├── package.json                 # Závislosti a skripty
└── tailwind.config.mjs          # Konfigurace Tailwind design systému
```

---

## 📄 Licence a vlastnictví

© 2026 Josef Válek – VALEK ACADEMY. Všechna práva vyhrazena.  
Vytvořeno pro lektorskou činnost a výuku angličtiny v Uherském Hradišti.
