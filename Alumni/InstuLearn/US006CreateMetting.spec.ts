import {test, expect} from '@playwright/test';
import {ReusableMethods} from "../../src/main/utils/ReusableMethods";
import {LoggerHelper} from "../../src/main/utils/LoggerHelper";

test('US034Create Meetings TC01', async ({page}) => {
    await page.goto('https://qa.instulearn.com/');
    await page.getByRole('link', {name: 'Login'}).click();

    await page.getByRole('textbox', {name: 'Email:'}).fill('ahmet486@InstuLearn.com');

    await page.getByRole('textbox', {name: 'Password:'}).fill('Query.2026!');
    await page.getByRole('button', {name: 'Login'}).click();
    await page.getByRole('button', {name: 'Meetings'}).click();
    await page.locator('#meetingCollapse').getByRole('link', {name: 'Settings'}).click();

    // todo locatlerin ayarlanmasi 


    const optionSelectors = [

        page.locator('.btn-group > .btn-transparent.dropdown-toggle').first(),
        page.locator('#sundayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle'),
        page.locator('#mondayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle'),
        page.locator('#tuesdayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle'),
        page.locator('#wednesdayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle'),
        page.locator('#thursdayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle'),
        page.locator('#fridayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle')

    ]

    const randomlyIndex = Math.floor(Math.random() * optionSelectors.length);
    const selectedOption = optionSelectors[randomlyIndex];
    LoggerHelper.logInfo('randomly uretilen sayi :' + randomlyIndex);

    const methods = new ReusableMethods(page);
    await methods.highlightElement(selectedOption);
    await page.waitForTimeout(2000);
    await selectedOption.click();

    await page.waitForTimeout(3000);

});


test('US006RandomlyExpectacular tc02', async ({page}) => {
    await page.goto('https://qa.instulearn.com/');
    await page.getByRole('link', {name: 'Login'}).click();

    await page.getByRole('textbox', {name: 'Email:'}).fill('ahmet486@InstuLearn.com');

    await page.getByRole('textbox', {name: 'Password:'}).fill('Query.2026!');
    await page.getByRole('button', {name: 'Login'}).click();
    await page.getByRole('button', {name: 'Meetings'}).click();
    await page.locator('#meetingCollapse').getByRole('link', {name: 'Settings'}).click();

    // locate islemleri 

    const optionSelectors = [

        page.locator('.btn-group > .btn-transparent.dropdown-toggle').first(),
        page.locator('#sundayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle'),
        page.locator('#mondayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle'),
        page.locator('#tuesdayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle'),
        page.locator('#wednesdayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle'),
        page.locator('#thursdayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle'),
        page.locator('#fridayTimeSheet > .text-right > .btn-group > .btn-transparent.dropdown-toggle')

    ];

    const randomIndex = Math.random() * optionSelectors.length;
    const numberOfInteger = Math.floor(randomIndex);
    const selectionOfOptions = optionSelectors[numberOfInteger];
    LoggerHelper.logInfo('randomly uretilen sayi :' + numberOfInteger);

    await page.waitForTimeout(2000);
    await selectionOfOptions.click();

    await page.getByRole('button', {name: 'Add Time'}).click();

    const modal = page.locator('.add-time-modal');
    await expect(modal).toBeVisible({timeout: 5000});
    LoggerHelper.logInfo('Modal alan gorunur hale geldi');


});

test('Undertanding Random Number tc02', async ({page}) => {

    //randomly sayı uretmekliklik
    const randomNumber = Math.random();
    LoggerHelper.logInfo('randomly uretilen sayi :' + randomNumber);

    const carpilanSayi = randomNumber * 3;
    LoggerHelper.logInfo('........' + carpilanSayi);

    // random sayıyı yuvarlamaklıklım
    const proccessNumber = Math.floor(carpilanSayi);
    LoggerHelper.logInfo('proccess geldi' + proccessNumber);


});
test('Undertanding Random Number tc03', async ({page}) => {

    const weekOfDays = [
        'pazartesi',
        'salı',
        'carsamba',
        'persembe',
        'cuma',
        'cumartesi',
        'pazar'
    ];

    const randomIndex = Math.floor(Math.random() * weekOfDays.length-1);
    LoggerHelper.logInfo('${randomIndex}--->' + randomIndex);

    const selectedDay = weekOfDays[randomIndex];
    LoggerHelper.logInfo('Secilen gun-->' + selectedDay);


    const ertesiGun = weekOfDays[randomIndex + 1];
    LoggerHelper.logInfo('Secilen gunden bir gun saonrasi' + ertesiGun)


});

