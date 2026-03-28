import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function processDir(dir, width) {
  const fullDir = path.resolve(__dirname, dir);
  const files = fs.readdirSync(fullDir);
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg')) {
      const input = path.join(fullDir, file);
      const name = file.replace(/\.[^/.]+$/, "");
      const output = path.join(fullDir, name + '.webp');
      
      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 60, effort: 6 })
        .toFile(output);
      
      console.log('Processed ', path.basename(output));
      fs.unlinkSync(input); // cleanly remove old heavy files
    }
  }
}

async function run() {
  try {
    await processDir('./public/images/location/desktop', 1000);
    await processDir('./public/images/location/mobile', 500);
    console.log("Done compressing images.");
  } catch (err) {
    console.error(err);
  }
}

run();
