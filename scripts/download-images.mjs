// Downloads every photo used on the site into public/images and switches the
// site to serve them locally.
//
//   node scripts/download-images.mjs

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const imagesTs = join(root, "lib", "images.ts");
const outDir = join(root, "public", "images");

const source = await readFile(imagesTs, "utf8");
const base = source.match(/REMOTE_IMAGE_BASE =\s*"([^"]+)"/)[1];
const files = [...new Set([...source.matchAll(/file: "([^"]+)"/g)].map((m) => m[1]))];

await mkdir(outDir, { recursive: true });

let failed = 0;
for (const file of files) {
  const res = await fetch(base + file);
  if (!res.ok) {
    console.error(`✗ ${file} (${res.status})`);
    failed++;
    continue;
  }
  await writeFile(join(outDir, file), Buffer.from(await res.arrayBuffer()));
  console.log(`✓ ${file}`);
}

if (failed) {
  console.error(`\n${failed} file(s) failed. Site still uses remote images.`);
  process.exit(1);
}

await writeFile(
  imagesTs,
  source.replace("USE_LOCAL_IMAGES = false", "USE_LOCAL_IMAGES = true"),
);
console.log(`\nSaved ${files.length} images to public/images and enabled local images.`);