test('Undertanding Random Number tc04 tag:@trunc' ,{tag:'@buBEnimTag'}, async ({page}) => {

    const weekOfDays = [
        'pazartesi',
        'salı',
        'carsamba',
        'persembe',
        'cuma',
        'cumartesi',
        'pazar'
    ];

    const randomIndex = Math.trunc(Math.random() * weekOfDays.length-1);
    LoggerHelper.logInfo('${randomIndex}--->: ' + randomIndex);

    const selectedDay = weekOfDays[randomIndex];
    LoggerHelper.logInfo('Secilen gun-->: ' + selectedDay);


    const ertesiGun = weekOfDays[randomIndex + 1];
    LoggerHelper.logInfo('Secilen gunden bir gun saonrasi-->: ' + ertesiGun)


});
test('Undertanding Random Number tc08 ' ,{tag:'@buBEnimTag'}, async ({page}) => {

    // 2D Array Tanımı: İçinde sayı dizileri barındıran bir dizi
    const takvim: number[][] = [];

// Pazartesi (Index 0): Ayın 2, 9, 16, 23, 30. günleri
    takvim[0] = [2, 9, 16, 23, 30];

// Salı (Index 1)
    takvim[1] = [3, 10, 17, 24];

// Çarşamba (Index 2)
    takvim[2] = [4, 11, 18, 25];

// Perşembe (Index 3)
    takvim[3] = [5, 12, 19, 26];

// Cuma (Index 4)
    takvim[4] = [6, 13, 20, 27];

// Cumartesi (Index 5)
    takvim[5] = [7, 14, 21, 28];

// Pazar (Index 6)
    takvim[6] = [1, 8, 15, 22, 29];

// ÖRNEK ERİŞİM:
// Pazartesi tarihlerini alma (Index 0):
    const pazartesiGunleri: number[] = takvim[0];
    console.log("Pazartesi günleri:", pazartesiGunleri); // [2, 9, 16, 23, 30]

// Ayın 2. Pazartesi günü (Index 0 -> eleman 1):
    const ikinciPazartesi: number = takvim[0][1];
    console.log("Ayın 2. Pazartesi günü:", ikinciPazartesi); // 9


});

test('Undertanding Random Number tc05 ' , async ({page}) => {

    type GunIsmi = "Pazartesi" | "Sali" | "Carsamba" | "Persembe" | "Cuma" | "Cumartesi" | "Pazar";

    const takvimMap: Record<GunIsmi, number[]> = {
        Pazartesi: [2, 9, 16, 23, 30],
        Sali: [3, 10, 17, 24],
        Carsamba: [4, 11, 18, 25],
        Persembe: [5, 12, 19, 26],
        Cuma: [6, 13, 20, 27],
        Cumartesi: [7, 14, 21, 28],
        Pazar: [1, 8, 15, 22, 29]
    };

// Doğrudan string key ile erişim:
    console.log(takvimMap["Pazartesi"]); // [2, 9, 16, 23, 30]


});
test('Undertanding Random Number tc07 ' , async ({page}) => {

    function ayinGunleriniGetir(yil: number, ayIndex: number): number[][] {
        // 7 gün için boş dizileri hazırlayalım (0: Pazartesi ... 6: Pazar)
        const takvim: number[][] = Array.from({ length: 7 }, () => []);

        // İlgili aydaki toplam gün sayısını bulma (ayIndex: 0 = Ocak, 10 = Kasım vs.)
        const toplamGun = new Date(yil, ayIndex + 1, 0).getDate();

        for (let gun = 1; gun <= toplamGun; gun++) {
            const tarih = new Date(yil, ayIndex, gun);

            // JS getDay(): 0 = Pazar, 1 = Pazartesi ... 6 = Cumartesi döner.
            // Pazartesi'yi 0. index yapmak için dönüştürüyoruz:
            const jsDay = tarih.getDay();
            const dayIndex = jsDay === 0 ? 6 : jsDay - 1;

            takvim[dayIndex].push(gun);
        }

        return takvim;
    }

// Örnek Kullanım: 2026 Kasım Ayı (Kasım için ayIndex = 10)
    const kasimTakvimi: number[][] = ayinGunleriniGetir(2026, 10);

    const gunIsimleri = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
    kasimTakvimi.forEach((gunler, index) => {
        console.log(`${gunIsimleri[index]} ->`, gunler);
    });


});



