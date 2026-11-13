import {test, expect} from '@playwright/test';
import {LoggerHelper} from "../../src/main/utils/LoggerHelper";
import {StudentPage} from "../../src/main/pages/StudentPage";
import {ClickUtils} from "../../src/main/utils/ClickUtils";


test('US001LylRegisterTest TC01',{tag:'@buBEnimTag'}, async ({page}) => {

    // Kullanici ana sayfaya gider
    const url = process.env.BASE_URL!;
    await page.goto(url);
    LoggerHelper.logInfo(`Student kullanicisi "${url}" adresine gider`)


    // Kullanici "Sign Up" butonunun gorunurlulugunu test eder
    await expect(page.getByRole('link', {name: ' Sign Up'})).toBeVisible();

    // Kullanici "Sign Up" butonuna tiklar
    await page.getByRole('link', {name: ' Sign Up'}).click();

    // Kullanici "User Name" kutusuna name girer
    const name = process.env.NAME!;
    //console.log(`Kullanici ismi "${name}" olustu`);
    LoggerHelper.logInfo(`Student kullanicisi "${name}"  nameBox kutusuna girdi`);
    await page.getByRole('textbox', {name: 'User Name'}).fill(name);

    // Kullanici "E-Mail Address" kutuusna mail adresi girer
    const timeStamp = new Date().toLocaleTimeString().replace(/:/g, '');
    const mail = name + timeStamp + '@loyalfirendcare.com';
    console.log(`Testte kullanılan mail adresi: "${mail}"`);
    LoggerHelper.logInfo(`Testte kullanılan mail adresi: "${mail}" girer`);
    await page.getByRole('textbox', {name: 'E-Mail Address'}).fill(mail);

    // Kullanici "Password box" kutuusna password yazar
    const password = process.env.STUDENT_PASSWORD!;
    await page.getByRole('textbox', {name: 'Password must be at least 8'}).fill(password);


    // Kullanici "Confirm Password" kutusuna password yazar
    await page.getByRole('textbox', {name: 'Confirm Password'}).fill(password);

    // Kullanici "Sign Up" butona tiklar
    await page.getByRole('button', {name: 'Sign Up'}).click();
});

test('US001LylRegisterTest TC02', async ({page}) => {

    // Kullanici ana sayfaya gider
    const url = process.env.BASE_URL!;
    await page.goto(url);
    LoggerHelper.logInfo(`Student kullanicisi "${url}" adresine gider`)

    // sayfa cagrisi
    const student = new StudentPage(page);

    // .env icinden isim ve password cagrisi yapildi.
    const name = process.env.NAME!;
    const password = process.env.STUDENT_PASSWORD!;

    await student.registerWithMethod(name, password);

});

test('US001LylRegisterTest TC03', async ({page}) => {

    // Kullanici ana sayfaya gider
    const url = process.env.BASE_URL!;
    await page.goto(url);
    LoggerHelper.logInfo(`Student kullanicisi "${url}" adresine gider`)


    // Kullanici "Sign Up" butonunun gorunurlulugunu test eder
    await expect(page.getByRole('link', {name: ' Sign Up'})).toBeVisible();

    // Kullanici "Sign Up" butonuna tiklar
    const signUpButton = page.getByRole('link', {name: ' Sign Up'});
    await signUpButton.click();


    // await page.getByRole('link', { name: ' Sign Up' }).click();

    // Kullanici "User Name" kutusuna name girer
    const name = process.env.NAME!;
    //console.log(`Kullanici ismi "${name}" olustu`);
    LoggerHelper.logInfo(`Student kullanicisi "${name}"  nameBox kutusuna girdi`);
    await page.getByRole('textbox', {name: 'User Name'}).fill(name);

    // Kullanici "E-Mail Address" kutuusna mail adresi girer
    const timeStamp = new Date().toLocaleTimeString().replace(/:/g, '');
    const mail = name + timeStamp + '@loyalfirendcare.com';
    console.log(`Testte kullanılan mail adresi: "${mail}"`);
    LoggerHelper.logInfo(`Testte kullanılan mail adresi: "${mail}" girer`);
    await page.getByRole('textbox', {name: 'E-Mail Address'}).fill(mail);

    // Kullanici "Password box" kutuusna password yazar
    const password = process.env.STUDENT_PASSWORD!;
    await page.getByRole('textbox', {name: 'Password must be at least 8'}).fill(password);


    // Kullanici "Confirm Password" kutusuna password yazar
    await page.getByRole('textbox', {name: 'Confirm Password'}).fill(password);

    // Kullanici "Sign Up" butona tiklar
    const registerFormSubmitButton = page.locator("//button[@type=\"submit\"]");
    await registerFormSubmitButton.click();
    //LoggerHelper.logInfo(`Student kullanicisi "${name}" ve "*****" degerleri ile hesap olusturdu ');
    LoggerHelper.logInfo(`Student kullanicisi "${name}" ve "*****" degerleri hesap olusturudu    `)

});
test('US001LylRegisterTest TC04', async ({ page }) => {

    const url = process.env.BASE_URL!;
    await page.goto(url);

    const student = new StudentPage(page);

    await student.getElementByName('register').click();

    const name = process.env.NAME!;
    await student.getElementByName('user name').fill(name);

    const timeStamp = new Date().toLocaleTimeString().replace(/:/g, '');
    const mail = name + timeStamp + '@loyalfirendcare.com';

    await student.getElementByName('email').fill(mail);


    const password = process.env.STUDENT_PASSWORD!;

    await student.getElementByName('password').fill(password);


    await student.getElementByName('confirm password').fill(password);

    await student.getElementByName('submit').click();

    LoggerHelper.logInfo(`Student kullanicisi "${name}" ve "${mail}" ile siteye kayit oldu`);

});



test('Medicines Testi', async ({ page }) => {
    await page.goto('https://qa.loyalfriendcare.com/en');
  //  await page.getByRole('link', { name: 'Medicines' }).click();

    const clickUtils= new ClickUtils(page);
   // await clickUtils.clickByName(page, 'Medicines');
    const student = new StudentPage(page);
     await clickUtils.smartClick(
           'Medicines',
           () => student.getElementByName('Medicines'),

        );
        await expect(page).toHaveURL(/Medicines/);

    await clickUtils.smartClick(
        'Vaccinations',
        () => student.getElementByName('Vaccinations'),

    );
    await expect(page).toHaveURL(/Pets/);

    // Popular Doctors


});

test('Popular Doctors Testi',{tag:'@popularDoctors'}, async ({ page }) => {
    await page.goto('https://qa.loyalfriendcare.com/en');
    //await page.getByRole('link', { name: 'Medicines' }).click();

    const clickUtils= new ClickUtils(page);
    // await clickUtils.clickByName(page, 'Medicines');
    const student = new StudentPage(page);
    await clickUtils.smartClick(
        'Popular Doctors',
        () => student.getElementByName('Popular Doctors'),

    );


    // Popular Doctors


});

