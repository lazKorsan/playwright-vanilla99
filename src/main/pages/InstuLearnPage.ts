import {BasePage} from "./BasePage";
import {expect, Locator, Page} from "@playwright/test";
import {LoggerHelper} from "../utils/LoggerHelper";
import path from "path";
import {AccountStorageHelper} from "../utils/AccountStorageHelper";

export class InstuLearnPage extends BasePage {
    private elementMap: Record<string, Locator>;

    constructor(page: Page) {
        super(page);

        // Tek yer: Map. Field'lar yok!
        this.elementMap = {
            'login': page.getByRole('link', {name: 'Login'}),
            'register': page.locator('a[href="/register"]'),
            'email': page.getByRole('textbox', {name: 'Email :'})


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
                `[HATA] '${elementName}' InstuLearnPage içinde bulunamadı! ` +
                `Geçerli değerler: ${Object.keys(this.elementMap).join(', ')}`
            );
        }
        return locator;
    }

    navigateToHomePage = async (url: string): Promise<void> => {
        await this.page.goto(url);
    };

    async registerMethod(name: string, password: string): Promise<void> {
        await this.page.getByRole('link', {name: 'Register'}).click();

        // Beklenti: URL'nin kayıt sayfasını göstermesi
        //await expect(this.page).toHaveURL('https://qa.instulearn.com/register');
        await expect(this.page).toHaveURL(/register/);

        // 2. Adım: Eğitmen (Instructor) rolünü seç
        await this.page.getByText('Instructor', {exact: true}).click();

        // 3. Adım: Formu doldur
        // Testlerin tekrar çalıştırılabilir olması için her seferinde benzersiz bir e-posta oluşturuluyor.
        const timestamp = Date.now();
        const dynamicEmail = `${name}${timestamp}@InstuLearn.com`;


        await this.page.getByRole('textbox', {name: 'Email :'}).fill(dynamicEmail);
        await this.page.locator('input[name="full_name"]').fill('ahmet');
        await this.page.getByRole('textbox', {name: 'Password:', exact: true}).fill(password);
        await this.page.getByRole('textbox', {name: 'Retype Password:'}).fill(password);

        // 4. Adım: Kullanım koşullarını kabul et
        // `force: true` kaldırıldı. Playwright'in elementi eyleme hazır bulmasını beklemek daha sağlıklıdır.
        // Genellikle checkbox'ın kendisi yerine ilişkili label'ına tıklamak daha kullanıcı odaklı bir yaklaşımdır.
        // Eğer 'input#term' elementi görünür ve tıklanabilir ise .check() sorunsuz çalışacaktır.
        await this.page.getByText('I agree with terms & rules').scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);

        // JavaScript ile tıkla
        await this.page.evaluate(() => {
            // Tüm label'ları bul
            const allLabels = document.querySelectorAll('label');

            // Her label'ı kontrol et
            allLabels.forEach(label => {
                const text = label.textContent || '';
                if (text.includes('I agree with terms') || text.includes('terms & rules')) {
                    label.click();
                    console.log('✅ Checkbox tıklandı!');
                }
            });
        });

        console.log('✅ Test tamamlandı!');

        // 5. Adım: Kayıt ol butonuna tıkla
        // `force: true` ve gereksiz `press('Enter')` adımları kaldırıldı.
        await this.page.getByRole('button', {name: 'Signup'}).click();
    }


    async loginWithMethod(mail: string, password: string) {

        await this.page.getByRole('link', {name: 'Login'}).click();

        await this.page.getByRole('textbox', {name: 'Email:'}).fill(mail);

        await this.page.getByRole('textbox', {name: 'Password:'}).fill(password);

        await this.page.getByRole('button', {name: 'Login'}).click();

    }

    async basicInformationForm(): Promise<void> {

        const createAnewCourseButton = this.page.locator('(//a[@class="d-none d-lg-flex btn btn-sm btn-primary nav-start-a-live-btn"])[1]');
        await createAnewCourseButton.click();

        // coursType dropDown menuden secim
        await this.page.locator('select[name="type"]').selectOption('course');

        // titleBox
        await this.page.getByRole('textbox').first().fill('upLoad File');

        // SEO Meta Desciption
        await this.page.getByRole('textbox', {name: '- 160 characters preferred'}).fill('playwright');


        // todo thumbnail yuklem ve secme await page.getByRole('textbox', { name: '360x250px preferred' }).fill('<==thumbnail==>');
        // yukleme baslam islemleri
        await this.page.locator('//button[@data-input="thumbnail"]').first().click();

        // laravel gecis ve tanımlama
        const page1Promise = this.page.waitForEvent('popup');
        await this.page.locator('.input-group-text').first().click();
        const page1 = await page1Promise;

        // plus isaretine tıklam
        await page1.locator('.fab-button.fab-toggle').click();

        // upLoad butona tıklama
        await page1.locator('#upload').click();

        // todo *** dosya secim islemleri
        await page1.getByText('Choose File(s)').click();

        // fixme  dosya seciminin yapilmasi
        const math1Path = path.join(process.cwd(), 'Documents', 'assets', 'math1.png');
        await page1.locator('.dz-hidden-input').setInputFiles(math1Path);

        // yukleme sonrası CloseButton tıklama
        await page1.locator('#uploadModal').getByText('Close').click();

        // png nin secilmesi
        await page1.locator('a').filter({hasText: 'math1.png'}).click();

        // png secim islemi
        await page1.locator('#actions').getByText('Confirm').click();


        // todo coverImage yukleme ve secim islemleri await page.getByRole('textbox', { name: '1920x530px preferred' }).fill('<==coverImage==>');
        // laravel alanın acilmasi ve tanımlanmasi
        const page2Promise = this.page.waitForEvent('popup');
        await this.page.locator('//button[@data-input="cover_image"]').last().dblclick();
        const page2 = await page2Promise;

        // plus isareti
        await page2.locator('.fab-button.fab-toggle').click();

        // uploadButton
        await page2.locator('#upload').click();

        // todo *** dosya secim isleminin baslamasi
        await page2.getByText('Choose File(s)').click();
        // png nin yuklenmesi
        const math2Path = path.join(process.cwd(), 'Documents', 'assets', 'math2.png');
        await page2.locator('.dz-hidden-input').setInputFiles(math2Path);

        // close buton a basmak
        await page2.locator('#uploadModal').getByText('Close').click();

        // png secimi
        await page2.locator('a').filter({hasText: 'math2.png'}).click();

        // secimin dogrulanmasi
        await page2.locator('#actions').getByText('Confirm').click();


        await this.page.getByText('Minimum 300 words. HTML and').click();
        await this.page.getByRole('textbox').nth(5).fill('upLoad islemleri tamamland');

        // nextbUTTON
        await this.page.getByRole('button', {name: 'Next'}).click();

        // STEP2 baslangici
        // await page.goto('https://qa.instulearn.com/panel/webinars/4435/step/2');
        await expect(this.page).toHaveURL(/2/);


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