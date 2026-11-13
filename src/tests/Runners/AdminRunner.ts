import { exec } from 'child_process';
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

const projectRoot = findProjectRoot(path.dirname(path.resolve(process.argv[1])));

// Admin klasörü altındaki tüm feature dosyalarını hedefler
const featurePath = 'src/tests/features/Admin/**/*.feature';
// Eğer sadece belirli bir tag koşturulacaksa doldurun, klasördeki her şey çalışsın istiyorsanız boş bırakın
const tagName = '@US007AdDynamicRegisterTC01';
const slowMoMs = 500;

const tagOption = tagName ? `--tags "${tagName}"` : '';

console.log(`🚀 Admin testleri başlatılıyor (slowMo=${slowMoMs}ms)...\n`);

exec(
    `npx cucumber-js "${featurePath}" ${tagOption}`,
    { cwd: projectRoot, env: { ...process.env, SLOW_MO: String(slowMoMs) } },
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