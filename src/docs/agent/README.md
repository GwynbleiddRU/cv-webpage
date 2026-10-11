# Agent guide: cv-webpage

Read this first. It covers what the project is and the rules for working on it for its owner. Details:

- [architecture.md](architecture.md): code map, routing, translations, styling, class hooks.
- [pdf-export.md](pdf-export.md): how "Download PDF" works, its traps, and how to verify a change.

## What the project is

The personal CV website of Georgiy Nosachev (GitHub `GwynbleiddRU`), published on GitHub Pages at
https://gwynbleiddru.github.io/cv-webpage. One page holds two CVs in two languages:

| CV | URL hash | Role in the header | Built from |
|---|---|---|---|
| Developer | `#developer` (also the default) | Fullstack Developer | `CvHeader`, `ProfileSection`, `EducationSection`, `ExperienceSection`, `SkillsSection`, `ProjectsSection` |
| AI | `#ai` | AI Implementation and Automation Specialist | `AiCv`: text from the `ai.*` translation keys, plus `EducationSection` and `ExperienceSection` with `brief` |

English and Russian texts are in `src/locales/{en,ru}/translation.json`. The "Download PDF" button opens a menu and exports the open CV, in the open language, as an A4 PDF in one of two versions:

- the full version, as on the page;
- a compact version of at most 2 pages, which exists only as a PDF.

The CV text is the owner's real professional record. The PDF is what they send to employers, and recruiting systems (ATS) parse it.

## Rules

1. Don't commit, push or rebuild `docs/` unless asked. The owner reviews and commits the work, with messages like `feat: …` and `fix: …`, and rebuilds `docs/` in a separate commit.
2. Never put files in the top-level `docs/`. It is the GitHub Pages build output, and `npm run build` empties and rewrites it. That is why these notes live in `src/docs/agent/`.
3. Don't invent CV facts: employers, dates, results, skills, skill levels. If a task needs new wording, write it plainly and tell the owner which text is yours, so they can check it.
4. Keep the `en` and `ru` files in step: same keys, same array lengths and order. When asked to restyle something, keep its text as it is.
5. Leave contact details and links alone unless asked.
6. Keep the look of the exported PDF unless the task is to change it. After any change that can affect the CV layout, export the PDF and look at it (see [pdf-export.md](pdf-export.md)). Check both versions: a change to shared content or components usually reaches the compact PDF too. The compact PDF must stay within 2 pages for both CVs in both languages.
7. The owner edits in VS Code while you work. Re-read a file before editing it if it may have changed, and never revert their edits.
8. Keep scratch files (scripts, exported PDFs, virtual environments) outside the repo, for example in a temp directory.
9. Keep the site light; it was audited for speed (see "Performance" below). Don't import `@/lib/print` statically, don't bring back the `flag-icons` stylesheet, and add a shadcn/ui component or a package only when the code uses it.

## Commands

| Task | Command | Notes |
|---|---|---|
| Install | `npm install` | `package-lock.json` is the lockfile. |
| Dev server | `npm run dev` | http://localhost:8080/cv-webpage (add `#ai` for the AI CV). The owner usually has it running already, so check port 8080 before starting another. |
| Type check | `npx tsc --noEmit -p tsconfig.app.json` | Must pass. |
| Lint | `npm run lint` | Must report 0 errors. Its one warning, in `src/components/ui/button.tsx` (`buttonVariants` exported next to the component), is the usual shadcn/ui pattern. |
| Test build | `npx vite build --outDir <temp dir>` | Plain `npm run build` overwrites `docs/` (rule 2). Vite warns that one chunk is over 500 kB: that is the PDF export, which loads after the page (see "Performance"). |

There are no automated tests. A change is verified by the type check, lint, and looking at the page and the exported PDF.

## Performance

Measured on a simulated mid-range phone (CPU 4× slower, 1.6 Mbit/s, 150 ms latency, empty cache) when the site was audited:

| Part | Size (gzip) | Loads |
|---|---|---|
| CSS | about 6 KB | before the page shows |
| Main script | about 137 KB | before the page shows |
| PDF export (`print-*.js`: html2pdf, jsPDF, html2canvas) | about 191 KB | after the page has rendered, from `Index.tsx`, so it is ready before anyone picks a version |

