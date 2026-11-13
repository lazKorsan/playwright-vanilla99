import { test, expect } from '@playwright/test';
import path from "path";
import {InstuLearnPage} from "../../src/main/pages/InstuLearnPage";

test('US004UploadFile TC01', async ({ page }) => {

    // student kullanicisi ana sayfaya gider
    await page.goto(process.env.INSTU_URL!);


    // login buton
    await page.getByRole('link', { name: 'Login' }).click();

    // emailBox
    await page.getByRole('textbox', { name: 'Email:' }).fill(process.env.TEACHER_MAIL!);

    // passwordBox
    await page.getByRole('textbox', { name: 'Password:' }).fill(process.env.TEACHER_PASSWORD!);

    // loginButton
    await page.getByRole('button', { name: 'Login' }).click();

    // panel sayfasina gelir
    await expect(page).toHaveURL(/panel/);

    // todo step1 baslangici
    // dashboard  courses buton
    await page.getByRole('button', { name: 'Courses' }).click();

    // dashboard new buton
    await page.getByRole('link', { name: 'New' }).click();

    // coursType dropDown menuden secim
    await page.locator('select[name="type"]').selectOption('course');

    // titleBox
    await page.getByRole('textbox').first().fill('upLoad File');

    // SEO Meta Desciption
    await page.getByRole('textbox', { name: '- 160 characters preferred' }).fill('playwright');



    // todo thumbnail yuklem ve secme await page.getByRole('textbox', { name: '360x250px preferred' }).fill('<==thumbnail==>');
    // yukleme baslam islemleri
    await page.locator('//button[@data-input="thumbnail"]').first().click();

    // laravel gecis ve tanımlama
    const page1Promise = page.waitForEvent('popup');
    await page.locator('.input-group-text').first().click();
    const page1 = await page1Promise;

    // plus isaretine tıklam
    await page1.locator('.fab-button.fab-toggle').click();

    // upLoad butona tıklama
    await page1.locator('#upload').click();

    // todo *** dosya secim islemleri
    await page1.getByText('Choose File(s)').click();

    // fixme  dosya seciminin yapilmasi
    const math1Path=path.join(process.cwd(), 'Documents', 'assets', 'math1.png');
    await page1.locator('.dz-hidden-input').setInputFiles(math1Path);

    // yukleme sonrası CloseButton tıklama
    await page1.locator('#uploadModal').getByText('Close').click();

    // png nin secilmesi
    await page1.locator('a').filter({ hasText: 'math1.png' }).click();

    // png secim islemi
    await page1.locator('#actions').getByText('Confirm').click();



    // todo coverImage yukleme ve secim islemleri await page.getByRole('textbox', { name: '1920x530px preferred' }).fill('<==coverImage==>');
    // laravel alanın acilmasi ve tanımlanmasi
    const page2Promise = page.waitForEvent('popup');
    await page.locator('//button[@data-input="cover_image"]').last().dblclick();
    const page2 = await page2Promise;

    // plus isareti
    await page2.locator('.fab-button.fab-toggle').click();

    // uploadButton
    await page2.locator('#upload').click();

    // todo *** dosya secim isleminin baslamasi
    await page2.getByText('Choose File(s)').click();
    // png nin yuklenmesi
    const math2Path=path.join(process.cwd(), 'Documents', 'assets', 'math2.png');
    await page2.locator('.dz-hidden-input').setInputFiles(math2Path);

    // close buton a basmak
    await page2.locator('#uploadModal').getByText('Close').click();

    // png secimi
    await page2.locator('a').filter({ hasText: 'math2.png' }).click();

    // secimin dogrulanmasi
    await page2.locator('#actions').getByText('Confirm').click();


    await page.getByText('Minimum 300 words. HTML and').click();
    await page.getByRole('textbox').nth(5).fill('upLoad islemleri tamamland');

    // nextbUTTON
    await page.getByRole('button', { name: 'Next' }).click();

    // STEP2 baslangici
    await page.goto('https://qa.instulearn.com/panel/webinars/4435/step/2');
    await expect(page).toHaveURL(/2/);



});

