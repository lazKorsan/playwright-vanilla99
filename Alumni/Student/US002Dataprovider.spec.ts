import {Locator, Page, test} from '@playwright/test';

import {BasePage} from "../../src/main/pages/BasePage";


test('US001LylRegisterTest TC02', async ({page}) => {

    const checkArr = [
        {sunday: page.locator('#sunday')},
        {monday: page.locator('#monday')},
        {tuesday: page.locator('#tuesday')}
    ];

// Dizi içinden anahtarı 'monday' olan objeyi buluyoruz
    const targetObj = checkArr.find(item => item.monday);

// Bulduğumuz objenin içindeki locator'a tıklıyoruz


});


export class VisitorPage extends BasePage {

    // Store all locators as a private object (or Map)
    private readonly registerFormLocators: Record<string, Locator>;

    constructor(page: Page) {
        super(page);

        this.registerFormLocators = {
            register: page.getByRole('link', {name: ' Sign Up'}),
            'user name': page.getByRole('textbox', {name: 'User Name'}),
            email: page.getByRole('textbox', {name: 'E-Mail Address'})             ,
            password: page.getByRole('textbox', {name: 'Password must be at least 8'})                     ,
            'confirm password': page.getByRole('textbox', {name: 'Confirm Password'})                   ,
            submit: page.getByRole('button', {name: 'Sign Up'})                          ,
        };
    }

    /**
     * Get any locator by its name
     */
    getElement(elementName: string): Locator {
        const locator = this.registerFormLocators[elementName];
        if (!locator) {
            throw new Error(`Element "${elementName}" not found in registerFormLocators`);
        }
        return locator;
    }

    // Convenience method (optional)
    async getterElement(elementName: string): Promise<Locator> {
        return this.getElement(elementName);
    }

    async loginWithMethod(name: string, password: string): Promise<void> {
        await this.page.goto('https://qa.loyalfriendcare.com/en');

        // ✅ How to call any element
        const registerLink = this.getElement('register');
        await registerLink.click();

        // or directly
        await this.getElement('user name').fill(name);
        await this.getElement('password').fill(password);
        await this.getElement('submit').click();
    }


}
/*
 test('US001LylRegisterTest TC02', async ({page}) => {

        const checkArr = [
            {sunday: page.locator('#sunday')},
            {monday: page.locator('#monday')},
            {tuesday: page.locator('#tuesday')}
        ];

        for (const each of checkArr) {
            // Object.values(each)[0] ifadesi objenin içindeki locator'ı verir.
            const locator = Object.values(each)[0];

            await locator.check();
            await expect(locator).toBeChecked();

        });

 */

test('fromConstructionsGroup0001', async ({page}) => {

    const registerForm  = [
        { 'register': page.getByRole('link', {name: ' Sign Up'})},
        {'user name': page.getByRole('textbox', {name: 'User Name'})},
        {'email': page.getByRole('textbox', {name: 'E-Mail Address'})},
        {'password': page.getByRole('textbox', {name: 'Password must be at least 8'})},
        {'confirm password': page.getByRole('textbox', {name: 'Confirm Password'})},
        {'submit': page.getByRole('button', {name: 'Sign Up'})}

    ];

    console.log(registerForm);


});

test('fromConstructionsGroup002', async ({page}) => {

    const registerForm  = [
        { register: page.getByRole('link', {name: ' Sign Up'})},
        {user_name: page.getByRole('textbox', {name: 'User Name'})},
        {email: page.getByRole('textbox', {name: 'E-Mail Address'})},
        {password: page.getByRole('textbox', {name: 'Password must be at least 8'})},
        {confirm_password: page.getByRole('textbox', {name: 'Confirm Password'})},
        {submit: page.getByRole('button', {name: 'Sign Up'})}

    ];

    console.log(registerForm);


   const fromData = registerForm[0];
   console.log('Kullanici yazdiriri ', fromData);



    const str = `{ register: getByRole('link', { name: ' Sign Up' }) }`;

// : karakterinden önceki kısmı ve sondaki } karakterini kaldır
    const result = str
        .replace(/^[^:]+:\s*/, '')   // : ve öncesini sil
        .replace(/\s*}\s*$/, '');    // sondaki } karakterini sil

    console.log(result);


});





