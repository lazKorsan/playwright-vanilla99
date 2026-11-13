import { test, expect } from '@playwright/test';
import {LoggerHelper} from "../../src/main/utils/LoggerHelper";

test('US005Product Search TC01', async ({ page }) => {

    // studemt kullanicisi .env dosyasindan url alir
    const lyl=process.env.LYL_URL!;

    // student kulllanicisi loyalfriendcare sayfasina gider
    await page.goto(lyl);

    // arama kutusuna "RE" yazar ve enter basar
    const searchText='RE';
    await page.getByRole('textbox', { name: 'Search Here Service, Medicine' }).fill('RE');
    await page.getByRole('textbox', { name: 'Search Here Service, Medicine' }).press('Enter');

    // Student kullanicisi beklenen url kayt eder
    const expectedUrl='search=RE';

    // studetn kullanicisi beklenen url dogrular
    await expect(page).toHaveURL(/search=RE/);
    LoggerHelper.logInfo(`Kullanici "${expectedUrl}" arama sayfasinda oldugunu dogrular`);

    // student kullanicisi codeGen ile ilk elementin yazisini dogrular
    await expect(page.getByRole('main')).toContainText('Dental Care Room');
    const expectedFirstProductText='Dental Care Room';
    LoggerHelper.logInfo(`Student kullanicisi urunlistesindeki ilk urunun "${expectedFirstProductText}" oldugunu dogrular`)


    // urun listesindeki ilk urunun locati
    // abi acaba urun sayisini consola yazdırma ve urun listesini consola yazdırma islemlerini nasıl yurutebilrim.
    // asagidaki locate selenium ile alındı.
    // şu locate codeGen ile alındı: (page.getByRole('main')).toContainText('Dental Care Room')
    const productCards= page.locator('//div[@class="wrapper"]');

    const productCount = await productCards.count();
    console.log(`Ürün sayısı: ${productCount}`);
    LoggerHelper.logInfo(`Ürün sayısı: ${productCount}`);

// 2) Ürün isimlerini konsola yazdır
    const productNames = await productCards.allInnerTexts();
    console.log('Ürün listesi:', productNames);
    productNames.forEach((name, i) => {
        console.log(`${i + 1}. ${name.trim()}`);
    });

});