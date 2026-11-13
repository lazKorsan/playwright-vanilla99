import { test } from "@playwright/test";

import { execSync } from "child_process";

test('Framework Runner', async () => {
    const projectRoot = process.cwd();
    const featurePath = 'src/tests/features/Admin/US004DynamicRegister.feature';
    const tagName = '@US007AdDynamicRegisterAd01';
    const slowMoMs = 500;

    console.log(`🚀 Yavaş mod başlatılıyor (slowMo=${slowMoMs}ms)...\n`);

    // Testin bitmesini bekler; hata olursa Playwright testi otomatik FAIL işaretler
    execSync(`npx cucumber-js "${featurePath}" --tags "${tagName}"`, {
        cwd: projectRoot,
        stdio: 'inherit',
        env: { ...process.env, SLOW_MO: String(slowMoMs) }
    });
});
