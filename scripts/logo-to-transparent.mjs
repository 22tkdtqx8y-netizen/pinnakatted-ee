/**
 * Teeb logo valge tausta läbipaistvaks ja salvestab PNG-na.
 * Käivita: node scripts/logo-to-transparent.mjs
 */
import sharp from "sharp";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT = join(__dirname, "..", "public", "images", "logo-pinnakatted.jpg");
const OUTPUT = join(__dirname, "..", "public", "images", "logo-pinnakatted.png");

const WHITE_THRESHOLD = 245;

async function main() {
  const { data, info } = await sharp(INPUT)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const newData = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];
    const a = channels === 4 ? data[i * channels + 3] : 255;
    const isWhite =
      r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD;
    newData[i * 4] = r;
    newData[i * 4 + 1] = g;
    newData[i * 4 + 2] = b;
    newData[i * 4 + 3] = isWhite ? 0 : a;
  }

  await sharp(newData, {
    raw: { width, height, channels: 4 },
  })
    .png()
    .toFile(OUTPUT);

  console.log("Logo salvestatud läbipaistva taustaga:", OUTPUT);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
