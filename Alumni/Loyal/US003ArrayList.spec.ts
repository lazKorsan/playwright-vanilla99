import {test, expect} from '@playwright/test';

test('Orjinal locate sınıfı', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.getByRole('checkbox', {name: 'Sunday'}).check();
    await page.getByRole('checkbox', {name: 'Monday'}).check();
    await page.getByRole('checkbox', {name: 'Tuesday'}).check();
    await page.getByRole('checkbox', {name: 'Wednesday'}).check();
    await page.getByRole('checkbox', {name: 'Thursday'}).check();
    await page.getByRole('checkbox', {name: 'Friday'}).check();
    await page.getByRole('checkbox', {name: 'Saturday'}).check();
});


test('İllede ArrayLİst icinden elementi isme gore cekemek istiyorum dersen', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const dayLocators = [
        {name: 'sunday', locator: page.getByRole('checkbox', {name: 'Sunday'})},
        {name: 'monday', locator: page.getByRole('checkbox', {name: 'Monday'})},
        {name: 'tuesday', locator: page.getByRole('checkbox', {name: 'Tuesday'})},
        {name: 'wednesday', locator: page.getByRole('checkbox', {name: 'Wednesday'})},
        {name: 'thursday', locator: page.getByRole('checkbox', {name: 'Thursday'})},
        {name: 'friday', locator: page.getByRole('checkbox', {name: 'Friday'})},
        {name: 'saturday', locator: page.getByRole('checkbox', {name: 'Saturday'})},
    ];

    const fridayItem = dayLocators.find(d => d.name === 'friday');

    // find() undefined dönebilir → null kontrolü ekle
    if (!fridayItem) {
        throw new Error("'friday' bulunamadı!");
    }

    console.log(fridayItem.locator);
    await fridayItem.locator.check();
});

test('Obje içerisinden element cekemk belki kullanılabilir. ', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const dayLocators = {
        sunday: page.getByRole('checkbox', {name: 'Sunday'}),
        monday: page.getByRole('checkbox', {name: 'Monday'}),
        tuesday: page.getByRole('checkbox', {name: 'Tuesday'}),
        wednesday: page.getByRole('checkbox', {name: 'Wednesday'}),
        thursday: page.getByRole('checkbox', {name: 'Thursday'}),
        friday: page.getByRole('checkbox', {name: 'Friday'}),
        saturday: page.getByRole('checkbox', {name: 'Saturday'}),
    };

    // Direkt isimle erişim — find / null kontrolü gerekmez
    await dayLocators.friday.check();
});

test('ArrayListten index numarasi ile element cekeme. Cok kullanıssız', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');


    const dayLocaters = [

        page.getByRole('checkbox', {name: 'Sunday'}),
        page.getByRole('checkbox', {name: 'Monday'}),
        page.getByRole('checkbox', {name: 'Tuesday'}),
        page.getByRole('checkbox', {name: 'Wednesday'}),
        page.getByRole('checkbox', {name: 'Thursday'}),
        page.getByRole('checkbox', {name: 'Friday'}),
        page.getByRole('checkbox', {name: 'Saturday'}),
    ];

    for (const locate of dayLocaters) {

        await dayLocaters[0].check();


    }


});