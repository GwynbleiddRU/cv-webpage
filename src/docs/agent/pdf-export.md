# PDF export

The "Download PDF" button in `Index.tsx` calls `useReactToPrint` from `src/lib/print.ts`. It builds the PDF with html2pdf.js, which screenshots the CV with html2canvas and places the screenshots on A4 pages with jsPDF. Our own code adds the page breaks, a running header, an invisible text layer and the links.

## What the owner expects

- The PDF looks exactly like the CV on the site.
- Pages 2 onwards start with a thin header: the name, the role, and "n / N" on the right.
- Sections break between items, never inside one, and don't leave large empty gaps.
- The text can be selected, searched and read by recruiting systems (ATS).

## Pipeline

Everything runs in `handlePrint` in `src/lib/print.ts`:

1. Clone the CV element (`cvRef`). On the clone, remove the bottom padding, keep only the first four `.cv-project-card`, force `.cv-header` into the desktop row layout, and take out the `.cv-pdf-page-header` template (shown again later as the running header).
2. html2pdf's `toContainer()` places the clone in an off-screen container 190 mm wide: A4 minus 10 mm margins, about 719 CSS px.
3. Work out the page height exactly as html2pdf will slice the canvas: `Math.floor(Math.floor(Math.ceil(containerWidth) * scale) * ratio) / scale`, about 1048 CSS px. Every later step uses this number.
4. `paginate()` inserts the page breaks and running headers (rules below).
5. `readOverlay()` in `src/lib/pdfOverlay.ts` records every visible line of text and every link, with its page and position.
6. html2pdf's `toPdf()` renders the container with html2canvas at scale 2 and adds one JPEG per page.
7. `writeOverlay()` writes the recorded text as invisible text and adds the links.
8. `save()` downloads `<documentTitle>.pdf`.

html2pdf's own page breaking and link handling are switched off (`pagebreak: { mode: [] }`, `enableLinks: false`). Its link handling records positions before `paginate()` moves content, which puts links in the wrong place. Don't switch either back on.

## Page breaks (`paginate`)

- Every element is treated as unbreakable. If it would cross a page boundary and fits on one page, a block is inserted before it. The block fills the rest of the page and carries the running header for the next one.
- An element with the class `cv-pdf-split` may break between its children. Mark every level you want to break through: in `AiCv`, both the `<section>` and the list inside it carry the class.
- A heading (`h1` to `h6`) is measured together with the first block after it, so a heading never ends a page alone.
- A divider between sections (`<Separator />`, which renders `role="none"` and `data-orientation="horizontal"`) is removed when it would open a page, since the running header already separates the pages. A divider at the bottom of a page stays.
- A page whose break falls in blank space still gets its header, placed before its first element.
- Elements taller than a page are cut wherever the page ends.
- The inserted blocks become siblings of the element they push down. Inside a CSS grid they would become grid cells and break the grid, so never mark a grid `cv-pdf-split`. Grids always stay whole.
- To let a new long section break across pages, add `cv-pdf-split` to the section and to the element that holds its items, and keep each item a single element.

## Text layer (`pdfOverlay.ts`)

- Words are read from the final layout through DOM `Range` boxes and joined into runs: one per line, block and font size. Runs are written in DOM order, which is the order text extraction and most ATS read them in.
- Each run is drawn as invisible text (rendering mode 3) and stretched horizontally (`Tz`) to the width of the visible text, so selecting text lines up with what you see. A run's page is chosen by the middle of its text box, because a text box can stick out above its line.
- The font is `src/assets/fonts/NotoSans-Regular-subset.ttf` (SIL Open Font License; the licence file sits next to it). It is fetched only when someone exports. jsPDF embeds only the glyphs used, so a PDF grows by about 50 KB.
- The subset covers U+0020–007E, U+00A0–017F, U+0400–045F, U+0490–0491, U+2010–2027, U+2030–203A, № U+2116, ™ U+2122, € U+20AC, ₽ U+20BD, the arrows U+2190–2193, and − U+2212. Characters outside these (other scripts, emoji, other symbols) won't extract correctly. To add ranges, rebuild the subset with fontTools in a temporary virtual environment:

  ```sh
  pip install fonttools
  curl -L -o NotoSans-Regular.ttf https://github.com/notofonts/notofonts.github.io/raw/main/fonts/NotoSans/unhinted/ttf/NotoSans-Regular.ttf
  python -m fontTools.subset NotoSans-Regular.ttf --output-file=NotoSans-Regular-subset.ttf --unicodes="U+0020-007E,U+00A0-017F,U+0400-045F,U+0490-0491,U+2010-2027,U+2030-203A,U+20AC,U+20BD,U+2116,U+2122,U+2190-2193,U+2212,<new ranges>" --layout-features='' --no-hinting --name-IDs='*' --notdef-outline
  ```

## html2canvas traps

