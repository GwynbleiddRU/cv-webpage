# Architecture

## Stack

React 18 and TypeScript 5 on Vite 5 (`@vitejs/plugin-react-swc`), Tailwind CSS 3 with shadcn/ui (Radix) components, react-router-dom 6, i18next 24 with react-i18next 15 and i18next-browser-languagedetector, lucide-react icons, flag-icons, and html2pdf.js 0.10.3, which bundles html2canvas 1.4.1 and jsPDF 3.0.1.

## Code map

| Path | Role |
|---|---|
| `src/main.tsx` | Mounts the app inside `I18nextProvider`; imports the `flag-icons` CSS and `index.css`. |
| `src/App.tsx` | `BrowserRouter` with `basename="/cv-webpage"`. `/` renders `Index`; every other path renders `NotFound`. |
| `src/pages/Index.tsx` | The page: links that switch CV, the language button, the "Download PDF" menu (full or compact version), and the CV body (`cvRef`, a white card up to 800px wide). For the developer CV it also places the compact-only `TechStackSection`, which takes the place of `SkillsSection` in the compact PDF. |
| `src/components/CvHeader.tsx` | Header shared by both CVs (`variant="developer"` or `"ai"`): name, role, tagline (AI only), contacts, languages line, and the hidden template for the header of PDF pages 2+. |
| `src/components/AiCv.tsx` | The AI CV. Its own sections are rendered from `ai.*` translation arrays; after Profile it includes `EducationSection` and `ExperienceSection` with `brief`. It also holds the compact-only "Key competencies" section (`ai.competencies`, `ai.approach`, `ai.areasBrief`), which stands in for What I do, Where I apply this and How I work. |
| `src/components/{Profile,Education,Experience,Skills,Projects}Section.tsx` | Sections of the developer CV: hand-written JSX that takes its text from the translations. With the `brief` prop, `EducationSection` keeps only degree, institution and dates, and `ExperienceSection` keeps only company, role and dates; the AI CV uses this. `SkillsSection` and `ProjectsSection` take a `className`, which `Index` uses to mark them full-only. |
| `src/components/TechStackSection.tsx` | Compact PDF only (hidden on the site): the developer CV's technologies as tags, grouped by area (`stack.groups`). |
| `src/lib/print.ts` | PDF export: `exportPdf` (full or compact version) and `paginate` (page breaks and running headers). |
| `src/lib/pdfOverlay.ts` | The invisible text layer and the links of the PDF. |
| `src/assets/fonts/` | Noto Sans subset used by the PDF text layer, with its OFL licence. |
| `src/assets/images/` | Organisation logos shown in Education and Experience (`*.svg`). The PNGs next to them are the owner's originals the SVGs were traced from; the app doesn't use them. |
| `src/i18n.ts` | i18next set-up. |
| `src/locales/{en,ru}/translation.json` | All CV text. |
| `src/index.css` | Tailwind layers, theme variables, and custom rules: the html2canvas image fix, the `.cv-lang-row` / `.cv-langs` container query, and the `.cv-dense` base size of the compact PDF. |
| `tailwind.config.ts` | Theme, plus the `dense:` variant (styles that apply only inside `.cv-dense`, i.e. in the compact PDF). |
| `src/components/ui/` | Generated shadcn/ui components. The app uses only `button`, `card`, `dropdown-menu`, `separator`, `sonner`, `toaster` and `tooltip`. |
| `vite.config.ts` | `base: '/cv-webpage'`, dev server on port 8080, build output `./docs` with `emptyOutDir`. |
| `docs/` | The built site that GitHub Pages serves. Generated; never edit it by hand. |

Not used by the app: `src/hooks/useReactToPrint.ts` (an older export; the live one is `src/lib/print.ts`), `src/App.css`, `src/hooks/use-mobile.tsx`, and the `index.welcomeTitle` / `index.welcomeSubtitle` keys. Changing them has no effect on the site.

## Routing

- The URL hash picks the CV: `#ai` opens the AI CV, anything else opens the developer CV. The links call `navigate({ hash })`.
- `Index` sets `document.title` from `index.documentTitle` or `ai.documentTitle`. The PDF file name comes from the same keys, or from `…documentTitleCompact` for the compact version, for example `Georgiy_Nosachev_AI_CV_Compact.pdf`.

## Translations

