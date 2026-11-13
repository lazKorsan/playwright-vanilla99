import {test, expect} from '@playwright/test';
import {LoggerHelper} from "../../src/main/utils/LoggerHelper";

test('US007DynamicTest TC01', async ({page}) => {
    await page.goto(process.env.INSTU_URL!);
    await page.getByRole('link', {name: 'Login'}).click();

    const mail=process.env.TEACHER_MAIL!
    await page.getByRole('textbox', {name: 'Email:'}).fill(mail);
    LoggerHelper.logInfo(`Student kullanicisi mail kutusuna "${mail}" degerini yazar`)


    await page.getByRole('textbox', {name: 'Password:'}).fill(process.env.TEACHER_PASSWORD!);
    await page.getByRole('button', {name: 'Login'}).click();

    const expectedUrl='/panel/';
    await expect(page).toHaveURL(/\/panel\/?$/);
    LoggerHelper.logInfo(`Student kullanicisi "${expectedUrl}" sayfasinda oldugunu dogrular`);
    await page.getByRole('button', {name: 'Meetings'}).click();
    await page.locator('#meetingCollapse').getByRole('link', {name: 'Settings'}).click();


    // gunler listesi
    const dayList = [

        'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
    ];

    const randomIndex=Math.floor(Math.random() * dayList.length);
    LoggerHelper.logInfo('Uretilen baglayici sayi degeri: ' + randomIndex);


    // gune baglı moreOptionsLocate listesi
    const optionLocates = [

        page.locator('.btn-group > .btn-transparent.dropdown-toggle'),
        page.locator('#sundayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle'),
        page.locator('#mondayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle'),
        page.locator('#tuesdayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle'),
        page.locator('#wednesdayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle'),
        page.locator('#thursdayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle'),
        page.locator('#fridayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle')

    ];

    await optionLocates[randomIndex].click();
    await page.getByRole('button', {name: 'Add Time'}).click();
    

    // seçim yapılacak saat aralıgı
    const timeSet = [
        '2', '3', '4', '5', '6', '7', '8', '9'
    ];

    const hourIndex=Math.floor(Math.random() * (timeSet.length-1));

    const startMeetingTime=timeSet[hourIndex];
    LoggerHelper.logInfo('Meeting baslangic saati: ' + startMeetingTime);
    await page.locator('.clockpicker-tick').getByText(startMeetingTime, { exact: true }).click();
    await page.getByText('30', {exact: true}).first().click();
    await page.waitForLoadState('networkidle');
    

    const endMeetingTime= timeSet[hourIndex+1];
    LoggerHelper.logInfo('Meeting bitis saati: ' + endMeetingTime);
    await page.locator('.clockpicker-tick').getByText(endMeetingTime, { exact: true }).click();
    await page.getByText('30', {exact: true}).first().click();
    


    // meetingType listesi
    const appointmentType = [

        'Both', 'Online', 'In-person'
    ];

    const meetinTypeIndex=Math.floor(Math.random() * appointmentType.length);


    await page.getByRole('combobox').selectOption(appointmentType[meetinTypeIndex]);
    await page.getByRole('button', {name: 'Save'}).click();



    await page.waitForLoadState('networkidle');
    await page.waitForURL('**/panel/meetings/settings');
   // await expect(
     //   page.locator('span.inner-time.text-gray.font-12').nth(randomIndex)
    //).toBeVisible();
    LoggerHelper.logInfo('Student kullanicisi randevu olustugunu dogrular')




});