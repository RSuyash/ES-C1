import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");

const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const jpgSignature = Buffer.from([0xff, 0xd8, 0xff]);
const icoSignature = Buffer.from([0x00, 0x00, 0x01, 0x00]);

function assertSignature(relativePath, expectedSignature, label) {
  const absolutePath = path.join(projectRoot, relativePath);
  const fileBuffer = fs.readFileSync(absolutePath);

  if (!fileBuffer.subarray(0, expectedSignature.length).equals(expectedSignature)) {
    const actualSignature = fileBuffer.subarray(0, expectedSignature.length).toString("hex");
    throw new Error(`${relativePath} is not a valid ${label} file. Found signature ${actualSignature}`);
  }
}

assertSignature("public/logo.png", pngSignature, "PNG");
assertSignature("public/icon.png", pngSignature, "PNG");
assertSignature("public/hero.jpeg", jpgSignature, "JPEG");

const faviconPath = path.join(projectRoot, "public/favicon.ico");
const faviconBuffer = fs.readFileSync(faviconPath);
const faviconLooksValid =
  faviconBuffer.subarray(0, icoSignature.length).equals(icoSignature) ||
  faviconBuffer.subarray(0, pngSignature.length).equals(pngSignature);

if (!faviconLooksValid) {
  throw new Error(`public/favicon.ico is not a valid ICO or PNG favicon. Found signature ${faviconBuffer.subarray(0, 8).toString("hex")}`);
}

console.log("public asset signatures are valid");
