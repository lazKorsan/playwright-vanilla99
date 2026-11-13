import {BasePage} from "./BasePage";
import {expect, Locator, Page} from "@playwright/test";
import {LoggerHelper} from "../utils/LoggerHelper";
import {AccountStorageHelper} from "../utils/AccountStorageHelper";

export class AdminPage extends BasePage {
    private elementMap: Record<string, Locator>;

    constructor(page: Page) {
        super(page);

        // Tek yer: Map. Field'lar yok!
        this.elementMap = {
            'login': page.getByRole('link', {name: 'Login'}),
            'register': page.locator('a[href="/register"]')

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
                `[HATA] '${elementName}' AdminPage içinde bulunamadı! ` +
                `Geçerli değerler: ${Object.keys(this.elementMap).join(', ')}`
            );
        }
        return locator;
    }

    async dynamicRegister(name: string, password: string) {

        const page = this.page;
        await page.getByRole('link', {name: 'Register'}).click();


        // 11111 ile 99999 arasi randomly sayi uretmeklik
        const minID = 11111;
        const maxID = 99999;
        const mailID = Math.floor(Math.random() * (maxID - minID + 1)) + minID;

        LoggerHelper.logInfo('mailID belirlemek için uretilen sayi: ' + mailID);

        const minType = 1;
        const maxType = 99;
        const determineUserTypeIndex = Math.floor(Math.random() * (maxType - minType + 1)) + minType;
        LoggerHelper.logInfo('Kullanici tipi belirlemek icin uretilen sayi: ' + determineUserTypeIndex);
        const desStudent = 'Student';
        const desinstructor = 'Instructor';
        const desorginaztor = 'Organizator';
        let role = '';

        if (determineUserTypeIndex <= 10) {

            role = desStudent;
            LoggerHelper.logInfo('Kullanici tipi :' + desStudent);
        } else if (determineUserTypeIndex <= 90) {

            role = desinstructor;
            await page.getByText('Instructor', {exact: true}).click();
            LoggerHelper.logInfo('Kullanici tipi :' + desinstructor);

        } else {

            role = desorginaztor;
            await page.getByText('Organization').click();
            LoggerHelper.logInfo('Kullanici tipi ' + desorginaztor);
        }


        const mail = `${name}.${role}.${mailID}@instuLearn.com`;
        LoggerHelper.logInfo(`Randomly olusan mail adresi: "${mail}"`);

        await page.getByRole('textbox', {name: 'Email :'}).fill(mail);

        await page.getByRole('textbox').nth(2).fill(name);


        await page.getByRole('textbox', {name: 'Password:', exact: true}).fill(password);

        await page.getByRole('textbox', {name: 'Retype Password:'}).fill(password);

        await page.getByRole('checkbox', {name: 'I agree with terms & rules'}).check({force: true});


        await page.getByRole('button', {name: 'Signup'}).click();


        if (role === desStudent) {
            await expect(page.getByRole('link', {name: 'Become Instructor'})).toBeVisible({timeout: 15000});
            LoggerHelper.logInfo('Student kaydi basarili: Become Instructor butonu gorundu.');
        } else {
            await expect(page.getByRole('link', {name: 'Create a new course'})).toBeVisible({timeout: 15000});
            LoggerHelper.logInfo(`${role} kaydi basarili: Create a new course butonu gorundu.`);
        }


        AccountStorageHelper.saveAccount(role, name, mail, password);


    }


}