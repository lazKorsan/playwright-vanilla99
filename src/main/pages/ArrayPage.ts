import {Page, Locator, expect} from "@playwright/test";
import {BasePage} from "./BasePage";
import {ClickUtils} from "../utils/ClickUtils";

// ============================================================
// 1. NORMALIZE FONKSİYONU
//    "Instructors"       → "instructors"
//    "Submit Button"     → "submitbutton"
//    "  Friday  "        → "friday"
//    "Submit-Button!"    → "submitbutton"
// ============================================================
function normalizeElementName(name: string): string {
    return name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[^a-z0-9]/g, '');
}

class ArrayPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    // ============================================================
    // 2. TÜM SAYFA ELEMENTLERİ — isimle erişilebilir object
    //    Yeni element eklemek için buraya bir satır ekle yeter.
    // ============================================================
    get elements(): Record<string, Locator> {
        return {
            // ----- Gün checkbox'ları -----
            sunday: this.page.getByRole('checkbox', {name: 'Sunday'}),
            monday: this.page.getByRole('checkbox', {name: 'Monday'}),
            tuesday: this.page.getByRole('checkbox', {name: 'Tuesday'}),
            wednesday: this.page.getByRole('checkbox', {name: 'Wednesday'}),
            thursday: this.page.getByRole('checkbox', {name: 'Thursday'}),
            friday: this.page.getByRole('checkbox', {name: 'Friday'}),
            saturday: this.page.getByRole('checkbox', {name: 'Saturday'}),

            // ----- Butonlar -----
            instructors: this.page.getByRole('link', {name: 'Instructors'}),
            login: this.page.getByRole('link', {name: 'Login'}),
            submit: this.page.getByRole('button', {name: 'Submit'}),
            search: this.page.getByRole('button', {name: 'Search'}),

            // ----- Input'lar -----
            username: this.page.getByRole('textbox', {name: 'Username'}),
            password: this.page.getByRole('textbox', {name: 'Password'}),
            email: this.page.getByRole('textbox', {name: 'Email'}),

            // ⬆️ Yeni element eklemek istersen buraya bir satır ekle
        };
    }

    // ============================================================
    // 3. getByElement — Cucumber'dan gelen ismi normalize edip
    //    locator döndürür. Yoksa ANLAŞILIR hata fırlatır.
    // ============================================================
    getByElement(elementName: string): Locator | null {
        const key = normalizeElementName(elementName);
        const locator = this.elements[key];

        if (!locator) {
            const validNames = Object.keys(this.elements).join(', ');
            console.warn(
                `⚠️  Element bulunamadı: "${elementName}" (normalize: "${key}")\n` +
                `📋 Geçerli isimler: ${validNames}`
            );
            return null;
        }

        return locator;
    }

    // ============================================================
    // 4. KOLAYLIK METOTLARI — Cucumber adımları için
    // ============================================================
    async goto() {
        await this.page.goto('https://testautomationpractice.blogspot.com/');
    }




}

export default ArrayPage