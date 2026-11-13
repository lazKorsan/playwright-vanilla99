import {test, expect} from '@playwright/test';
import {LoggerHelper} from "../../src/main/utils/LoggerHelper";

test('US005RandomTest Meetings TC01', async ({page}) => {

    // anaSayfaya gider
    await page.goto(process.env.INSTU_URL!);

    // loginButton
    await page.getByRole('link', {name: 'Login'}).click();

    // emailBox
    await page.getByRole('textbox', {name: 'Email:'}).fill(process.env.TEACHER_MAIL!);

    // passwordBox
    await page.getByRole('textbox', {name: 'Password:'}).fill('Query.2026!');

    // loginButton
    await page.getByRole('button', {name: 'Login'}).click();

    // dashboard meetingsButton
    await page.getByRole('button', {name: 'Meetings'}).click();

    // dashboard/settingsbuton
    await expect(page.locator('#meetingCollapse').getByRole('link', {name: 'Settings'})).toBeVisible();
    await expect(page.locator('#meetingCollapse')).toContainText('Settings');

    // click settingsButton
    await page.locator('#meetingCollapse').getByRole('link', {name: 'Settings'}).click();

    const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    for (const day of days) {
        const dayLower = day.toLowerCase();

        // Gün başlığının görünür olduğunu doğrula
        await expect(page.getByText(day)).toBeVisible();

        // Saturday için özel locator, diğer günler için id tabanlı locator
        const dropdownLocator = dayLower === 'saturday'
            ? page.locator('.btn-group > .btn-transparent.dropdown-toggle').first()
            : page.locator(`#${dayLower}TimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle`);

        await dropdownLocator.click();
    }

    // monday uzerinde meetings olusturma islemleri

    // gunler icin AddtimeLocati
    const saturdayAddTimeLocate = page.locator('(//button[@class="add-time btn-transparent webinar-actions d-block mt-10"])[1]');
    await saturdayAddTimeLocate.click();

    // moreOptions/mondayButton
    // await page.locator('#mondayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle').click();
    // addTimeButton
    await page.getByRole('button', {name: 'Add Time'}).click();

    await page.getByText('× AM PM 03:00 AM To 04:00 AM').click();

    // pm locate
    await page.getByRole('checkbox', {name: 'PM'}).check();

    // pm uncheck
    await page.getByRole('checkbox', {name: 'PM'}).uncheck();

    // saat islemleri
    await page.getByText('2', {exact: true}).click();
    await page.getByText('30').click();
    await page.getByText('3', {exact: true}).click();
    await page.getByText('30', {exact: true}).click();

    // randevu turunun seçilmesi
    await page.getByRole('combobox').selectOption('online');

    // kısa acıklama
    await page.getByRole('textbox', {name: 'Description (Optional)'}).fill('ONLİNE MEETİNGS');

    // randevunun kayt edilmesi
    await page.getByRole('button', {name: 'Save'}).click();

    // gorunurluk testi
    await expect(page.getByText(':30AM-03:30AM - Online')).toBeVisible();
});


test('naviTest', async ({page}) => {
    await page.goto('https://qa.instulearn.com/');
    await expect(page.getByRole('link', {name: 'site logo'})).toBeVisible();
    await page.getByRole('link', {name: 'Login'}).click();
    await expect(page.getByRole('link', {name: 'site logo'})).toBeVisible();

    await page.getByRole('textbox', {name: 'Email:'}).fill('ahmet486@InstuLearn.com');

    await page.getByRole('textbox', {name: 'Password:'}).fill('Query.2026!');
    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page.getByRole('button', {name: '5'})).toBeVisible();
    await page.getByRole('button', {name: 'Meetings'}).click();
    await expect(page.getByRole('link', {name: 'My reservations'})).toBeVisible();
    await page.locator('#meetingCollapse').getByRole('link', {name: 'Settings'}).click();
    await expect(page.getByRole('button', {name: '5'})).toBeVisible();


    await page.locator('#mondayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle').click();

    await page.getByRole('button', {name: 'Add Time'}).click();
    await expect(page.getByRole('checkbox', {name: 'PM'})).toBeVisible();
    await page.getByText('2', {exact: true}).click();
    await page.waitForTimeout(2000);
    await page.getByText('30').click();
    await page.waitForTimeout(2000);
    await page.getByText('3', {exact: true}).click();
    await page.waitForTimeout(2000);
    await page.getByText('30', {exact: true}).click();
    await page.waitForTimeout(2000);
    await page.getByRole('combobox').selectOption('online');
    await page.getByRole('textbox', {name: 'Description (Optional)'}).click();
    await page.getByRole('textbox', {name: 'Description (Optional)'}).fill('online');
    await page.getByRole('button', {name: 'Save'}).click();
    await expect(page.locator('.remove-time > .feather')).toBeVisible();
});

