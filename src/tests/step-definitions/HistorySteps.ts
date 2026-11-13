import {Given} from "@cucumber/cucumber";
import {InstuLearnPage} from "../../main/pages/InstuLearnPage";
import {LoggerHelper} from "../../main/utils/LoggerHelper";
import {expect} from "@playwright/test";
import {AccountStorageHelper} from "../../main/utils/AccountStorageHelper";

const DES_STUDENT = 'Student';
const DES_INSTRUCTOR = 'Instructor';
const DES_ORGANIZATOR = 'Organizator';

Given(/^History kullanicisi "([^"]*)" sayfasina gider$/, async function (urlKey: string) {

    const page=this.page;
    const url=process.env[urlKey]!;
    await page.goto(url);

});
Given(/^History kullanicisi "([^"]*)" ve "([^"]*)" degerleri ile site kaydi yapar$/,async function (nameKey: string, passwordKey: string) {
    const page=this.page;
    const name= process.env[nameKey]!;
    const password= process.env[passwordKey]!;
    const instuLearnPage= new InstuLearnPage(page);

    // ahmet..99142@instuLearn.com


    await page.getByRole('link', {name: 'Register'}).click();


    // 11111 ile 99999 arasi randomly sayi uretmeklik
    const minID = 11111;
    const maxID = 99999;
    const mailID = Math.floor(Math.random() * (maxID - minID + 1)) + minID;

    LoggerHelper.logInfo('mailID belirlemek için uretilen sayi: ' + mailID);

    const minType = 1;
    const maxType = 99;
    const determineUserTypeIndex = Math.floor(Math.random() * (maxType - minType + 1)) + minType;
    LoggerHelper.logInfo('Kullanici tipi belirlemek icin uretilen sayi: ' + determineUserTypeIndex);
    const DES_STUDENT = 'Student';
    const DES_INSTRUCTOR = 'Instructor';
    const DES_ORGANIZATOR = 'Organizator';
    let role = '';

    if (determineUserTypeIndex <= 10) {

        role = DES_STUDENT;
        LoggerHelper.logInfo('Kullanici tipi :' + DES_STUDENT);
    } else if (determineUserTypeIndex <= 90) {

        role = DES_INSTRUCTOR;
        await page.getByText('Instructor', {exact: true}).click();
        LoggerHelper.logInfo('Kullanici tipi :' + DES_INSTRUCTOR);

    } else {
        role = DES_ORGANIZATOR;

        await page.getByText('Organization').click();
        LoggerHelper.logInfo('Kullanici tipi ' + DES_ORGANIZATOR);
    }
    this.role = role;

    const mail = `${name}.${role}.${mailID}@instuLearn.com`;
    LoggerHelper.logInfo(`Randomly olusan mail adresi: "${mail}"`);

    await page.getByRole('textbox', {name: 'Email :'}).fill(mail);

    await page.getByRole('textbox').nth(2).fill(name);


    await page.getByRole('textbox', {name: 'Password:', exact: true}).fill(password);

    await page.getByRole('textbox', {name: 'Retype Password:'}).fill(password);

    await page.getByRole('checkbox', {name: 'I agree with terms & rules'}).check({force: true});


    await page.getByRole('button', {name: 'Signup'}).click();

    AccountStorageHelper.saveAccount(role, name, mail, password);

});
Given(/^History kullanicisi role bagli buton gorunurlugu ile kayt olundugunu dogrular$/, async function () {

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