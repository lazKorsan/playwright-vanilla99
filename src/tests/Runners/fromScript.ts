const TAG = "@US007AdDynamicRegisterAd01"; // <-- SADECE BURAYI DEĞİŞTİRİN

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ES Module ortamında dosyanın bulunduğu klasörden yukarı tırmanarak package.json kök dizinini bulur
let rootDir = process.cwd();
while (!fs.existsSync(path.join(rootDir, "package.json")) && rootDir !== path.parse(rootDir).root) {
    rootDir = path.dirname(rootDir);
}

execSync(`npx cucumber-js --tags "${TAG}"`, {
    cwd: rootDir,
    stdio: "inherit"
});