test('US004UploadFile TC09', async ({ page }) => {

    // student kullanicisi ana sayfaya gider
    await page.goto(process.env.INSTU_URL!);


    // login buton
    await page.getByRole('link', { name: 'Login' }).click();

    // emailBox
    await page.getByRole('textbox', { name: 'Email:' }).fill(process.env.TEACHER_MAIL!);

    // passwordBox
    await page.getByRole('textbox', { name: 'Password:' }).fill(process.env.TEACHER_PASSWORD!);

    // loginButton
    await page.getByRole('button', { name: 'Login' }).click();

    // panel sayfasina gelir
    await expect(page).toHaveURL(/panel/);

    // todo step1 baslangici
    // dashboard  courses buton
    await page.getByRole('button', { name: 'Courses' }).click();

    // dashboard new buton
    await page.getByRole('link', { name: 'New' }).click();

    // coursType dropDown menuden secim
    await page.locator('select[name="type"]').selectOption('course');

    // titleBox
    await page.getByRole('textbox').first().fill('upLoad File');

    // SEO Meta Desciption
    await page.getByRole('textbox', { name: '- 160 characters preferred' }).fill('playwright');



    // todo thumbnail yuklem ve secme await page.getByRole('textbox', { name: '360x250px preferred' }).fill('<==thumbnail==>');
    // yukleme baslam islemleri
    await page.locator('//button[@data-input="thumbnail"]').first().click();

    // laravel gecis ve tanımlama
    const page1Promise = page.waitForEvent('popup');
    await page.locator('.input-group-text').first().click();
    const page1 = await page1Promise;

    // plus isaretine tıklam
    await page1.locator('.fab-button.fab-toggle').click();

    // upLoad butona tıklama
    await page1.locator('#upload').click();

    // todo *** dosya secim islemleri
    await page1.getByText('Choose File(s)').click();

    // fixme  dosya seciminin yapilmasi
    const math1Path=path.join(process.cwd(), 'Documents', 'assets', 'math1.png');
    await page1.locator('.dz-hidden-input').setInputFiles(math1Path);

    // yukleme sonrası CloseButton tıklama
    await page1.locator('#uploadModal').getByText('Close').click();

    // png nin secilmesi
    await page1.locator('a').filter({ hasText: 'math1.png' }).click();

    // png secim islemi
    await page1.locator('#actions').getByText('Confirm').click();



    // todo coverImage yukleme ve secim islemleri await page.getByRole('textbox', { name: '1920x530px preferred' }).fill('<==coverImage==>');
    // laravel alanın acilmasi ve tanımlanmasi
    const page2Promise = page.waitForEvent('popup');
    await page.locator('//button[@data-input="cover_image"]').last().dblclick();
    const page2 = await page2Promise;

    // plus isareti
    await page2.locator('.fab-button.fab-toggle').click();

    // uploadButton
    await page2.locator('#upload').click();

    // todo *** dosya secim isleminin baslamasi
    await page2.getByText('Choose File(s)').click();
    // png nin yuklenmesi
    const math2Path=path.join(process.cwd(), 'Documents', 'assets', 'math2.png');
    await page2.locator('.dz-hidden-input').setInputFiles(math2Path);

    // close buton a basmak
    await page2.locator('#uploadModal').getByText('Close').click();

    // png secimi
    await page2.locator('a').filter({ hasText: 'math2.png' }).click();

    // secimin dogrulanmasi
    await page2.locator('#actions').getByText('Confirm').click();


    await page.getByText('Minimum 300 words. HTML and').click();
    await page.getByRole('textbox').nth(5).fill('upLoad islemleri tamamland');

    // nextbUTTON
    await page.getByRole('button', { name: 'Next' }).click();

    // STEP2 baslangici
    await page.goto('https://qa.instulearn.com/panel/webinars/4435/step/2');
    await expect(page).toHaveURL(/2/);



});