test('TC01 - Rastgele Gün ve Saat Seçimi ile Randevu Oluşturma', async ({page}) => {
    // 1. Randevu/Timesheet Sayfasına Gidiş
    // await page.goto('/your-calendar-or-meeting-page-url');

    // ----------------------------------------------------
    // ADIM 1: Rastgele Gün Seçimi (Random Day Selection)
    // ----------------------------------------------------

    // Günlerin locator listesi (Cumartesi/İlk gün XPath ile, diğerleri ID ile)
    const days = [
        {name: 'Saturday', locator: page.locator('(//span[@class="font-weight-500 text-dark-blue d-block"])[1]')},
        {name: 'Sunday', locator: page.locator('#sundayTimeSheet')},
        {name: 'Monday', locator: page.locator('#mondayTimeSheet')},
        {name: 'Tuesday', locator: page.locator('#tuesdayTimeSheet')},
        {name: 'Wednesday', locator: page.locator('#wednesdayTimeSheet')},
        {name: 'Thursday', locator: page.locator('#thursdayTimeSheet')},
        {name: 'Friday', locator: page.locator('#fridayTimeSheet')}
    ];

    // 0 ile 6 arasında rastgele bir gün seçimi
    const randomDayIndex = Math.floor(Math.random() * days.length);
    const selectedDay = days[randomDayIndex];

    console.log(`Seçilen Gün: ${selectedDay.name}`);

    // Seçilen gün alanının ekranda göründüğünü doğrula
    await expect(selectedDay.locator).toBeVisible();

    // Seçilen güne ait dropdown / aksiyon butonuna tıkla
    if (randomDayIndex === 0) {
        // Saturday / İlk gün için tanımlı özel XPath butonuna doğrudan tıkla
        await selectedDay.locator.click();
    } else {
        // Diğer günler için container içindeki dropdown toggle butonuna tıkla
        await selectedDay.locator.locator('.btn-group > .btn-transparent.dropdown-toggle').click();
    }

    // Dropdown açıldıktan sonra "Add Time" (veya ilgili aksiyon) butonuna tıkla
    // Eğer buton gün container'ı içindeyse strict mode takılmaması için scoped locator kullanıyoruz:
    if (randomDayIndex === 0) {
        await page.getByRole('button', {name: 'Add Time'}).first().click();
    } else {
        await selectedDay.locator.getByRole('button', {name: 'Add Time'}).click();
    }

    // ----------------------------------------------------
    // ADIM 2: Rastgele Saat Seçimi (2 - 10 Arasından Random)
    // ----------------------------------------------------

    // Saat seçeneklerinin listelendiği pop-up / modal / dropdown alanını bekle
    // (Burada sayfanızdaki saat butonlarının genel role/locator yapısı kullanılır)
    const timeSlots = page.locator('.time-slot-item, [role="option"], .select2-results__option');
    // NOT: Eğer saatler standart bir açılır listedeyse locator'ı sayfanıza göre güncelleyin.

    await expect(timeSlots.first()).toBeVisible();
    const totalSlots = await timeSlots.count();

    if (totalSlots > 0) {
        // İstenen aralık: 2. eleman ile 10. eleman arası (0-based index için 2 ile min(10, total-1))
        const minIndex = 2; // 3. sıradaki saat
        const maxIndex = Math.min(10, totalSlots - 1); // 10. sıradaki saat (veya liste sınırına kadar)

        // minIndex ve maxIndex arasında rastgele bir index belirle
        const randomTimeIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;

        console.log(`Seçilen Saat Indeksi: ${randomTimeIndex}`);

        // Belirlenen rastgele saat seçeneğine tıkla
        await timeSlots.nth(randomTimeIndex).click();
    }

    // ----------------------------------------------------
    // ADIM 3: İnsan Eli İle Yapılması Gereken Manuel/Dinamik İşlemler
    // ----------------------------------------------------

    // 1. Randevu başlığı veya açıklama girilmesi:
    // await page.getByPlaceholder('Meeting Title').fill('Otomatik Test Toplantısı');

    // 2. Katılımcı veya konu seçimi yapılması:
    // await page.locator('#meetingTopic').selectOption('General');

    // 3. Formun kaydedilmesi veya onaylanması:
    // await page.getByRole('button', { name: 'Save' }).click();

    // 4. Randevunun başarılı bir şekilde oluştuğunun doğrulanması (Assertion):
    // await expect(page.getByText('Successfully created')).toBeVisible();
});

