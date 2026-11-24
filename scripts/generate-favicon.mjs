// shortcut: one-off asset generator, not part of the app build.
// Regenerate after changing the logo mark: `bun add -D sharp && bun run scripts/generate-favicon.mjs`
// (sharp is not a persistent dependency — remove it again after running).
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "..", "src", "app", "favicon.ico");

const ACCENT = "#2457C5";
const SURFACE = "#FFFFFF";

// Geometric "N" monogram (Nursultan Nurgali) in a square 0-radius frame, matching the
// design system's accent color and flat/technical card rule.
const svg = `
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="64" height="64" fill="${SURFACE}"/>
  <rect x="4" y="4" width="56" height="56" fill="none" stroke="${ACCENT}" stroke-width="5"/>
  <polyline points="20,46 20,18 44,46 44,18" fill="none" stroke="${ACCENT}" stroke-width="6"
    stroke-linecap="square" stroke-linejoin="miter"/>
</svg>
`;

const SIZES = [16, 32, 48];

function icoHeader(count) {
  const buf = Buffer.alloc(6);
  buf.writeUInt16LE(0, 0); // reserved
  buf.writeUInt16LE(1, 2); // type: icon
  buf.writeUInt16LE(count, 4);
  return buf;
}

function icoDirEntry(size, dataLength, offset) {
  const buf = Buffer.alloc(16);
  buf.writeUInt8(size === 256 ? 0 : size, 0); // width (0 = 256)
  buf.writeUInt8(size === 256 ? 0 : size, 1); // height
  buf.writeUInt8(0, 2); // color count
  buf.writeUInt8(0, 3); // reserved
  buf.writeUInt16LE(1, 4); // color planes
  buf.writeUInt16LE(32, 6); // bits per pixel
  buf.writeUInt32LE(dataLength, 8);
  buf.writeUInt32LE(offset, 12);
  return buf;
}

const pngBuffers = await Promise.all(
  SIZES.map((size) => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer()),
);

const header = icoHeader(SIZES.length);
let offset = header.length + SIZES.length * 16;
const dirEntries = SIZES.map((size, i) => {
  const entry = icoDirEntry(size, pngBuffers[i].length, offset);
  offset += pngBuffers[i].length;
  return entry;
});

const ico = Buffer.concat([header, ...dirEntries, ...pngBuffers]);
writeFileSync(OUT_PATH, ico);
console.log(`Wrote ${OUT_PATH} (${ico.length} bytes, sizes: ${SIZES.join(", ")})`);
