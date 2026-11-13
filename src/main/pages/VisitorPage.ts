import {BasePage} from "./BasePage";
import {expect, Locator, Page} from "@playwright/test";


export class VisitorPage extends BasePage {


    constructor(page: Page) {
        super(page);


        const registerFormLocaters = [
            {'register': page.getByRole('link', {name: ' Sign Up'})},
            {'user name': page.getByRole('textbox', {name: 'User Name'})},
            {'email': page.getByRole('textbox', {name: 'E-Mail Address'})},
            {'password': page.getByRole('textbox', {name: 'Password must be at least 8'})},
            {'confirm password': page.getByRole('textbox', {name: 'Confirm Password'})},
            {'submit': page.getByRole('button', {name: 'Sign Up'})}

        ];
    }

    async getterElement(elementName: string) {

        const targetElement = await this.getElement(elementName);
    }



    async loginWithMethod(name: string, password: string): Promise<void> {

        const visitor= new VisitorPage(this.page);
        await this.page.goto('https://qa.loyalfriendcare.com/en');

        // buraya herhangi bir element nasıl çağırırım .
        // mesal "register" elementi



    }


}