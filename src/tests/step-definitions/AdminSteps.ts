import {Given} from "@cucumber/cucumber";
import {expect} from "@playwright/test";

import {AdminPage} from "../../main/pages/AdminPage";
import {LoggerHelper} from "../../main/utils/LoggerHelper";



const DES_STUDENT = 'Student';
const DES_INSTRUCTOR = 'Instructor';
const DES_ORGANIZATOR = 'Organizator';

Given(/^Admin kullanicisi "([^"]*)" sayfasina gider$/, async function (urlKey: string) {
    const page = this.page;
    const url = process.env[urlKey]!;

    await page.goto(url);

    await expect(page).toHaveURL(url);

    LoggerHelper.logInfo(`Admin kullanicisi "${url}" sayfasinda oldugunu dogrular`);


});
Given(/^Admin kullanicisi "([^"]*)" ve "([^"]*)" degerleri ile siteye kayt olur$/, async function (nameKey: string, passwordKey: string) {

    const page = this.page;
    const name= process.env[nameKey]!;
    const password= process.env[passwordKey]!;
    const admin= new AdminPage(page);

    admin.dynamicRegister(name, password);


});
Given(/^Admin kullanicisi role bagli buton gorunurlugu ile kayt olundugunu dogrular$/, async function () {

    const page=this.page;
    const role = this.role;

    if (role === DES_STUDENT) {
        await expect(page.getByRole('link', {name: 'Become Instructor'})).toBeVisible({timeout: 15000});
        LoggerHelper.logInfo('Student kaydi basarili: Become Instructor butonu gorundu.');
    } else {
        await expect(page.getByRole('link', {name: 'Create a new course'})).toBeVisible({timeout: 15000});
        LoggerHelper.logInfo(`${role} kaydi basarili: Create a new course butonu gorundu.`);
    }

});