import { execSync } from 'child_process';

const komut = process.argv[2]; // Terminalden gelen ilk parametreyi alır

const gorevler: Record<string, string> = {
    tree: 'npx tree-node-cli -I "node_modules|dist|.git|playwright-report|test-results" -o proje-yapisi.txt',
    clean: 'rmdir /s /q playwright-report test-results 2>nul',
    smoke: 'npx playwright test --grep @smoke',
    report: 'npx playwright show-report'
};

if (!komut || !gorevler[komut]) {
    console.log('Kullanılabilir komutlar:', Object.keys(gorevler).join(', '));
    process.exit(1);
}

execSync(gorevler[komut], { stdio: 'inherit' });