- html2canvas draws an `<img>` only when it has an intrinsic size (`naturalWidth` and `naturalHeight` above 0), and uses that size as the source rectangle. An SVG without `width` and `height` attributes may have no intrinsic size, so keep them on every SVG used in the CV. html2canvas also ignores `object-fit`, so give an image a box with its own aspect ratio.
- `src/index.css` contains `body > div > img { display: inline; }`. html2canvas finds text baselines with an `<img>` it adds to `<body>`, and Tailwind's base styles make images block-level. Without the rule, every line of PDF text is drawn about 6 px too low, and bullets and icons look misaligned. Keep it.
- The export uses screen styles, so `print:*` utilities do nothing in it.
- Responsive prefixes (`sm:`, `md:`) follow the window of the browser doing the export, not the 190 mm container. Exported from a phone-width window, `sm:grid-cols-2` becomes one column in the PDF. For anything that must look the same in the PDF, use width-independent styles (like the inline `repeat(auto-fit, minmax(250px, 1fr))` grids), or force the layout on the clone in `handlePrint` as is done for `.cv-header`. Known open case: the AI CV's "Where I apply this" grid (`grid-cols-1 sm:grid-cols-2`) turns into one column when exported from a narrow window.
- The container is narrower than the card on screen (about 719 px against up to 800 px), so lines wrap differently from the screen. Judge the PDF by exporting it.

## Verifying a change

Do this after any change to CV markup, styles, translations or the export code. Check both CVs (`#developer`, `#ai`) in both languages.

1. Export with a headless browser. Set up in a temp directory, not the repo:

   ```sh
   npm init -y && PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm i playwright-core@1
   ```

   `export.mjs` needs the dev server on port 8080. Run it as `node export.mjs <output dir>`:

   ```js
   import { chromium } from 'playwright-core';
   const out = process.argv[2] ?? '.';
   const browser = await chromium.launch({ channel: 'msedge', headless: true });
   for (const lng of ['en', 'ru']) for (const cv of ['ai', 'developer']) {
     const context = await browser.newContext({ acceptDownloads: true, viewport: { width: 1280, height: 900 } });
     await context.addInitScript(l => localStorage.setItem('i18nextLng', l), lng);
     const page = await context.newPage();
     page.on('pageerror', e => console.error(lng, cv, e.message));
     await page.goto(`http://localhost:8080/cv-webpage#${cv}`, { waitUntil: 'networkidle' });
     const [download] = await Promise.all([
       page.waitForEvent('download', { timeout: 60000 }),
       page.getByRole('button', { name: lng === 'ru' ? 'Скачать PDF' : 'Download PDF' }).click(),
     ]);
     await download.saveAs(`${out}/${cv}-${lng}.pdf`);
     await context.close();
   }
   await browser.close();
   ```

2. Look at every page: page breaks, the running header and page numbers, and the alignment of bullets and icons.
3. Check the text layer. In a temporary virtual environment run `pip install pdfminer.six`, then `python -c "from pdfminer.high_level import extract_text; print(extract_text('ai-en.pdf'))"`. The text should be complete, with correct spaces and Cyrillic. Pages are separated by form feeds (`\f`), and every page after the first should start with its running header.
4. To show that nothing visible changed, compare with the committed version:
   - In PowerShell, create a worktree and link `node_modules` into it:
     `git worktree add --detach $wt HEAD`, then `New-Item -ItemType Junction -Path "$wt\node_modules" -Target "<repo>\node_modules"`.
   - In `$wt`, run `node node_modules/vite/bin/vite.js --port 8090 --strictPort`, and export with the port in the script changed to 8090.
   - Compare the page images of the two exports with the script below. They are byte-identical when nothing visible changed.
   - Clean up in this order: stop the server, run `cmd /c rmdir "$wt\node_modules"`, then `git worktree remove --force $wt`. If you remove the worktree while the link is still there, the real `node_modules` is deleted too.

   `same-pages.mjs`, run as `node same-pages.mjs a.pdf b.pdf`:

   ```js
   import { readFileSync } from 'node:fs';
   import { createHash } from 'node:crypto';
   const pages = file => {
     const bytes = readFileSync(file), text = bytes.toString('latin1'), hashes = [];
     for (const m of text.matchAll(/\/Subtype \/Image[^]*?\/Length (\d+)[^]*?stream\r?\n/g)) {
       const start = m.index + m[0].length;
       hashes.push(createHash('md5').update(bytes.subarray(start, start + Number(m[1]))).digest('hex'));
     }
     return hashes.join();
   };
   console.log(pages(process.argv[2]) === pages(process.argv[3]) ? 'same page images' : 'page images differ');
   ```

## Limits of this design

- The visible pages are images at about 190 dpi, so zoomed far in they look softer than drawn text. Drawn text would need a bundled font, and so a typeface different from the site's.
- Parsers that order text by position can interleave the lines of side-by-side columns, as in "Where I apply this" or "Technical Expertise" next to "Professional Skills". Parsers that read in content order get them right.
- The font comes from the exporting machine, so a PDF exported on macOS or Android uses that system's font.
- The code relies on internals of html2pdf.js 0.10.3: `prop.container`, `prop.pageSize`, `opt.margin`, and how it slices the canvas into pages. After upgrading html2pdf.js, html2canvas or jsPDF, repeat the full verification.
