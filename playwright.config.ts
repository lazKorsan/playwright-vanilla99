import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();
// HEADLESS tanımlı değilse varsayılan olarak false kabul eder
const isHeadless = process.env.HEADLESS ? process.env.HEADLESS === 'true' : false;
export default defineConfig({
  testDir: './',
  testIgnore: [
    '**/node_modules/**',
    '**/target/**',          // rapor/artifact klasörleri test olarak algılanmasın
  ],
  testMatch: '**/*.spec.ts',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Test artifact'ları (screenshot, video, trace) buraya yazılır
  outputDir: 'target/test-results',

  reporter: [
    // Playwright HTML raporu -> target/playwright-report
    ['html', { outputFolder: 'target/playwright-report', open: 'never' }],

    // Konsol listesi
    ['list'],

    // Allure sonuçları -> target/allure-results (Cucumber ile aynı çatı)
    [
      'allure-playwright',
      {
        resultsDir: 'target/allure-results',
        detail: true,
        outputFolder: 'target/allure-results', // bazı sürümler bunu bekler
      },
    ],
  ],

  use: {
    viewport: null,
    headless: isHeadless,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        viewport: null,
        launchOptions: {
          args: [
            '--start-maximized',
            '--disable-notifications',
            '--disable-popup-blocking',
            '--disable-dev-shm-usage',
            '--no-sandbox',
            '--disable-extensions',
            '--disable-blink-features=AutomationControlled',
            '--force-device-scale-factor=1.0',
            '--disable-search-engine-choice-screen',
            '--lang=en-US',
          ],
        },
      },
    },
  ],
});