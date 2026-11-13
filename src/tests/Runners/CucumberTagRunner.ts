import {exec} from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

function findProjectRoot(startDir: string): string {
    let dir = startDir;
    while (!fs.existsSync(path.join(dir, 'package.json'))) {
        const parent = path.dirname(dir);
        if (parent === dir) throw new Error('package.json bulunamadı');
        dir = parent;
    }
    return dir;
}

// process.argv[1] = çalıştırılan dosyanın tam yolu (ESM'de de CJS'de de var)
const projectRoot = findProjectRoot(path.dirname(path.resolve(process.argv[1])));
const tagName = '@US007AdDynamicRegisterAd01';
const slowMoMs = 500;

console.log(`🚀 Yavaş mod başlatılıyor (slowMo=${slowMoMs}ms)...\n`);

exec(
    `npx cucumber-js  --tags "${tagName}"`,
    {cwd: projectRoot, env: {...process.env, SLOW_MO: String(slowMoMs)}},
    (error, stdout, stderr) => {
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
        if (error) {
            console.error(`\n❌ Test başarısız: ${error.message}`);
            process.exit(1);
        } else {
            console.log(`\n✅ Test tamamlandı!`);
        }
    }
);

// npx cucumber-js --tags "@TagAdi"

// npx cucumber-js --tags "@ST001LylRegisterTC01"

// npx cucumber-js --tags "@US007AdDynamicRegisterAd01"