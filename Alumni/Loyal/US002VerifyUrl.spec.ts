import { test, expect } from '@playwright/test';

test('US024UpLoadFie',{tag:'@helloGarden'} ,async ({ page }) => {
    await page.goto(process.env.INSTU_URL!);
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email:' }).click();
    await page.getByRole('textbox', { name: 'Email:' }).fill(process.env.TEACHER_MAIL!);
    await page.getByRole('textbox', { name: 'Password:' }).click();
    await page.getByRole('textbox', { name: 'Password:' }).fill(process.env.TEACHER_PASSWORD!);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('button', { name: 'Courses' }).click();
    await page.locator('#webinarCollapse').getByRole('listitem').filter({ hasText: 'New' }).click();
    await page.locator('#webinarCollapse').getByRole('listitem').filter({ hasText: 'New' }).click();
    await page.getByRole('link', { name: 'New' }).click();
    await page.locator('select[name="type"]').selectOption('course');




    await page.getByRole('textbox').first().fill('upLoadFile');



    await page.getByRole('textbox', { name: '- 160 characters preferred' }).fill('palywright upLoaf File');
    await page.getByRole('textbox', { name: '360x250px preferred' }).click();
    await page.getByRole('textbox', { name: '360x250px preferred' }).fill('<==thumbnail==>');

    // todo thumbnail yukleme islemleri
    // yukleme alanına gecis
    await page.locator('.input-group-text').first().click();

    // page1 objesinin sabite atanmasi
    const page1Promise = page.waitForEvent('popup');

    // plus butona basılması
    await page.locator('.input-group-text').first().click();
    const page1 = await page1Promise;
    await page1.locator('.fab-button.fab-toggle').click();

    // upLoad butona basılması
    await page1.locator('#upload').click();

    //
    await page1.getByText('Choose File(s)').first().click();
    // @gemini hocam dosya yolu sanki çok uyugun değil gibi.
    await page1.locator('.dz-hidden-input').setInputFiles('C:\\Users\\user\\WebstormProjects\\playwright-vanilla99\\Documents\\assets\\math1.png');
    await page1.locator('#uploadModal').getByText('Close').click();
    await page1.locator('a').filter({ hasText: 'math1.png' }).click();
    await page1.locator('#actions').getByText('Confirm').click();



    //  todo await page.getByRole('textbox', { name: '1920x530px preferred' }).fill('<==CoverImage==>');


    const page2Promise = page.waitForEvent('popup');
    await page.locator('(//button[@class="input-group-text panel-file-manager"])[2]').last().dblclick();
    const page2 = await page2Promise;
    await page2.locator('.fab-button.fab-toggle').click();
    await page2.locator('#upload').click();


    //  todo bu kodu kapat
   // await page2.getByText('Choose File(s)').first().click();

    // @gemini hocam dosya yolu sanki çok uyugun değil gibi.
    await page2.locator('.dz-hidden-input').setInputFiles('C:\\Users\\user\\WebstormProjects\\playwright-vanilla99\\Documents\\assets\\math2.png');
    await page2.locator('#uploadModal').getByText('Close').click();
    await page2.locator('html').click();
    await page2.locator('a').filter({ hasText: 'math2.png' }).click();
    await page2.locator('#actions').getByText('Confirm').click();


    await page.getByText('Minimum 300 words. HTML and').click();
    await page.getByRole('textbox').nth(5).fill('descriptionContainer');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.goto('https://qa.instulearn.com/panel/webinars/4431/step/2');
});