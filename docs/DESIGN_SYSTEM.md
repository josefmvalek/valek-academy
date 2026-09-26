# 🎨 Design System & Board Game Aesthetics – VALEK ACADEMY

> **Vizuální identita, designové tokeny, typografie a fyzikální herní estetika webu [valekacademy.cz](https://valekacademy.cz).**

---

## 🎲 Fyzikální estetika deskových her (Physicality & Depth)

Design webu VALEK ACADEMY není generický plochý (flat) web. Využívá prvky hmatatelnosti (tactile design) inspirované herními deskami, dřevěnými figurkami a hracími kostkami:

* **3D tlačítka (Dice Buttons):** Spodní hrana s barevným odsazením evokuje stisk skutečného herního prvku.
* **Herní dlaždice (Board Game Tiles):** Karty s jemným vrstveným stínem a zaoblenými rohy působí jako vyložené herní karty nebo žetony.
* **Australská barevná paleta:** Hřejivé zemité tóny eukalyptu, australského slunce (jantar/zlato) a akademické oxfordské modři.

---

## 🎨 Paleta barevných tokenů (Tailwind & CSS Custom Properties)

Všechny barvy splňují přísné kontrastní poměry **WCAG AA a AAA** vůči světlému podkladu:

```
Canvas / Pozadí:      #FAF7F2  (Parchment warm)
Text / Espresso:      #2A190F  (Deep espresso brown – měkčí než čistá černá #000)
Muted text:           #5C473A  (Zemitá čitelná hnědá)

Brand Gold / Amber:   #F59E0B  (Primární australská zář)
Brand Gold Dark:      #D97706  (Hover & obrysy)
Brand Gold Deep:      #B45309  (3D hrany tlačítek)

Oxford Blue:          #1E3A8A  (Důvěryhodnost, akademický řád)
Oxford Deep:          #0F172A  (Noční kontrast)

Eucalyptus Green:     #059669  (Úspěch, volná místa 🟢, pozitivní potvrzení)
Vintage Red:          #A33B2B  (Obsazené sloty 🔴)
```

### Přehled tříd v Tailwind CSS ([`tailwind.config.mjs`](file:///c:/Users/Jozka/Desktop/ValekAcademy/tailwind.config.mjs)):
- `bg-oxford-50` až `bg-oxford-950`
- `bg-gold-50` až `bg-gold-700`
- `bg-eucalyptus-50` až `bg-eucalyptus-700`
- `bg-parchment-50` až `bg-parchment-500`
- `bg-espresso-50` až `bg-espresso-950`
- `bg-surface-base`, `bg-surface-card`, `bg-surface-sunken`

---

## 🔤 Typografie & Self-Hosted Fonty

Veškerá písma jsou **100% self-hosted** prostřednictvím knihovny `@fontsource` a jsou kompilována přímo do statických assetů.

### Výhody self-hosted fontů:
1. **Bleskový LCP & Zero FOUT:** Žádné externí síťové dotazy na servery `fonts.googleapis.com`.
2. **Přísné GDPR / Privacy:** Prohlížeč návštěvníka nesdílí IP adresu s žádnou třetí stranou.
3. **Preload kritických řezů:** V [`Layout.astro`](file:///c:/Users/Jozka/Desktop/ValekAcademy/src/layouts/Layout.astro) jsou fonty Plus Jakarta Sans 400 a 700 preloadovány v hlavičce:
   ```html
   <link rel="preload" href={fontPlusJakarta400} as="font" type="font/woff2" crossorigin />
   <link rel="preload" href={fontPlusJakarta700} as="font" type="font/woff2" crossorigin />
   ```

### Použité rodiny písem:
| Rodina | Zdroj | Použití | Třída Tailwind |
| :--- | :--- | :--- | :--- |
| **Plus Jakarta Sans** | `@fontsource/plus-jakarta-sans` | Základní texty, formuláře, popisky, odstavce | `font-sans` |
| **Outfit** | `@fontsource/outfit` | Moderní, přátelské a výrazné nadpisy sekcí | `font-heading` / `font-display` |
| **Cinzel** | `@fontsource/cinzel` | Zlaté odznáčky, akademické erby a certifikáty | `font-vintage` / `font-academy` |

---

## 📐 Plynulá fluidní typografie (`clamp()`)

Místo skokových zlomů (breakpoints) používá web plynulou škálu založenou na CSS funkci `clamp()`, která dynamicky roste s šířkou viewportu:

```css
--fluid-h1:    clamp(2.35rem, 1.6rem + 2.8vw, 4.25rem);
--fluid-h2:    clamp(1.85rem, 1.3rem + 1.8vw, 3rem);
--fluid-h3:    clamp(1.35rem, 1.1rem + 1vw, 2rem);
--fluid-h4:    clamp(1.15rem, 1rem + 0.5vw, 1.5rem);
--fluid-body:  clamp(1.05rem, 0.98rem + 0.3vw, 1.25rem);
--fluid-small: clamp(0.875rem, 0.82rem + 0.2vw, 1rem);
```

V Tailwindu stačí použít `text-fluid-h1`, `text-fluid-h2`, `text-fluid-body` atd.

---

## 🧱 Hmatatelné stíny a herní komponenty

Definováno v [`src/styles/global.css`](file:///c:/Users/Jozka/Desktop/ValekAcademy/src/styles/global.css):

### 1. 3D herní tlačítko (`.game-btn`)
Tlačítko s pevnou spodní hranou evokující stisknutí herní kostky:
```css
.game-btn-gold {
  background: linear-gradient(180deg, #F59E0B 0%, #D97706 100%);
  box-shadow: 0 4px 0 #B45309, 0 8px 20px rgba(217, 119, 6, 0.35);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.game-btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 #92400E, 0 14px 28px rgba(217, 119, 6, 0.45);
}
.game-btn-gold:active {
  transform: translateY(2px);
  box-shadow: 0 1px 0 #92400E, 0 3px 8px rgba(217, 119, 6, 0.25);
}
```

### 2. Herní dlaždice (`.game-tile`)
Vyvýšená karta se spodní pevnou linkou z kartonu:
```css
.game-tile {
  background-color: #FFFFFF;
  border-radius: var(--radius-lg);
  border: 1px solid var(--surface-border);
  box-shadow: 0 3px 0 #C4A87C, 0 6px 14px rgba(42, 25, 15, 0.08);
}
```

### 3. Skleněný panel (Glassmorphism s teplým nádechem)
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(232, 220, 191, 0.8);
}
```

---

## 📱 Zásady mobilní ergonomie & přístupnosti

1. **Minimální dotyková plocha:** Všechny interaktivní prvky (tlačítka v rozvrhu, volby v kalkulátoru, audio přepínače) mají minimální rozměr **44 × 44 px**.
2. **Plovoucí mobilní CTA:** Na displejích telefonů je aktivní komponenta [`MobileStickyCTA.astro`](file:///c:/Users/Jozka/Desktop/ValekAcademy/src/components/MobileStickyCTA.astro), která drží rezervaci 1. lekce zdarma stále na dosah palce bez zakrývání obsahu.
3. **Plná podpora `prefers-reduced-motion`:** Uživatelé s vypnutými animacemi v operačním systému mají všechny přechody automaticky přepnuté na okamžitou odezvu.