test('Undertanding Random Number tc11', async ({ page }) => {

    type GunIsmi = "Pazartesi" | "Sali" | "Carsamba" | "Persembe" | "Cuma" | "Cumartesi" | "Pazar";

    const takvimMap: Record<GunIsmi, number[]> = {
        Pazartesi: [2, 9, 16, 23, 30],
        Sali: [3, 10, 17, 24],
        Carsamba: [4, 11, 18, 25],
        Persembe: [5, 12, 19, 26],
        Cuma: [6, 13, 20, 27],
        Cumartesi: [7, 14, 21, 28],
        Pazar: [1, 8, 15, 22, 29]
    };

    // 1 ile 30 arasında rastgele bir gün seçelim (1 dahil, 30 dahil)
    const randomDayNumber = Math.floor(Math.random() * 30) + 1;

    let foundDay: GunIsmi | null = null;

    // takvimMap üzerindeki günlerde ve sayı dizilerinde arama yapalım
    for (const [gun, gunlerDizisi] of Object.entries(takvimMap) as [GunIsmi, number[]][]) {
        if (gunlerDizisi.includes(randomDayNumber)) {
            foundDay = gun;
            break;
        }
    }

    console.log(`Rastgele Seçilen Gün Sayısı: ${randomDayNumber}`);
    console.log(`Bu Sayının Denk Geldiği Gün: ${foundDay}`);

});



test('Undertanding Random Number tc12', async ({ page }) => {

    type GunIsmi = "Pazartesi" | "Sali" | "Carsamba" | "Persembe" | "Cuma" | "Cumartesi" | "Pazar";

    const takvimMap: Record<GunIsmi, number[]> = {
        Pazartesi: [2, 9, 16, 23, 30],
        Sali: [3, 10, 17, 24],
        Carsamba: [4, 11, 18, 25],
        Persembe: [5, 12, 19, 26],
        Cuma: [6, 13, 20, 27],
        Cumartesi: [7, 14, 21, 28],
        Pazar: [1, 8, 15, 22, 29]
    };

    // 1 ile 30 arasında rastgele bir gün seçelim
    const randomDayNumber = Math.floor(Math.random() * 30) + 1;

    let foundDay: GunIsmi | null = null;

    for (const [gun, gunlerDizisi] of Object.entries(takvimMap) as [GunIsmi, number[]][]) {
        if (gunlerDizisi.includes(randomDayNumber)) {
            foundDay = gun;
            break;
        }
    }

    console.log(`Rastgele Seçilen Gün Sayısı: ${randomDayNumber}`);
    console.log(`Bu Sayının Denk Geldiği Gün: ${foundDay}`);

    // --- Tarih Karşılaştırma Mantığı ---
    const today = new Date().getDate(); // Bugünün ayın kaçıncı günü olduğunu alır (Örn: 10)

    if (randomDayNumber > today) {
        const kalanGun = randomDayNumber - today;
        console.log(`Seçilen gün bugünden sonra. Kalan gün sayısı: ${kalanGun}`);
    } else if (randomDayNumber < today) {
        const gecenGun = today - randomDayNumber;
        console.log(`Seçilen gün bugünden önce. Geçen gün sayısı: ${gecenGun}`);
    } else {
        console.log(`Şanslısınız! Seçilen gün bugün (${today}. gün).`);
    }

});