test('US005RandomTest Meetings TC03', async ({page}) => {

    // anaSayfaya gider
    await page.goto(process.env.INSTU_URL!);

    // loginButton
    await page.getByRole('link', {name: 'Login'}).click();

    // emailBox
    await page.getByRole('textbox', {name: 'Email:'}).fill(process.env.TEACHER_MAIL!);

    // passwordBox
    await page.getByRole('textbox', {name: 'Password:'}).fill('Query.2026!');

    // loginButton
    await page.getByRole('button', {name: 'Login'}).click();

    // dashboard meetingsButton
    await page.getByRole('button', {name: 'Meetings'}).click();

    // dashboard/settingsbuton
    await expect(page.locator('#meetingCollapse').getByRole('link', {name: 'Settings'})).toBeVisible();
    await expect(page.locator('#meetingCollapse')).toContainText('Settings');

    // click settingsButton
    await page.locator('#meetingCollapse').getByRole('link', {name: 'Settings'}).click();

    const daySelectors = [
        {name: 'Saturday', locator: page.locator('.btn-group > .btn-transparent.dropdown-toggle').first()},
        {
            name: 'Sunday',
            locator: page.locator('#sundayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle')
        },
        {
            name: 'Monday',
            locator: page.locator('#mondayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle')
        },
        {
            name: 'Tuesday',
            locator: page.locator('#tuesdayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle')
        },
        {
            name: 'Wednesday',
            locator: page.locator('#wednesdayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle')
        },
        {
            name: 'Thursday',
            locator: page.locator('#thursdayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle')
        },
        {
            name: 'Friday',
            locator: page.locator('#fridayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle')
        }
    ];

    // 2. Listeden rastgele bir gün seç
    const randomIndex = Math.floor(Math.random() * daySelectors.length);
    const selectedDay = daySelectors[randomIndex];

    console.log(`Seçilen Gün: ${selectedDay.name}`);

    await selectedDay.locator.click();

    // Add Time butonuna tıkla
    await page.getByRole('button', {name: 'Add Time'}).click();


    await page.getByText('2', {exact: true}).click();
    await page.waitForTimeout(2000);
    await page.getByText('30').click();
    await page.waitForTimeout(2000);
    await page.getByText('3', {exact: true}).click();
    await page.waitForTimeout(2000);
    await page.getByText('30', {exact: true}).click();
    await page.waitForTimeout(2000);

    // randevu turunun seçilmesi
    await page.getByRole('combobox').selectOption('online');
    LoggerHelper.logInfo('Meeting turu secildi.');

    // kısa acıklama
    await page.getByRole('textbox', {name: 'Description (Optional)'}).fill('ONLİNE MEETİNGS');
    LoggerHelper.logInfo('Meeting aciklamsi');

    // randevunun kayt edilmesi
    await page.getByRole('button', {name: 'Save'}).click();

    // gorunurluk testi
    await expect(page.getByText(':30AM-03:30AM - Online')).toBeVisible();
});
test('US005RandomTest Meetings TC04', async ({page}) => {

    // anaSayfaya gider
    await page.goto(process.env.INSTU_URL!);

    // loginButton
    await page.getByRole('link', {name: 'Login'}).click();

    // emailBox
    await page.getByRole('textbox', {name: 'Email:'}).fill(process.env.TEACHER_MAIL!);

    // passwordBox
    await page.getByRole('textbox', {name: 'Password:'}).fill('Query.2026!');

    // loginButton
    await page.getByRole('button', {name: 'Login'}).click();

    // dashboard meetingsButton
    await page.getByRole('button', {name: 'Meetings'}).click();

    // dashboard/settingsbuton
    await expect(page.locator('#meetingCollapse').getByRole('link', {name: 'Settings'})).toBeVisible();
    await expect(page.locator('#meetingCollapse')).toContainText('Settings');

    // click settingsButton
    await page.locator('#meetingCollapse').getByRole('link', {name: 'Settings'}).click();

    const daySelectors = [
        {name: 'Saturday', locator: page.locator('.btn-group > .btn-transparent.dropdown-toggle').first()},
        {
            name: 'Sunday',
            locator: page.locator('#sundayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle')
        },
        {
            name: 'Monday',
            locator: page.locator('#mondayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle')
        },
        {
            name: 'Tuesday',
            locator: page.locator('#tuesdayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle')
        },
        {
            name: 'Wednesday',
            locator: page.locator('#wednesdayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle')
        },
        {
            name: 'Thursday',
            locator: page.locator('#thursdayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle')
        },
        {
            name: 'Friday',
            locator: page.locator('#fridayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle')
        }
    ];

    // 2. Listeden rastgele bir gün seç
    const randomIndex = Math.floor(Math.random() * daySelectors.length);
    const selectedDay = daySelectors[randomIndex];

    console.log(`Seçilen Gün: ${selectedDay.name}`);

    await selectedDay.locator.click();

    // Add Time butonuna tıkla
    await page.getByRole('button', {name: 'Add Time'}).click();

    const modal = page.locator('.add-time-modal');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // todo Randomly saat secim islemleri


    const hours = ['2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const randomhoursIndex = Math.floor(Math.random() * (hours.length - 1));
    const startMeetingTime = hours[randomhoursIndex];
    const endMeetingTime = hours[randomhoursIndex + 1];

    await page.getByText(startMeetingTime, {exact: true}).first().click();
    await page.waitForTimeout(2000);

    await page.getByText('30', {exact: true}).first().click();
    await page.waitForTimeout(2000);

    await page.getByText(endMeetingTime, {exact: true}).first().click();
    await page.waitForTimeout(2000);

    await page.getByText('30', {exact: true}).first().click();
    await page.waitForTimeout(2000);


    // randevu turunun seçilmesi
    await page.getByRole('combobox').selectOption('online');
    LoggerHelper.logInfo('Meeting turu secildi.');

    // kısa acıklama
    await page.getByRole('textbox', {name: 'Description (Optional)'}).fill('ONLİNE MEETİNGS');
    LoggerHelper.logInfo('Meeting aciklamsi');

    // randevunun kayt edilmesi
    await page.getByRole('button', {name: 'Save'}).click();

    // gorunurluk testi
    await page.waitForTimeout(2000);


    const visibleData = [
        {
            day: 'Saturday',
            locater: '(//span[@class="inner-time text-gray font-12"])[1]'
        },
        {
            day: 'Sunday',
            locater: '(//span[@class="inner-time text-gray font-12"])[2]'
        },
        {
            day: 'Monday',

            locater: '(//span[@class="inner-time text-gray font-12"])[3]'
        },
        {
            day: 'Tuesday',
            locater: '(//span[@class="inner-time text-gray font-12"])[4]'
        },

        {
            day: 'Wednesday',
            locater: '(//span[@class="inner-time text-gray font-12"])[5]'
        },
        {
            day: 'Thursday',
            locater: '(//span[@class="inner-time text-gray font-12"])[6]'
        },
        {
            day: 'Friday',
            locater: '(//span[@class="inner-time text-gray font-12"])[7]'
        },

    ];

    let isMeetingCreated = false;
    let createdDay = '';

    for (const visible of visibleData) {
        const timeLocator = page.locator(visible.locater);

        // 1. Eleman görünür mü?
        const isVisible = await timeLocator.isVisible();

        if (isVisible) {
            // 2. Elemanın içi boş mu yoksa saat bilgisi yazıyor mu?
            const textContent = await timeLocator.textContent();

            // Eğer içinde ":" veya saat metni (AM/PM) varsa gerçekten randevu oluşmuştur
            if (textContent && textContent.trim().length > 0) {
                isMeetingCreated = true;
                createdDay = visible.day;
                LoggerHelper.logInfo(`Randevu bulundu! Gün: ${visible.day} | İçerik: ${textContent.trim()}`);
                break; // Gerçek randevuyu bulunca döngüden çık
            }
        }
    }

    expect(isMeetingCreated, 'HATA: Hiçbir günde randevu bulunamadı!').toBeTruthy();
    LoggerHelper.logInfo(`TEST BAŞARILI: ${createdDay} günü için randevu başarıyla doğrulandı.`);


});