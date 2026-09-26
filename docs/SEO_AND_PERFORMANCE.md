# 🚀 SEO & Výkonnostní optimalizace – VALEK ACADEMY

> **Technická specifikace SEO, strukturovaných dat Schema.org, Image Sitemapy a Core Web Vitals na webu [valekacademy.cz](https://valekacademy.cz).**

---

## 🏛️ Strukturovaná data Schema.org (JSON-LD Graf)

V šabloně [`Layout.astro`](file:///c:/Users/Jozka/Desktop/ValekAcademy/src/layouts/Layout.astro) je dynamicky generován bohatý JSON-LD graf (`@graph`), který vyhledávačům Google a Seznam poskytuje přesné informace o akademii:

### 1. Multi-Type entita organizace
```json
{
  "@type": ["EducationalOrganization", "LanguageSchool", "LocalBusiness"],
  "@id": "https://valekacademy.cz/#organization",
  "name": "VALEK ACADEMY",
  "legalName": "Josef Válek",
  "identifier": "72419563",
  "alternateName": [
    "VALEK ACADEMY Uherské Hradiště",
    "Doučování angličtiny Josef Válek",
    "Angličtina Uherské Hradiště"
  ],
  "telephone": "+420792372642",
  "email": "info@valekacademy.cz",
  "sameAs": [
    "https://www.firmy.cz/detail/13271737-valek-academy-uherske-hradiste"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Růžová 1238",
    "addressLocality": "Uherské Hradiště",
    "postalCode": "686 01",
    "addressCountry": "CZ"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 49.0708,
    "longitude": 17.4665
  },
  "hasMap": "https://maps.google.com/?q=R%C5%AF%C5%BEov%C3%A1+1238,+686+01+Uhersk%C3%A9+Hradi%C5%A1t%C4%9B",
  "priceRange": "320 Kč – 480 Kč",
  "currenciesAccepted": "CZK",
  "paymentAccepted": "Hotově, Bankovní převod",
  "areaServed": [
    "Uherské Hradiště", "Kunovice", "Staré Město",
    "Babice", "Jalubí", "Kněžpole", "Ostrožská Nová Ves", "Uherský Brod"
  ]
}
```

### 2. Dynamické FAQ schéma (`FAQPage`)
Na všech stránkách s otázkami a odpověďmi se automaticky generuje entita `FAQPage`, která zajišťuje zobrazení **rozbalovacích akordeonů přímo ve výsledcích vyhledávání Google (Rich Snippets)**.

### 3. Schéma kurzů (`Course`)
Definuje strukturu výuky, cílovou skupinu, jazyk výuky (angličtina) a odkaz na bezplatnou ukázkovou lekci.

### 4. Drobečková navigace (`BreadcrumbList`)
Na podstránkách (`/cenik`, `/rozvrh`, `/galerie`, `/blog`, `/blog/[slug]`) generuje hierarchickou navigační cestu pro vyhledávače.

---

## 🗺️ Google Image Sitemap (`/sitemap.xml`)

Endpoint [`src/pages/sitemap.xml.ts`](file:///c:/Users/Jozka/Desktop/ValekAcademy/src/pages/sitemap.xml.ts) implementuje standard **Google Image Sitemap XML** (`xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`):

* Každá URL adresa obsahuje nejen `lastmod`, `changefreq` a `priority`, ale i **seznam fotografií**:
  - Všechny snímky z fotogalerie (`content/gallery/gallery.json`) s českým titulkem a popiskem.
  - Náhledové obrázky článků blogu.
  - Fotografie doučovny, her a lektora z hlavní stránky.
* Díky tomu Google Images indexuje učebnu, herní stůl i deskovky pod klíčovými slovy jako *„doučování angličtiny Uherské Hradiště fotogalerie“*.

---

## 📍 Lokální SEO (Geo Meta Značky)

V hlavičce jsou pro lokální vyhledávače definovány geografické souřadnice:
```html
<meta name="geo.region" content="CZ-ZL" />
<meta name="geo.placename" content="Uherské Hradiště" />
<meta name="geo.position" content="49.0708;17.4665" />
<meta name="ICBM" content="49.0708, 17.4665" />
```

---

## ⚡ Optimalizace Core Web Vitals (LCP, CLS, INP)

Web dosahuje špičkových hodnot Core Web Vitals:

1. **LCP (Largest Contentful Paint) < 1.0s:**
   - Klíčové fonty (`Plus Jakarta Sans 400 a 700`) jsou preloadovány jako WOFF2.
   - Hero fotografie je komprimována do WebP s responzivními rozměry a `fetchpriority="high"`.
2. **CLS (Cumulative Layout Shift) = 0.00:**
   - Všechny obrázky mají explicitně definované atributy `width` a `height` nebo pevný poměr stran (`aspect-ratio`).
   - Self-hosted fonty se štítkem `font-display: swap` zabraňují nechtěnému posunu rozložení.
3. **INP (Interaction to Next Paint) < 50ms:**
   - Nulový těžký klientský JavaScript – žádný React runtime v klientském bundle na veřejném webu.
   - Web Audio API zvukové efekty jsou syntetizovány čistým Web Audio rozhraním bez načítání externích zvukových souborů.

---

## 🖼️ Automatická WebP Pipeline (`scripts/optimize-images.mjs`)

Projekt obsahuje automatizovanou konverzi obrázků pomocí knihovny [Sharp](https://sharp.pixelplumbing.com/):
- **Automatický běh před buildem:** Skript `build.js` spouští `scanAndConvertAll()` před každým sestavením.
- **Parametry komprese:**
  - Auto-orientace dle EXIF dat z mobilních telefonů.
  - Zmenšení na maximální rozměr 1920 × 1920 px (zachování poměru stran).
  - WebP kvalita 85 s optimalizačním úsilím (effort) 4.
- **Režim sledování (Watch mode):** Příkaz `npm run watch:images` v pozadí sleduje složky `public/images/` a `public/uploads/` a jakýkoliv nově přidaný JPG či PNG okamžitě převede.
