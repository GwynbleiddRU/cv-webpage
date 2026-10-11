// Safari on iPhone and Mac draws an SVG <img> into a canvas wrongly when the page also shows that
// image: in exported PDFs the organisation logos showed only their top-left corner, enlarged by the
// screen's pixel ratio. The copies html2canvas makes of inline SVG icons, never shown on the page and
// drawn at their own size, came out right.
//
// So each SVG <img> of the CV gets a raster copy ahead of time (prepareSvgImages), drawn from a fresh
// copy of the SVG that is never shown, at its own size. While an export runs (startSvgDrawFix),
// html2canvas draws that raster copy in place of the SVG image. Other whole-image draws of an SVG go
// through drawImage(image, dx, dy, dw, dh), which by the canvas spec is the same draw.

type DrawImage = (this: CanvasRenderingContext2D, image: CanvasImageSource, ...args: number[]) => void;

const SVG_URL = /^data:image\/svg\+xml|\.svg(?:[?#]|$)/i;
const COPY_SCALE = 4;  // Raster copy pixels per CSS pixel of the image on the page

// By the image's absolute URL: the raster copy, or the promise of one
const copies = new Map<string, HTMLCanvasElement | Promise<void>>();

const load = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load ${src.slice(0, 80)}`));
    image.src = src;
  });

const rasterCopy = async (url: string, width: number, height: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(width * COPY_SCALE);
  canvas.height = Math.round(height * COPY_SCALE);
  const svg = new DOMParser().parseFromString(await (await fetch(url)).text(), 'image/svg+xml').documentElement;
  svg.setAttribute('width', `${canvas.width}`);
  svg.setAttribute('height', `${canvas.height}`);
  const fresh = await load(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(svg))}`);
  canvas.getContext('2d').drawImage(fresh, 0, 0, canvas.width, canvas.height);
  return canvas;
};

// Starts making raster copies of the SVG images in `root` that don't have one yet
export const prepareSvgImages = (root: ParentNode) => {
  root.querySelectorAll('img').forEach(img => {
    const url = img.currentSrc || img.src;
    const { width, height } = img.getBoundingClientRect();
    if (!SVG_URL.test(url) || copies.has(url) || !width || !height) return;
    copies.set(url, rasterCopy(url, width, height).then(
      canvas => { copies.set(url, canvas); },
      error => {
        copies.delete(url);
        console.warn('PDF export: no raster copy of an SVG image', error);
      },
    ));
  });
};

let activeExports = 0;
let original: DrawImage;

// Starts the workaround for one export and returns the function that ends it
export const startSvgDrawFix = () => {
  if (activeExports++ === 0) {
    const draw = original = CanvasRenderingContext2D.prototype.drawImage as DrawImage;
    const patched: DrawImage = function (image, ...args) {
      if (args.length === 8 && image instanceof HTMLImageElement) {
        const url = image.currentSrc || image.src;
        const [sx, sy, sw, sh, dx, dy, dw, dh] = args;
        const whole = sx === 0 && sy === 0 &&
          Math.abs(sw - image.naturalWidth) <= 1 && Math.abs(sh - image.naturalHeight) <= 1;
        if (whole && SVG_URL.test(url)) {
          const copy = copies.get(url);
          return draw.call(this, copy instanceof HTMLCanvasElement ? copy : image, dx, dy, dw, dh);
        }
      }
      return draw.call(this, image, ...args);
    };
    CanvasRenderingContext2D.prototype.drawImage = patched as CanvasRenderingContext2D['drawImage'];
  }

  let ended = false;
  return () => {
    if (ended) return;
    ended = true;
    if (--activeExports === 0) CanvasRenderingContext2D.prototype.drawImage = original as CanvasRenderingContext2D['drawImage'];
  };
};
