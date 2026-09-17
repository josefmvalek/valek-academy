# VALEK ACADEMY – Developer & Agent Guidelines

## Architektura & CMS-First Pravidlo
Web VALEK ACADEMY využívá hybridní architekturu:
- **Astro v5** pro ultra-rychlý statický rendering a SEO
- **TinaCMS** pro administraci obsahu (`/admin`) a Git-backed JSON data v `content/`
- **In-Page Visual Editor** pro přímou vizuální editaci přímo na živé stránce v lokálním vývojovém režimu

### ZÁVAZNÉ PRAVIDLO: Všechno vygenerované musí být editovatelné v CMS
1. **Žádné hardcoded texty v šablonách**: Každý text, nadpis, podnadpis, odznak, tlačítko, odkaz, ikona i poznámka musí mít odpovídající definici v `tina/config.ts` a výchozí hodnotu v příslušném JSON souboru v `content/`.
2. **Click-to-Edit Atributy**:
   - Pro TinaCMS: `data-tina-field={tinaField(obj, 'key')}`
   - Pro Visual Editor: `data-edit-key="cesta.v.json"` a `data-edit-label="Český název"`
3. **Formátování RichText**: Pro zvýrazněný text (tučné/kurzíva) používejte `set:html={formatRichText(title)}`.
4. **Fallbacky**: Všechny proměnné v komponentách musí mít bezpečný výchozí fallback: `const value = props.field || "Výchozí hodnota";`.
