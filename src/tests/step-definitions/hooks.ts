import {Before, After, BeforeAll, AfterAll, setDefaultTimeout, Status, BeforeStep, AfterStep} from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext } from '@playwright/test';

import 'dotenv/config';
import {LoginPluginLogger} from "./LoginPluginLogger";




setDefaultTimeout(30 * 1000);

let browser: Browser;
let context: BrowserContext;


BeforeAll(async function () {
    browser = await chromium.launch({
        headless: false,
        slowMo: Number(process.env.SLOW_MO) || 0,
        timeout: 60000,
        args: [
            //'--start-maximized',
            '--force-device-scale-factor=1',
        ]
    });


    context = await browser.newContext({
        viewport: null
    });
});



Before(async function (scenario) {
    // 1. Chrome Argümanları ve Başlangıç Ayarları
    if (!browser) {
        browser = await chromium.launch({
            headless: false, // Tarayıcıyı görünür açar
            args: [
                '--start-maximized',                      // Tam ekran başlatır
                '--window-position=0,0',
                '--disable-notifications',                // Bildirimleri kapatır
                '--disable-popup-blocking',               // Pop-up engellemeyi kapatır
                '--disable-dev-shm-usage',                // Bellek optimizasyonu
                '--no-sandbox',                           // Linux/CI güvenliği
                '--disable-extensions',                   // Eklentileri kapatır
                '--disable-blink-features=AutomationControlled', // Otomasyon uyarısını gizler
                '--force-device-scale-factor=1.0',        // Ekran ölçeğini %100 yapar
                '--disable-search-engine-choice-screen',   // Chrome arama motoru seçim ekranını kapatır
                //'--disable-features=Translate', // Çeviri özelliğini tamamen devre dışı bırakır
                '--lang=en-US',

            ]
        });
    }

    // 2. Her Ebat/Ekran Çözünürlüğünde Birebir Aynı Olması İçin:
    this.context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 1,
        locale: 'en-US',

    });

    this.page = await this.context.newPage();
});
After(async function () {
    // Her senaryo sonunda sayfayı ve context'i kapatıyoruz
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
});


AfterAll(async function () {
    if (context) {
        await context.close();
    }
    if (browser) {
        await browser.close();
    }
});
//  LoginPluginLogger

let stepCounter = 0;

Before(async function (scenario) {
    stepCounter = 0;

    // Tag'leri çekiyoruz
    const tags = scenario.pickle.tags.map(t => t.name).join(', ') || 'Tag Yok';

    // Feature dosyasının adını çekiyoruz (Örn: US002VerifyElement.features)
    const featureFilePath = scenario.pickle.uri;
    const featureFileName = featureFilePath.split('/').pop()?.split('\\').pop() || 'Unknown Feature';

    // LoggerHelper'a 3 parametreyi de gönderiyoruz
    LoginPluginLogger.logScenarioStart(scenario.pickle.name, tags, featureFileName);
});

BeforeStep(function (step) {
    stepCounter++; // Adım sayısını 1 artır
    // KRİTİK NOKTA: stepCounter'ı ikinci argüman olarak metoda gönderiyoruz!
    LoginPluginLogger.logStep(step.pickleStep.text, stepCounter);
});

AfterStep(function (step) {
    if (step.result?.status === Status.FAILED) {
        LoginPluginLogger.logError(`Step Başarısız Oldu -> ${step.pickleStep.text}`);
    }
});

After(async function (scenario) {
    const isPassed = scenario.result?.status === Status.PASSED;
    LoginPluginLogger.logScenarioEnd(scenario.pickle.name, isPassed);
});