- Each language has one JSON file, and both files have the same tree. Its top-level groups are `index`, `header`, `education`, `experience`, `profile`, `projects`, `skills`, `stack` (compact PDF only) and `ai`.
- Arrays such as `ai.skills`, `ai.steps` and `profile.technicalExpertise.points` are read with `t(key, { returnObjects: true })`. `returnObjects` is also switched on globally in `src/i18n.ts`.
- Items of `ai.skills` are `{ title, main, extra[] }`, items of `ai.areas` and `ai.competencies` are `{ title, text }`, items of `stack.groups` are `{ title, items[] }` (one tag per item), and the other `ai.*` arrays hold strings.
- The compact AI texts (`ai.competencies`, `ai.approach`, `ai.areasBrief`) condense `ai.skills`, `ai.example`, `ai.steps` and `ai.areas`, and `stack.groups` condenses `SkillsSection` and the project technologies. When those change, update the condensed text to match.
- The language comes from `localStorage.i18nextLng`, then from the browser, and falls back to `en`. The header button switches between `en` and `ru`.
- After editing, check that both files still have the same keys. Run from the repo root:

  ```sh
  node -e "const k=(o,p='')=>Object.entries(o).flatMap(([n,v])=>v&&typeof v==='object'&&!Array.isArray(v)?k(v,p+n+'.'):[p+n]);const a=k(require('./src/locales/en/translation.json')),b=k(require('./src/locales/ru/translation.json'));console.log(a.filter(x=>!b.includes(x)),b.filter(x=>!a.includes(x)))"
  ```

  Two empty arrays mean the keys match. The script doesn't compare array lengths; check those yourself.

## Content outside the translations

- Skill names and levels (bars out of 5): `SkillsSection.tsx`.
- Project cards, their order and their links: `ProjectsSection.tsx`. The newest come first, and both PDF versions keep the first four.
- Contact details and links: `CvHeader.tsx`.
- Organisation logos: imported in `EducationSection.tsx` and `ExperienceSection.tsx`, one per entry. A new logo should follow the existing SVGs:
  - one path in the brand colour, with `fill-rule="evenodd"` and the white parts cut out;
  - `viewBox="0 0 100 100"` plus `width="128" height="128"` (the PDF export needs that size, see [pdf-export.md](pdf-export.md));
  - round logos fill the frame, and square marks fill 90% of it so they look the same size;
  - coordinates rounded to one decimal.

  The existing ones were traced from the owner's PNGs with potrace, with traced circles replaced by exact ones; each is 0.2–3 KB.
- Education years: `EducationSection.tsx`. Job dates for TuneLike and Gazstroyprom: `ExperienceSection.tsx`. Only Ural-Energo's dates are in the translations (`experience.uralEnergo.dates`).

## Styling

- Tailwind's default font stack (`ui-sans-serif, system-ui, …`) is used, so the CV shows in the viewer's system font: Segoe UI on Windows. The PDF is captured in the exporting browser, so it uses that machine's font.
- Section headings use `text-xl font-bold text-gray-800 mb-3`, and sections are separated by `<Separator className="my-5" />`. The accent colour is Tailwind blue (`text-blue-700`, `bg-blue-50`, `border-blue-500`).
- `print:*` utilities only affect the browser's own print dialog (Ctrl+P). The PDF export renders with screen styles and ignores them. Compact-PDF styles go in `dense:` utilities instead.
- Several grids have an inline `gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"`, and the skill bars have inline colours. They keep the PDF layout the same whatever the window width; don't remove them as clutter.

### Class hooks used by the export

| Class | Where | Effect |
|---|---|---|
| `cv-header` | `CvHeader` | The export forces the desktop row layout. |
| `cv-lang-row`, `cv-langs` | `CvHeader`, `index.css` | A container query shrinks the languages line so it fits on one line. |
| `cv-pdf-page-header`, `cv-pdf-page-number` | `CvHeader` (hidden on the site) | Template for the header of PDF pages 2+, and its "n / N" slot. |
| `cv-pdf-split` | `AiCv`: "What I do", "How I work", "Key competencies"; Education and Experience lists, experience entries and their parts; `TechStackSection` | The block may break across PDF pages between its children. |
| `cv-pdf-keep` | Experience entry heads, "Key Achievements" | Kept on the same page as the next block. |
| `cv-pdf-keep-prev` | "Technologies used" lines | Never starts a page without the block before it. |
| `cv-full-only` | Developer: Skills; AI: What I do, Where I apply this, How I work; education descriptions | Left out of the compact PDF. |
| `cv-compact-only` (with `hidden`) | `TechStackSection`, AI "Key competencies" | Shown only in the compact PDF. |
| `data-pdf-list` (attribute) | `TechStackSection` tag lists | The PDF text layer reads the items as one comma-separated list. |
| `cv-dense` | Added by the export to the compact clone | Turns on the `dense:` styles and the smaller base size. |
| `cv-project-card` | `ProjectsSection` | The export keeps only the first four. |

Renaming or removing one of these changes the PDF; see [pdf-export.md](pdf-export.md).
