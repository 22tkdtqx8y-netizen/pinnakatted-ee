/**
 * Optimeerib public/images/projects/ pildid: resize max 1600px, WebP quality 82.
 * Käivita: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECTS_DIR = join(__dirname, "..", "public", "images", "projects");

const MAX_WIDTH = 1600;
const WEBP_QUALITY = 82;

async function optimizeImages() {
  const files = await readdir(PROJECTS_DIR);
  const images = files.filter(
    (f) => [".jpg", ".jpeg", ".png"].includes(extname(f).toLowerCase())
  );

  for (const file of images) {
    const inputPath = join(PROJECTS_DIR, file);
    const base = file.replace(/\.[^.]+$/, "");
    const outputPath = join(PROJECTS_DIR, `${base}.webp`);

    try {
      const meta = await sharp(inputPath).metadata();
      const width = meta.width ?? 0;
      const resizeWidth = width > MAX_WIDTH ? MAX_WIDTH : width;

      await sharp(inputPath)
        .rotate() // Rakenda EXIF orientatsioon (parandab "küllili" pildid)
        .resize(resizeWidth, null, { withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputPath);

      const inStat = await stat(inputPath);
      const outStat = await stat(outputPath);
      console.log(
        `${file} → ${base}.webp (${(inStat.size / 1024).toFixed(1)} KB → ${(outStat.size / 1024).toFixed(1)} KB)`
      );
    } catch (err) {
      console.error(`Error ${file}:`, err.message);
    }
  }

  console.log("Done. Update content/projects.json to use .webp paths.");
}

optimizeImages();
