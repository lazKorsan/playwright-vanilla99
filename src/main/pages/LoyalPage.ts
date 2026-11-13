import {BasePage} from "./BasePage";
import {expect, Locator, Page} from "@playwright/test";
import {LoggerHelper} from "../utils/LoggerHelper";

export class LoyalPage extends BasePage {
    private elementMap: Record<string, Locator>;

    constructor(page: Page) {
        super(page);

        // Tek yer: Map. Field'lar yok!
        this.elementMap = {
            'register': page.getByRole('link', {name: ' Sign Up'}),
            'user name': page.getByRole('textbox', {name: 'User Name'}),
            'email': page.getByRole('textbox', {name: 'E-Mail Address'}),
            'password': page.getByRole('textbox', {name: 'Password must be at least 8'}),
            'confirm password': page.getByRole('textbox', {name: 'Confirm Password'}),
            'submit': page.getByRole('button', {name: 'Sign Up'}),
            'medicines': page.getByRole('textbox', {name: 'Medicines'}),
            'home': page.getByRole('link', {name: 'Home'}),
            'about us': page.getByRole('link', {name: 'About Us'}),
            'departments': page.getByRole('link', {name: 'Departments'}),
            'doctors': page.getByRole('link', {name: 'Doctors'}),
            'vaccinations': page.getByRole('link', {name: 'Vaccinations'}),
            'feline vaccine': page.getByRole('link', { name: ' Feline Panleukopenia Vaccine' })



        };
    }

    getElementByName(elementName: string): Locator {
        if (!elementName || !elementName.trim()) {
            throw new Error(`[HATA] Element adı boş olamaz! Geçerli değerler: ${Object.keys(this.elementMap).join(', ')}`);
        }

        const key = elementName.trim().replace(/:+$/, '').toLowerCase();
        const locator = this.elementMap[key];

        if (!locator) {
            throw new Error(
                `[HATA] '${elementName}' LoyalPage içinde bulunamadı! ` +
                `Geçerli değerler: ${Object.keys(this.elementMap).join(', ')}`
            );
        }
        return locator;
    }

    async registerWithMethod(name: string, password: string): Promise<void> {

        // Kullanici "Sign Up" butonunun gorunurlulugunu test eder
        await expect(this.page.getByRole('link', {name: ' Sign Up'})).toBeVisible();

        // Kullanici "Sign Up" butonuna tiklar
        await this.page.getByRole('link', {name: ' Sign Up'}).click();

        // Kullanici "User Name" kutusuna name girer
        //name = process.env.NAME!;
        //console.log(`Kullanici ismi "${name}" olustu`);
        LoggerHelper.logInfo(`Student kullanicisi "${name}"  nameBox kutusuna girdi`);
        await this.page.getByRole('textbox', {name: 'User Name'}).fill(name);

        // Kullanici "E-Mail Address" kutuusna mail adresi girer
        const timeStamp = new Date().toLocaleTimeString().replace(/:/g, '');
        const mail = name + timeStamp + '@loyalfirendcare.com';
        console.log(`Testte kullanılan mail adresi: "${mail}"`);
        LoggerHelper.logInfo(`Testte kullanılan mail adresi: "${mail}" girer`);
        await this.page.getByRole('textbox', {name: 'E-Mail Address'}).fill(mail);

        // Kullanici "Password box" kutuusna password yazar
        // password = process.env.STUDENT_PASSWORD!;
        await this.page.getByRole('textbox', {name: 'Password must be at least 8'}).fill(password);


        // Kullanici "Confirm Password" kutusuna password yazar
        await this.page.getByRole('textbox', {name: 'Confirm Password'}).fill(password);

        // Kullanici "Sign Up" butona tiklar
        await this.page.getByRole('button', {name: 'Sign Up'}).click();

    }

    async registerWithMethod2(
        page: Page,
        name: string,
        password: string
    ): Promise<void> {
        await expect(page.getByRole('link', { name: ' Sign Up' })).toBeVisible();
        await page.getByRole('link', { name: ' Sign Up' }).click();
        // ... page.xxx her yerde, this YOK
    }


}

export async function registerWithMethod(
    page: Page,
    name: string,
    password: string
): Promise<void> {
    await expect(page.getByRole('link', { name: ' Sign Up' })).toBeVisible();
    await page.getByRole('link', { name: ' Sign Up' }).click();

    LoggerHelper.logInfo(`Student kullanicisi "${name}" nameBox kutusuna girdi`);
    await page.getByRole('textbox', { name: 'User Name' }).fill(name);

    const timeStamp = new Date().toLocaleTimeString().replace(/:/g, '');
    const mail = name + timeStamp + '@loyalfirendcare.com';
    console.log(`Testte kullanılan mail adresi: "${mail}"`);
    LoggerHelper.logInfo(`Testte kullanılan mail adresi: "${mail}" girer`);
    await page.getByRole('textbox', { name: 'E-Mail Address' }).fill(mail);

    await page.getByRole('textbox', { name: 'Password must be at least 8' }).fill(password);
    await page.getByRole('textbox', { name: 'Confirm Password' }).fill(password);
    await page.getByRole('button', { name: 'Sign Up' }).click();
}