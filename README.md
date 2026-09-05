# 🇬🇧 Mgr. Josef Válek – Moderní web pro výuku a doučování angličtiny

Profesionální, vysoce konverzní one-page prezentační web pro lektora angličtiny. Web je bleskově rychlý, plně responzivní pro mobily i počítače a vybavený vizuální administrací **TinaCMS** na adrese `/admin`, která umožňuje snadnou editaci všech textů, ceníků, referencí i kontaktů bez nutnosti sahat do kódu.

---

## 🚀 Použitý technologický stack

- **Framework:** [Astro v5](https://astro.build/) – staticky generovaný web (SSG) s nulovou zátěží a okamžitým načítáním.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) – moderní tmavý design s glassmorphism efekty, zlatými akcenty a prémiovou typografií (Google Fonts *Outfit* & *Inter*).
- **CMS:** [TinaCMS](https://tina.io/) – správa obsahu s vizuálním náhledem na adrese `/admin` s napojením na GitHub.
- **Formulář:** Připraveno pro [Web3Forms](https://web3forms.com/) – odesílání poptávek přímo do e-mailu bez vlastního backendu.
- **Hosting:** [Vercel](https://vercel.com/) – bezplatný provoz (Free Tier), automatické nasazení z GitHubu.

---

## 📂 Struktura webu (sekce)

1. **Hlavička (Sticky Navbar):** Logo, rychlé odkazy na sekce, telefon, CTA tlačítko a přímý odkaz do administrace `/admin`.
2. **Hero sekce:** Úderný nadpis, podnadpis, sociální důkaz (*10+ let praxe*, *150+ studentů*, *4.9/5 hodnocení*), výrazná CTA tlačítka.
3. **O mně / Metodika:** Profil lektora Josefa Válka, filozofie výuky bez memorování pouček, 4 pilíře metodiky.
4. **Služby a kurzy:** 4 karty programů (Individuální výuka 1 na 1, Konverzace pro dospělé, Byznys angličtina pro kariéru, Příprava na certifikáty a maturitu).
5. **Ceník:** Přehledné balíčky (Jednotlivá lekce, Balíček 10 lekcí – nejoblíbenější se slevou 10 %, Firemní výuka) s garancí spokojenosti.
6. **Reference:** Autentické recenze studentů s 5hvězdičkovým hodnocením a iniciálami.
7. **FAQ:** Často kladené otázky formou moderního, přístupného akordeonu (`<details>`).
8. **Kontakt & Rezervační formulář:** Konverzní formulář s výběrem úrovně AJ a cíle + přímé kontakty (telefon, WhatsApp, e-mail).
9. **Patička:** Rychlá navigace, copyright a odkaz do CMS.

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
- Astro vývojový server na: `http://localhost:4321`
- TinaCMS lokální GraphQL server

### 3. Vstup do administrace webu
Otevřete v prohlížeči:
👉 **`http://localhost:4321/admin`**

Zde můžete přímo v reálném čase přepisovat texty, měnit ceny, přidávat otázky do FAQ nebo reference. Všechny změny se ukládají přímo do souboru `content/pages/home.json`.

---

## ☁️ Nasazení na Vercel (Krok za krokem)

Web je 100% připravený pro bezplatný hosting na **Vercelu**:

1. Nahrajte tento projekt do nového repozitáře na vašem [GitHubu](https://github.com/).
2. Přejděte na [Vercel.com](https://vercel.com/) a přihlaste se pomocí GitHub účtu.
3. Klikněte na **Add New... -> Project** a vyberte repozitář s webem.
4. Vercel automaticky rozpozná framework **Astro**.
5. Klikněte na tlačítko **Deploy**.
6. Během minuty je web živý na bezplatné doméně `vase-jmeno.vercel.app` (případně můžete připojit vlastní doménu `.cz`).

---

## 🔑 Propojení s Tina Cloud (Pro online editaci pro tátu)

Aby táta mohl web upravovat online přímo z webového prohlížeče na adrese `vase-domena.vercel.app/admin` bez nutnosti programování:

1. Zaregistrujte se zdarma na [app.tina.io](https://app.tina.io/).
2. Klikněte na **New Project** a propojte jej se stejným GitHub repozitářem.
3. V detailu projektu na Tina Cloud zkopírujte:
   - **Client ID**
   - **Read/Write Token**
4. Na Vercelu otevřete nastavení vašeho projektu: **Settings -> Environment Variables** a přidejte:
   - `PUBLIC_TINA_CLIENT_ID` = *(váš Client ID)*
   - `TINA_TOKEN` = *(váš Token)*
5. Proveďte nový Redeploy na Vercelu.
6. **Hotovo!** Táta navštíví `vase-domena.vercel.app/admin`, přihlásí se a veškeré úpravy, které provede a uloží, Tina automaticky zapíše jako commit do GitHubu a Vercel web sám do minuty přebuduje!

---

## 📬 Nastavení odesílání e-mailů z formuláře (Web3Forms)

Formulář je připraven pro bezplatnou službu Web3Forms bez nutnosti backendu:

1. Navštivte [Web3Forms.com](https://web3forms.com/).
2. Zadejte e-mail, na který mají poptávky chodit (např. `josef.valek@email.cz`), a klikněte na *Create your Access Key*.
3. Obdržený klíč z e-mailu vložte do souboru `content/pages/home.json` (položka `web3formsKey`), nebo přímo v TinaCMS v sekci *Kontakt*.
4. Jakmile student vyplní formulář, zpráva okamžitě dorazí přímo do e-mailové schránky lektora.

---

## 📁 Struktura souborů

```
├── content/
│   └── pages/
│       └── home.json            # Veškerá textová a datová náplň webu
├── public/
│   ├── favicon.svg              # Ikona webu
│   └── uploads/                 # Složka pro nahrané obrázky z TinaCMS
├── src/
│   ├── components/
│   │   ├── About.astro          # Sekce O mně a metodika
│   │   ├── Contact.astro        # Rezervační formulář a kontakty
│   │   ├── FAQ.astro            # Akordeon často kladených otázek
│   │   ├── Footer.astro         # Patička s copyrightem a odkazy
│   │   ├── Hero.astro           # Úvodní konverzní hero sekce
│   │   ├── Navbar.astro         # Responzivní sticky navigace
│   │   ├── Pricing.astro        # Ceník a balíčky
│   │   ├── Services.astro       # Karty nabízených kurzů
│   │   └── Testimonials.astro   # Hodnocení a recenze studentů
│   ├── layouts/
│   │   └── Layout.astro         # Hlavní HTML obálka, SEO a OpenGraph meta tagy
│   ├── lib/
│   │   └── data.ts              # Načítání dat z TinaCMS s fallbackem
│   ├── pages/
│   │   └── index.astro          # Hlavní stránka
│   └── styles/
│       └── global.css           # Globální styly, Tailwind a Google Fonts
├── tina/
│   └── config.ts                # Kompletní schéma pro TinaCMS
├── astro.config.mjs             # Konfigurace Astro (Tailwind, Tina, Vercel)
├── tailwind.config.mjs          # Konfigurace Tailwind barev a stylů
├── tsconfig.json                # TypeScript konfigurace
└── package.json                 # Skripty a závislosti
```
