# 🦘 VALEK ACADEMY – Výuka a doučování angličtiny v Uherském Hradišti

Profesionální, vysoce konverzní a interaktivní web pro lektora angličtiny Josefa Válka (Mr. Válek). Web je postaven na moderní hybridní architektuře **Astro v5 + TinaCMS + In-Page Visual Editor**, nabízí bleskurychlý statický rendering (SSG), dynamické API pro rezervace lekcí a kompletní click-to-edit editaci veškerého obsahu přímo z prohlížeče.

---

## 🚀 Použitý technologický stack

- **Framework:** [Astro v5](https://astro.build/) – ultra-rychlý statický rendering (SSG) s nulovou klientskou zátěží a serverless API pro formuláře.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) – teplý pergamenový a zlatý design s glassmorphismem, 3D haptickými tlačítky a prémiovou typografií (*Cinzel*, *Outfit*, *Plus Jakarta Sans*).
- **CMS (Dvojí editační rozhraní):**
  - **TinaCMS** (`/admin`) – plnohodnotná vizuální administrace napojená na Git a Tina Cloud.
  - **In-Page Visual Editor** – přímá inline editace textů, čísel a odznaků přímo na živé stránce ve vývojovém režimu se souběžným ukládáním do JSON souborů.
- **Formuláře & E-maily:** Vlastní serverless endpoint `/api/send-reservation` s integrací [Resend](https://resend.com/) pro okamžité potvrzovací e-maily klientům a notifikace lektorovi.
- **Hosting:** [Vercel](https://vercel.com/) – automatické nasazení z GitHubu přes `@astrojs/vercel` adaptér.

---

## 📂 Struktura webu a stránek

1. **Domovská stránka (`/`):**
   - **Hero:** Profil lektora Josefa Válka (Melbourne roots, 25+ let v ČR), audio přehrávač reálných hlášek (*G'day mate!*), sociální důkaz a CTA do 1. lekce zdarma.
   - **Programy & Hry:** Didaktické deskovky (Karak, Scrabble, Dixit, Dobble, Story Cubes) rozdělené dle věku.
   - **Průběh 60 min lekce:** Čtyřfázová metodika (naladění, hra, škola, rekapitulace).
   - **O lektorovi:** Příběh čechoaustralana Josefa Válka.
   - **Rozřazovač skupinek (GroupMatcher):** 3krokový interaktivní kvíz pro rodiče s Web Audio API zvukovými efekty a generováním zlaté vstupenky.
   - **Harmonogram (ScheduleBlocks):** Týdenní rozvrh 15 zvířecích skupinek (Klokánci, Koaly, Vombati...).
   - **Kde učíme:** Mapa a lokalita doučovny v centru UH (naproti ZŠ UNESCO).
   - **Časté dotazy rodičů (FAQ):** Akordeon s dynamickým Schema.org FAQPage JSON-LD.
   - **Rezervační formulář (ContactForm):** Interaktivní výběr skupinky, validace a odeslání rezervace.
2. **Rozvrh hodin (`/rozvrh`):** Dedikovaná stránka s kompletním přehledem 15 skupinek a přímou rezervací.
3. **Ceník & Kalkulátor (`/cenik`):** Podrobný přehled programů, srovnávací tabulka se školou a interaktivní kalkulátor balíčků slev (až 31 % úspora).
4. **Fotogalerie (`/galerie`):** Dynamická galerie s filtrováním dle kategorií (doučovna, deskovky, lektor, akce).
5. **Právní stránky:** VOP (`/obchodni-podminky`) a GDPR (`/ochrana-osobnich-udaju`).

---

## 🛠️ Lokální spuštění na počítači (Development)

### 1. Instalace závislostí
```bash
npm install
```

### 2. Spuštění vývojového serveru
```bash
npm run dev
```
Tento příkaz spustí:
- Astro vývojový server na `http://localhost:4321`
- TinaCMS lokální GraphQL server na `http://localhost:4001`
- Automatický WebP image watcher na pozadí

### 3. Editace obsahu
- **In-Page Visual Editor:** Přímo na `http://localhost:4321` klikněte na plovoucí tlačítko editoru v pravém dolním rohu.
- **TinaCMS Administrace:** Otevřete `http://localhost:4321/admin`.

---

## 🏗️ Produkční build & kontrola typů

```bash
# Kontrola TypeScript a Astro diagnostiky (0 chyb)
npm run typecheck

# Plný produkční build (TinaCMS schema compilation + Astro SSG export)
node build.js
```

---

## 📬 Nastavení odesílání e-mailů (Resend)

Pro aktivaci reálného odesílání potvrzovacích e-mailů nastavte v prostředí Vercelu:
- `RESEND_API_KEY` = *(váš API klíč z resend.com)*

Bez nastaveného klíče formulář bezpečně přejde do demo režimu, vrací formátované potvrzení o přijetí a nezpůsobí pád aplikace.
