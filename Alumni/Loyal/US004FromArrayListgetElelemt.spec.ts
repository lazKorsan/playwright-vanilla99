import {test, expect} from '@playwright/test';
import ArrayPage from "../../src/main/pages/ArrayPage";
import {SelectUtils} from "../../src/main/utils/SelectUtils";
import {StudentPage} from "../../src/main/pages/StudentPage";
import {LoyalPage} from "../../src/main/pages/LoyalPage";
import {LoggerHelper} from "../../src/main/utils/LoggerHelper";

test('PageClassdan Array list ile element cekmeklik', {tag: '@arrayComforchaşner'}, async ({page}) => {

    await page.goto('https://qa.loyalfriendcare.com/en');

    const loyal = new LoyalPage(page);

    const vaccinationButton = page.locator('(//*[@href=\"https://qa.loyalfriendcare.com/Pets\"])[3]');
    const felliniButton = page.getByRole('link', {name: ' Feline Viral Rhinotracheitis'});

    //await vaccinationButton.focus();
    await vaccinationButton.hover();
    await felliniButton.click();
    await expect(page).toHaveURL(/feline-viral-rhinotracheitis/);


});

test('PageClassdan Array list ile element cekmeklik TC02', {tag: '@arrayComforchaner'}, async ({page}) => {

    await page.goto('https://qa.loyalfriendcare.com/en');

    const loyal = new LoyalPage(page);

    const vaccinationButton = page.locator('//*[@id="menu"]/ul/li[6]/span/a');
    const seceonChoice= page.locator('//*[@id="menu"]/ul/li[6]/ul/li[2]/a');
    const felliniButton = page.getByRole('link', {name: ' Feline Viral Rhinotracheitis'});


    //await page.locator('select#country-dropdown').selectOption({ index: 1 });
    await vaccinationButton.hover();
    await seceonChoice.click();

    await expect(page).toHaveURL(/feline-viral-rhinotracheitis/);


});