import {Given} from "@cucumber/cucumber";
import {LoggerHelper} from "../../main/utils/LoggerHelper";
import {StudentPage} from "../../main/pages/StudentPage";
import {ClickUtils} from "../../main/utils/ClickUtils";
import {SendKeysUtils} from "../../main/utils/SendKeysUtils";
import {ReusableMethods} from "../../main/utils/ReusableMethods";
import {InstuLearnPage} from "../../main/pages/InstuLearnPage";
import {expect} from "@playwright/test";
import {AccountStorageHelper} from "../../main/utils/AccountStorageHelper";


Given(/^Student kullanicisi "([^"]*)" sayfasina gider$/, async function (urlKey: string) {

    // .env dosyasından BASR_URL almak
    const url = process.env[urlKey]!;
    //  const url= process.env[BASE_URL]!;

    // anaSayfaya gitmek
    await this.page.goto(url);

    // loginfo
    LoggerHelper.logInfo(`Student kullanicisi "${url}" sayfasina gider`);


});
Given(/^Student kullanicisi "([^"]*)" butona tiklar$/, async function (elementName: string) {

    //studentPage cagrisi
    const studentPage = new StudentPage(this.page);

    // butona tiklama adimi
    await studentPage.getElementByName(elementName).click();

    //
    LoggerHelper.logInfo(` Kullanici "${elementName}" butonuna tiklar `);


});
Given(/^Student kullanicisi "([^"]*)" kutusuna "([^"]*)" yazarr$/, async function (boxName: string, textKey: string) {

    const valueToSend = process.env[textKey]!;
    const studentPage = new StudentPage(this.page);

    await studentPage.getElementByName(boxName).fill(valueToSend);

    //
    LoggerHelper.logInfo(`Kullanici "${boxName}" kutuusna "${valueToSend}" yazar `);


});
Given(/^Student kullanicisi "([^"]*)" ve "([^"]*)" degerleri ile siteye kayit olur$/, async function (nameKey: string, passwordKey: string) {

    const name = process.env[nameKey]!;
    const password = process.env[passwordKey]!;
    const studentPage = new StudentPage(this.page);

    await studentPage.registerWithMethod(name, password);


});
Given(/^Student kullanicisi "([^"]*)" kutusuna "([^"]*)" yazar$/, async function (boxName: string, text: string) {

    const sendKeyUtils = new SendKeysUtils(this.page);
    const studentPage = new StudentPage(this.page);

    await sendKeyUtils.smartSendKeys(
        boxName,
        text,
        () => studentPage.getElementByName(boxName)
    );
});
Given(/^Student kullanicisi "([^"]*)" butonuna tiklar$/, async function (buttonName: string) {
    const studentPage = new StudentPage(this.page);
    const clickUtils = new ClickUtils(this.page);

    await clickUtils.smartClick(
        buttonName,
        () => studentPage.getElementByName(buttonName)
    );

});
Given(/^Student kullanicisi "([^"]*)" sayfasinda oldugunu dogrular$/, async function (expectedUrl: string) {

    const methods = new ReusableMethods(this.page);

    await methods.verifyUrl(expectedUrl);

});
Given(/^Student kullanicisi arama sonucu urun sayisini consola yazdirir$/, async function () {

    const productCards = this.page.locator('//div[@class="wrapper"]');

    const productCount = await productCards.count();
    console.log(`Ürün sayısı: ${productCount}`);
    LoggerHelper.logInfo(`Ürün sayısı: ${productCount}`);

});
Given(/^Student kullanicisi arama sonucu urunleri consola yazdirir$/, async function () {

    const productCards = this.page.locator('//div[@class="wrapper"]');
    const productNames = await productCards.allInnerTexts();
    console.log('Ürün listesi:', productNames);
    productNames.forEach((products: string, i: number) => {
        console.log(`${i + 1}. ${products.trim()}`);
    });
});
