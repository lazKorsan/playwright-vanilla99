import {test, expect} from "@playwright/test";
import {LoggerHelper} from "../../src/main/utils/LoggerHelper";
import {AccountStorageHelper} from "../../src/main/utils/AccountStorageHelper";
import {InstuLearnPage} from "../../src/main/pages/InstuLearnPage";

test('register from dynamitiquesier', async ({page}) => {

    await page.goto(process.env.INSTU_URL!);

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
    const desStudent = 'Student';
    const desinstructor = 'Instructor';
    const desorginaztor = 'Organizator';
    let role = '';

    if (determineUserTypeIndex <= 10) {

        role = desStudent;
        LoggerHelper.logInfo('Kullanici tipi :' + desStudent);
    } else if (determineUserTypeIndex <= 90) {

        role = desinstructor;
        await page.getByText('Instructor', {exact: true}).click();
        LoggerHelper.logInfo('Kullanici tipi :' + desinstructor);

    } else {

        role = desorginaztor;
        await page.getByText('Organization').click();
        LoggerHelper.logInfo('Kullanici tipi ' + desorginaztor);
    }


    const name = 'ahmet';
    const mail = `${name}.${role}.${mailID}@instuLearn.com`;
    LoggerHelper.logInfo(`Randomly olusan mail adresi: "${mail}"`);

    await page.getByRole('textbox', {name: 'Email :'}).fill(mail);

    await page.getByRole('textbox').nth(2).fill(name);


    const password = process.env.PASSWORD!
    await page.getByRole('textbox', {name: 'Password:', exact: true}).fill(password);

    await page.getByRole('textbox', {name: 'Retype Password:'}).fill(password);

    await page.getByRole('checkbox', {name: 'I agree with terms & rules'}).check({force: true});


    await page.getByRole('button', {name: 'Signup'}).click();


    //await expect(page).toHaveURL(/.*panel.*/, { timeout: 15000 });
    LoggerHelper.logInfo('Basarili bir sekilde Ana Sayfaya yonlendirildi.');


    if (role === desStudent) {

        await expect(page.getByRole('link', {name: 'Become Instructor'})).toBeVisible({timeout: 15000});
        LoggerHelper.logInfo('Student kaydi basarili: Become Instructor butonu gorundu.');
    } else {
        await expect(page.getByRole('link', {name: 'Create a new course'})).toBeVisible({timeout: 15000});
        LoggerHelper.logInfo(`${role} kaydi basarili: Create a new course butonu gorundu.`);
    }


    AccountStorageHelper.saveAccount(role, name, mail, password);







});

test('Register With mETHOD ', async ({page}) => {

    await page.goto(process.env.INSTU_URL!);

    const instuPage = new InstuLearnPage(page);
    const name = process.env.name!;
    const password = process.env.PASSWORD!;
    await instuPage.dynamicRegister(name, password);




});