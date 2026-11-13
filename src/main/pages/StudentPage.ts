import {BasePage} from "./BasePage";
import {expect, Locator, Page} from "@playwright/test";
import {LoggerHelper} from "../utils/LoggerHelper";

export class StudentPage extends BasePage {
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
                `[HATA] '${elementName}' StudentPage içinde bulunamadı! ` +
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




}