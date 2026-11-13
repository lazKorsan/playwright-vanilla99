import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

// Tip güvenliği için (opsiyonel ama önerilir)
type ButtonName = 'login' | 'register';

export class ButtonMethodsPage extends BasePage {
    private elementMap: Record<string, Locator>;

    constructor(page: Page) {
        super(page);

        // Tek yer: Map. Field'lar yok!
        this.elementMap = {
            'login': page.getByRole('link', { name: 'Login' }),
            'register': page.getByRole('link', { name: 'Register' }), // ✅ role tabanlı
        };
    }

    // ============================================================
    // 1) GENERIC METHOD — elementMap üzerinden (⭐⭐⭐⭐⭐ TERCİH)
    // ============================================================
    async clickButton(buttonName: string): Promise<void> {
        const key = buttonName.trim().replace(/:+$/, '').toLowerCase();
        const locator = this.elementMap[key];

        if (!locator) {
            throw new Error(
                `[HATA] '${buttonName}' ButtonMethodsPage içinde bulunamadı! ` +
                `Geçerli değerler: ${Object.keys(this.elementMap).join(', ')}`
            );
        }

        await locator.click({ timeout: 5000 });
    }

    // ============================================================
    // 2) SABİT LOCATOR İLE ÖZEL METHOD (⭐⭐⭐⭐ OKUNUR)
    // ============================================================
    async clickRegisterButton(): Promise<void> {
        await this.page.locator('a[href="/register"]').click();
        // ⚠️ Not: Locator değişirse burada güncelle. Uzun vadede 1️⃣ tercih.
    }

    async clickLoginButton(): Promise<void> {
        await this.page.getByRole('link', { name: 'Login' }).click();
    }

    // ============================================================
    // 3) LOCATOR PARAMETRESİ ALAN METHOD (⭐⭐⭐⭐ ESNEK)
    // ============================================================
    async clickElement(element: Locator): Promise<void> {
        await element.click();
        // Kullanım: await buttons.clickElement(buttons.getElementByName('register'));
        // veya:     await buttons.clickElement(page.locator('...'));
    }

    // ============================================================
    // 4) ARROW FIELD — CALLBACK İÇİN (⭐⭐⭐)
    // ============================================================
    clickButtonArrow = async (buttonName: string): Promise<void> => {
        const key = buttonName.trim().toLowerCase();
        const locator = this.elementMap[key];
        if (!locator) throw new Error(`'${buttonName}' bulunamadı`);
        await locator.click();
    };

    // ============================================================
    // 5) PRIVATE İÇ HELPER + PUBLIC WRAPPER (⭐⭐⭐ ENCAPSULATION)
    // ============================================================
    private async clickByLocator(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        await locator.click();
    }

    async clickRegisterSafely(): Promise<void> {
        await this.clickByLocator(this.elementMap['register']);
    }

    async clickLoginSafely(): Promise<void> {
        await this.clickByLocator(this.elementMap['login']);
    }

    // ============================================================
    // 6) STATIC HELPER — STATE YOKSA (⭐⭐)
    // ============================================================
    static async clickElementStatic(locator: Locator): Promise<void> {
        await locator.click();
        // Kullanım: await ButtonMethodsPage.clickElementStatic(locator);
    }
}

// ============================================================
// 7) TOP-LEVEL FONKSİYON — UTILITY (⭐⭐)
// ============================================================
export async function clickElementHelper(locator: Locator): Promise<void> {
    await locator.click();
    // Kullanım: import { clickElementHelper } from './ButtonMethodsPage';
}

export async function clickButtonArrow(
    elementMap: Record<string, Locator>,
    buttonName: string
): Promise<void> {
    const key = buttonName.trim().toLowerCase();
    const locator = elementMap[key];
    if (!locator) throw new Error(`'${buttonName}' bulunamadı`);
    await locator.click();
}