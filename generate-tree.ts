import { execSync } from 'child_process';

execSync('npx tree-node-cli -I "node_modules|dist|.git|playwright-report|test-results" -o proje-yapisi.txt', {
    stdio: 'inherit'
});