test('precondition Register hazirlik01', async ({ page }) => {

    await page.goto(process.env.INSTU_URL!);

    const instuLearn= new InstuLearnPage(page);
    await instuLearn.registerMethod(process.env.NAME!, process.env.PASSWORD!);

    const createAnewCourseButton= page.locator('(//a[@class="d-none d-lg-flex btn btn-sm btn-primary nav-start-a-live-btn"])[1]');
    await createAnewCourseButton.click();

    // coursType dropDown menuden secim
    await page.locator('select[name="type"]').selectOption('course');

    // titleBox
    await page.getByRole('textbox').first().fill('upLoad File');

    // SEO Meta Desciption
    await page.getByRole('textbox', { name: '- 160 characters preferred' }).fill('playwright');



    // todo thumbnail yuklem ve secme await page.getByRole('textbox', { name: '360x250px preferred' }).fill('<==thumbnail==>');
    // yukleme baslam islemleri
    await page.locator('//button[@data-input="thumbnail"]').first().click();

    // laravel gecis ve tanımlama
    const page1Promise = page.waitForEvent('popup');
    await page.locator('.input-group-text').first().click();
    const page1 = await page1Promise;

    // plus isaretine tıklam
    await page1.locator('.fab-button.fab-toggle').click();

    // upLoad butona tıklama
    await page1.locator('#upload').click();

    // todo *** dosya secim islemleri
    await page1.getByText('Choose File(s)').click();

    // fixme  dosya seciminin yapilmasi
    const math1Path=path.join(process.cwd(), 'Documents', 'assets', 'math1.png');
    await page1.locator('.dz-hidden-input').setInputFiles(math1Path);

    // yukleme sonrası CloseButton tıklama
    await page1.locator('#uploadModal').getByText('Close').click();

    // png nin secilmesi
    await page1.locator('a').filter({ hasText: 'math1.png' }).click();

    // png secim islemi
    await page1.locator('#actions').getByText('Confirm').click();



    // todo coverImage yukleme ve secim islemleri await page.getByRole('textbox', { name: '1920x530px preferred' }).fill('<==coverImage==>');
    // laravel alanın acilmasi ve tanımlanmasi
    const page2Promise = page.waitForEvent('popup');
    await page.locator('//button[@data-input="cover_image"]').last().dblclick();
    const page2 = await page2Promise;

    // plus isareti
    await page2.locator('.fab-button.fab-toggle').click();

    // uploadButton
    await page2.locator('#upload').click();

    // todo *** dosya secim isleminin baslamasi
    await page2.getByText('Choose File(s)').click();
    // png nin yuklenmesi
    const math2Path=path.join(process.cwd(), 'Documents', 'assets', 'math2.png');
    await page2.locator('.dz-hidden-input').setInputFiles(math2Path);

    // close buton a basmak
    await page2.locator('#uploadModal').getByText('Close').click();

    // png secimi
    await page2.locator('a').filter({ hasText: 'math2.png' }).click();

    // secimin dogrulanmasi
    await page2.locator('#actions').getByText('Confirm').click();


    await page.getByText('Minimum 300 words. HTML and').click();
    await page.getByRole('textbox').nth(5).fill('upLoad islemleri tamamland');

    // nextbUTTON
    await page.getByRole('button', { name: 'Next' }).click();

    // STEP2 baslangici
   // await page.goto('https://qa.instulearn.com/panel/webinars/4435/step/2');
    await expect(page).toHaveURL(/2/);
})

test('Basci Informaiton formunun doldurulmasi ', async ({ page }) => {

    await page.goto(process.env.INSTU_URL!);

    const instuLearn= new InstuLearnPage(page);
    await instuLearn.registerMethod(process.env.NAME!, process.env.PASSWORD!);

    await instuLearn.basicInformationForm();

    /*
      * Instu kullanicisi "INSTU_URL" sayfasina gider
      * Instu kullanicisi "NAME" ve "PASWORD" degerleri ile kayt olur
      * Instu kullanicisi Basic Information Formunu doldurur
     */




})

