The page showed its content after about 1.4 s (2.97 s before the audit, when the flag stylesheet and the PDF code loaded with the page).

## Environment

- Windows 11, with both PowerShell and Git Bash. The repo path contains Cyrillic (`…\Репозиторий\…`): quote paths, and expect some console tools to print it garbled.
- Microsoft Edge is installed and Chrome is not, so headless browser checks run on Edge ([pdf-export.md](pdf-export.md) has the script).
- Windows display scaling is about 110%. Playwright's WebKit inherits it (`devicePixelRatio` 1.104, `innerWidth` 1159 in a 1280 px window), so its results can differ from real Safari. On the dev server it may lay out the PDF about 10% smaller, with words run together; judge its layout only from a production build (`npx vite build --outDir <temp dir>` and `vite preview`). Apple's own WebKit can't be tested here at all.
- Python 3 is installed without extra packages. Create a virtual environment in a temp directory for tools such as `pdfminer.six` or `fonttools`.
- Git warns about LF being replaced by CRLF in edited files; that is expected.

## Working with the owner

- Requests are short and often point at the running page (for example http://localhost:8080/cv-webpage#ai) or at an exported PDF. Look at the actual result before changing code.
- They want a neat, professional look and notice visual regressions, especially in the PDF.
- When something behaves oddly, explain the cause in plain words as well as fixing it.
- Report what you checked and how, and say plainly what you could not check.

## Decisions already made

Don't undo these without asking:

- The language button shows a flag image from the `flag-icons` package (`flags/4x3/gb.svg`, `flags/4x3/ru.svg`, imported in `Index.tsx`), because emoji flags don't render on Windows. Only those two files are imported: the package's stylesheet was most of the site's CSS (about 85 of 97 KB gzipped) and added about 140 flag files to the build.
- While a PDF is being made, the download button says "Preparing PDF…" and the menu's versions are disabled; a failed export shows a message (Sonner toast) and the button returns to normal.
- The site's icons are sized for their use: `favicon.ico` holds 16, 32 and 48 px images, and `favicon.png` is the 180 px icon for phones' home screens.
- The PDF is page images from html2pdf with an invisible text layer on top. It looks exactly like the site and recruiting systems can still read it. A PDF with drawn text was rejected because it needs a bundled font, which would change the typeface.
- Page breaks, the running header with "n / N" page numbers, and the PDF links are made by our own code, not by html2pdf's options.
- In both CVs, Education and then Professional Experience come straight after the profile section.
- The AI CV has no separate "Practical experience" section. It repeated Profile and "What I do", so its one new point (programming and interface design skills let the owner integrate an AI process into a working application) was moved into Profile's last paragraph.
- The AI CV shows a short version of those two sections: degree, institution and dates; company, role and dates. Its Education and Experience entries come from the same translation keys and components as the developer CV, so an entry edited there changes both CVs.
- The developer CV's full PDF shows only the first four project cards, which are the newest.
- The compact PDF (at most 2 pages, about 14 px text) keeps every important fact:
  - **Developer CV:** Technical Skills is replaced by "Tech Stack" (technologies as tags, grouped by area). Notable Projects keeps the four newest project cards, each marked with ↗ as a link. Education descriptions are dropped. Professional Experience stays in full.
  - **AI CV:** What I do, Where I apply this and How I work are merged into "Key competencies".
  - **Wording:** the condensed texts were written by an agent from the full ones, and the owner was asked to review them.
- In the PDF, an experience entry may break across pages between its parts, but its head stays with its description, "Key Achievements" stays with its first bullet, and a "Technologies used" line is never cut off at the top of a page.
- In the AI CV, the "What I do" details are blue panels with a left border and dot bullets.
- The logos stay `<img>` SVGs, on the page and in the PDF. The PDF export resizes each SVG to the size it is shown at, because Safari otherwise crops it (see [pdf-export.md](pdf-export.md)).
- In both CVs, each Education and Experience entry starts with the organisation's logo: a 40 px SVG in its own column, centred on the name and degree or role. The SVGs were vectorised from the owner's PNGs and normalised to one size (see [architecture.md](architecture.md)).
