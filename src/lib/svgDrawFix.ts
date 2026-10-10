// html2canvas draws every image with the nine-argument drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh).
// For SVG images, Safari on macOS and iOS reads that source rectangle in device pixels, so on a
// Retina screen only the top-left part of each icon reaches the PDF. While an export runs, a draw
// of a whole SVG image goes on as drawImage(image, dx, dy, dw, dh) instead: the same draw by the
// canvas spec, and one Safari gets right.

type DrawImage = (this: CanvasRenderingContext2D, image: CanvasImageSource, ...args: number[]) => void;

const isSvgImage = (image: CanvasImageSource): image is HTMLImageElement =>
  image instanceof HTMLImageElement && /^data:image\/svg\+xml|\.svg(?:[?#]|$)/i.test(image.currentSrc || image.src);

let activeExports = 0;
let original: DrawImage;

// Starts the workaround for one export and returns the function that ends it
export const drawWholeSvgImages = () => {
  if (activeExports++ === 0) {
    const draw = original = CanvasRenderingContext2D.prototype.drawImage as DrawImage;
    const patched: DrawImage = function (image, ...args) {
      if (args.length === 8 && isSvgImage(image)) {
        const [sx, sy, sw, sh, dx, dy, dw, dh] = args;
        const whole = sx === 0 && sy === 0 &&
          Math.abs(sw - image.naturalWidth) <= 1 && Math.abs(sh - image.naturalHeight) <= 1;
        if (whole) return draw.call(this, image, dx, dy, dw, dh);
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
