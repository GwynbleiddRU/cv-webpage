import gazstroyprom from "@/assets/images/gazstroyprom.svg?raw";
import hse from "@/assets/images/hse.svg?raw";
import innopolis from "@/assets/images/innopolis.svg?raw";
import tuneLike from "@/assets/images/tunelike.svg?raw";
import uralEnergo from "@/assets/images/ural-energo.svg?raw";

// Organisation logos as SVG data URLs, on the dev server as in a production build: the PDF export
// reads and resizes them as it builds the PDF (see svgImages.ts)
const dataUrl = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

export const LOGOS = {
  gazstroyprom: dataUrl(gazstroyprom),
  hse: dataUrl(hse),
  innopolis: dataUrl(innopolis),
  tuneLike: dataUrl(tuneLike),
  uralEnergo: dataUrl(uralEnergo),
};
