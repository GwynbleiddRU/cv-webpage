// Safari gives an SVG <img> the size it is shown at as its naturalWidth and naturalHeight, not the
// size in the SVG file, and html2canvas takes the part of the image to draw from those two values.
// So PDFs exported on an iPhone showed only the top-left 32 px of each 128 px logo shown at 32 px,
// enlarged. Inline SVG icons, which html2canvas redraws at the size they are shown at, came out right.
//
// The export therefore replaces every SVG <img> in its copy of the CV with one showing the same SVG with
// its width and height set to the size it is shown at (fitSvgImages). Then both values agree in every
// browser. It must be a new element: html2canvas copies an image's currentSrc when that differs from
// its src, and an element given a new src keeps the old image as currentSrc until the new one loads.

const SVG_URL = /^data:image\/svg\+xml|\.svg(?:[?#]|$)/i;
const SVG_DATA_URL = /^data:image\/svg\+xml([^,]*),/i;
const PLAIN_LENGTH = /^\s*[\d.]+(?:px)?\s*$/;

// Text of SVG files (not data URLs), by absolute URL, fetched ahead of an export
const files = new Map<string, string>();
const fetching = new Set<string>();

const urlOf = (img: HTMLImageElement) => img.currentSrc || img.src;

const svgText = (url: string) => {
  const data = SVG_DATA_URL.exec(url);
  if (!data) return files.get(url);
  const payload = url.slice(data[0].length);
  if (!/;base64/i.test(data[1])) return decodeURIComponent(payload);
  return new TextDecoder().decode(Uint8Array.from(atob(payload), char => char.charCodeAt(0)));
};

// Starts fetching the SVG files shown as images in `root`, so an export doesn't have to wait for them.
// Images given as data URLs (all of them in a production build) need nothing.
export const prefetchSvgImages = (root: ParentNode) => {
  root.querySelectorAll('img').forEach(img => {
    const url = urlOf(img);
    if (!SVG_URL.test(url) || SVG_DATA_URL.test(url) || files.has(url) || fetching.has(url)) return;
    fetching.add(url);
    fetch(url)
      .then(response => (response.ok ? response.text() : Promise.reject(new Error(`HTTP ${response.status}`))))
      .then(text => { files.set(url, text); })
      .catch(error => console.warn('PDF export: could not fetch', url, error))
      .finally(() => fetching.delete(url));
  });
};

// Replaces each SVG <img> in `root`, which must be laid out, with one showing an SVG of the size the
// image is shown at
export const fitSvgImages = (root: ParentNode) => {
  root.querySelectorAll('img').forEach(img => {
    const url = urlOf(img);
    if (!SVG_URL.test(url)) return;

    // html2canvas draws an image into its content box
    const style = getComputedStyle(img);
    const box = img.getBoundingClientRect();
    const width = box.width - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) -
      parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth);
    const height = box.height - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom) -
      parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth);

    const text = svgText(url);
    const svg = text && new DOMParser().parseFromString(text, 'image/svg+xml').documentElement;
    if (!svg || svg.nodeName !== 'svg' || width <= 0 || height <= 0) {
      console.warn('PDF export: SVG image left as is, so Safari may crop it:', url.slice(0, 80));
      return;
    }

    // A new width and height scale the drawing only through a viewBox
    if (!svg.hasAttribute('viewBox')) {
      const [w, h] = ['width', 'height'].map(name => svg.getAttribute(name) ?? '');
      if (!PLAIN_LENGTH.test(w) || !PLAIN_LENGTH.test(h)) {
        console.warn('PDF export: SVG image without a viewBox left as is:', url.slice(0, 80));
        return;
      }
      svg.setAttribute('viewBox', `0 0 ${parseFloat(w)} ${parseFloat(h)}`);
    }
    svg.setAttribute('width', `${width}`);
    svg.setAttribute('height', `${height}`);

    const fitted = document.createElement('img');
    for (const { name, value } of Array.from(img.attributes)) {
      if (!/^(src|srcset|sizes)$/i.test(name)) fitted.setAttribute(name, value);
    }
    fitted.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(svg))}`;
    img.replaceWith(fitted);
  });
};
