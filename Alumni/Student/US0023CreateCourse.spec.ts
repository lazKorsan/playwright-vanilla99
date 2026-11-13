import {test, expect} from '@playwright/test';
import {LoggerHelper} from "../../src/main/utils/LoggerHelper";
// todo image yuklemek icin grekli import
import path from 'path';
import {RobotUtils} from "../../src/main/utils/RobotUtils";
import {InstuLearnPage} from "../../src/main/pages/InstuLearnPage";


test('Us0023CreateCourse Step1', async ({page}) => {

    // anaSayfay gitmek
    await page.goto('https://qa.instulearn.com/');

    // logibButton
    await page.getByRole('link', {name: 'Login'}).click();

    //EmailBox
    await page.getByRole('textbox', {name: 'Email:'}).fill('ahmet486@Loyal.com');

    // passwordBox
    await page.getByRole('textbox', {name: 'Password:'}).fill('Query.2026!');

    // submitButton
    await page.getByRole('button', {name: 'Login'}).click();

    // panel sayfasında oldugunu dogrular


    // HomeButton
    await page.getByRole('link', {name: 'Home'}).click();

    // CreateAnewCourseButton
    await page.getByRole('link', {name: 'Create a new course'}).click();

    // courseTipi secilmesi CourseType
    await page.locator('select[name="type"]').selectOption('course');

    // Title BOX
    await page.getByRole('textbox').first().fill('Biyoloji');

    // SEO META dESCİRPİTON
    await page.getByRole('textbox', {name: '- 160 characters preferred'}).fill('Biyoloji');

    // todo  Thumbnail alanı
    await page.locator('.input-group-text').first().click();
    LoggerHelper.logInfo('11111Image yukleme alanına tıklanamsi ');


    const page1Promise = page.waitForEvent('popup');
    LoggerHelper.logInfo('2222222Wimdow2 nin tanimlanmasi ');

    await page.locator('.input-group-text').first().click();

    const page1 = await page1Promise;

    // plus isaretine basilmasi
    await page1.locator('.fab-button.fab-toggle').click();
    LoggerHelper.logInfo('Plus işaretine basilmasi');

    // todo image yukleme islemleri
    await page1.locator('#upload').click();
    LoggerHelper.logInfo('Upload butona basilmasi');


    await page1.getByText('Choose File(s)').click();
    LoggerHelper.logInfo('ChooseFiles butona basilmsi ');


    // fixme buraya yol eklenecek . relative path ve robot utils eklenecek.
    // birinci fotograf yolu Documents/assets/math1.png
    // ikinci fotograf yolun Documents/assets/math2.png
    // tam yol
    // C:\Users\user\WebstormProjects\playwright-vanilla99\Documents\assets\math1.png
    // C:\Users\user\WebstormProjects\playwright-vanilla99\Documents\assets\math2.png
    const math1 = path.resolve(process.cwd(), 'C:\\Users\\user\\WebstormProjects\\playwright-vanilla99\\Documents\\assets\\math1.png');
    const math2 = path.resolve(process.cwd(), 'C:\\Users\\user\\WebstormProjects\\playwright-vanilla99\\Documents\\assets\\math2.png');


    await page1.locator('.dz-hidden-input').setInputFiles(math1);


    LoggerHelper.logInfo('İmage yuklenmesi');
    LoggerHelper.logInfo('İmage yuklenmesi');

    // close Button
    await page1.locator('#uploadModal').getByText('Close').click();

    // image secimi
    await page1.locator('a').filter({hasText: 'math1.png 08.11.2026 07:10:'}).click();

    // secimin kabul edilmesi
    await page1.locator('#actions').getByText('Confirm').click();

    // coverIaamge secimi
    await page.locator('html > .pace-done > #panel_app > dıv:nth-child(3) > .panel-content > dıv > #webinarForm > dıv:nth-child(7) > .col-12 > dıv:nth-child(6) > .input-group > .input-group-prepend > .input-group-text').last().click();
    const page2Promise = page.waitForEvent('popup');
    await page.locator('html > .pace-done > #panel_app > dıv:nth-child(3) > .panel-content > dıv > #webinarForm > dıv:nth-child(7) > .col-12 > dıv:nth-child(6) > .input-group > .input-group-prepend > .input-group-text').last().click();
    const page2 = await page2Promise;
    await page2.locator('a').filter({hasText: 'math2.png 08.11.2026 07:10:'}).click();

    // secimin kabul edilmesi
    await page2.locator('#actions').getByText('Confirm').click();

    // descirption Container
    await page.getByRole('textbox').nth(5).fill('biyoloji testi');

    // nextButton
    await page.getByRole('button', {name: 'Next'}).click();

    // dogrulama adımı
    await page.goto('https://qa.instulearn.com/panel/webinars/4430/step/2');
    await expect(page).toHaveURL(/2/);


});


test('Register denemesi', async ({page}) => {

    // anaSayfay gitmek
    await page.goto(process.env.INSTU_URL!);

    const instuPage = new InstuLearnPage(page);

    await instuPage.registerMethod(process.env.NAME!, process.env.TEACHER_PASSWORD!);

});


test('Login denemesi', async ({page}) => {

    // anaSayfay gitmek
    await page.goto(process.env.INSTU_URL!);

    const instuPage = new InstuLearnPage(page);

    await instuPage.loginWithMethod(process.env.TEACHER_MAIL!, process.env.TEACHER_PASSWORD!);


});






