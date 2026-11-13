// utils/SelectUtils.ts
import { Locator, Page } from '@playwright/test';
import { LoggerHelper } from './LoggerHelper';

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    DEFAULT_TIMEOUT: 10000,
    SHORT_TIMEOUT: 3000,
    HIGHLIGHT_DURATION: 200,
    WAIT_AFTER_SELECT: 300,
    DROPDOWN_OPEN_WAIT: 400,
    OPTION_APPEAR_TIMEOUT: 3000,

};

// ============================================
// TYPES
// ============================================
export interface SelectOptions {
    timeout?: number;
    highlight?: boolean;
    skipScroll?: boolean;
    verify?: boolean;
    waitAfterSelect?: number;
    /** Native <select> için: value mi label mı index mi? */
    by?: 'label' | 'value' | 'index';
    /** Custom dropdown'larda ekstra bekleme (milisaniye) */
    openWait?: number;
    /** Seçim yapılacak container'ı belirtmek için (opsiyonel) */
    within?: Locator;
}

// ============================================
// ANA CLASS
// ============================================
export class SelectUtils {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // ============================================
    // ANA METHODLAR (KULLANICIYA ÖZEL)
    // ============================================

    /**
     * 🎯 Voltran: Dropdown'ı metinle seçer (Native + Custom her türlü)
     *
     * Sırayla dener:
     *  1) Native <select> → selectOption({ label })
     *  2) Native <select> → selectOption({ value })
     *  3) Custom: getByRole('option', { name }) ile tıkla
     *  4) Custom: getByText(option, exact) ile tıkla
     *  5) Custom: [role="listbox"] içinde option ara
     *  6) Custom: data-value / data-testid ile tıkla
     *  7) Custom: XPath fallback
     *  8) JavaScript ile native select value atama (son çare)
     *
     * @param dropdownName - Dropdown'ın label/placeholder/id/name/aria-label metni
     * @param optionText - Seçilecek seçeneğin metni
     * @param options - Opsiyonel ayarlar
     */
    async selectByText(dropdownName: string, optionText: string, options?: SelectOptions): Promise<boolean> {
        const opts = { ...this.getDefaultOptions(), ...options };
        LoggerHelper.logInfo(`🎯 '${dropdownName}' dropdown'ında '${optionText}' seçilmeye çalışılıyor...`);

        // 1) Dropdown'ı bul (Voltran stratejisi ile)
        const dropdown = await this.findDropdown(dropdownName, opts);
        if (!dropdown) {
            LoggerHelper.logError(`❌ '${dropdownName}' dropdown'ı hiçbir strateji ile bulunamadı.`);
            return false;
        }

        // 2) Highlight
        if (opts.highlight) {
            await this.highlightElement(dropdown);
        }

        // 3) Native <select> mi kontrol et
        const tagName = await dropdown.evaluate(el => el.tagName.toLowerCase()).catch(() => '');
        if (tagName === 'select') {
            return this.selectNative(dropdown, optionText, opts);
        }

        // 4) Custom dropdown ise aç + seçeneği tıkla
        return this.selectCustom(dropdown, optionText, opts);
    }

    /**
     * 🎯 Belirli bir locator üzerinden seçim yapar (dropdown locator'ı hazır ise)
     */
    async selectByLocator(dropdown: Locator, optionText: string, options?: SelectOptions): Promise<boolean> {
        const opts = { ...this.getDefaultOptions(), ...options };

        if (opts.highlight) {
            await this.highlightElement(dropdown);
        }

        const tagName = await dropdown.evaluate(el => el.tagName.toLowerCase()).catch(() => '');
        if (tagName === 'select') {
            return this.selectNative(dropdown, optionText, opts);
        }

        return this.selectCustom(dropdown, optionText, opts);
    }

    /**
     * 🎯 Index ile seçim yapar (sadece native <select>)
     */
    async selectByIndex(dropdownName: string, index: number, options?: SelectOptions): Promise<boolean> {
        const opts = { ...this.getDefaultOptions(), ...options, by: 'index' as const };
        LoggerHelper.logInfo(`🎯 '${dropdownName}' dropdown'ında index ${index} seçiliyor...`);

        const dropdown = await this.findDropdown(dropdownName, opts);
        if (!dropdown) {
            LoggerHelper.logError(`❌ '${dropdownName}' dropdown'ı bulunamadı.`);
            return false;
        }

        try {
            await dropdown.selectOption({ index }, { timeout: opts.timeout });
            LoggerHelper.logSuccess(`✅ Index ${index} seçildi.`);
            return true;
        } catch (error: any) {
            LoggerHelper.logError(`❌ Index ile seçim başarısız: ${error.message}`);
            return false;
        }
    }

    /**
     * 🎯 Value ile seçim yapar (sadece native <select>)
     */
    async selectByValue(dropdownName: string, value: string, options?: SelectOptions): Promise<boolean> {
        const opts = { ...this.getDefaultOptions(), ...options, by: 'value' as const };
        LoggerHelper.logInfo(`🎯 '${dropdownName}' dropdown'ında value '${value}' seçiliyor...`);

        const dropdown = await this.findDropdown(dropdownName, opts);
        if (!dropdown) {
            LoggerHelper.logError(`❌ '${dropdownName}' dropdown'ı bulunamadı.`);
            return false;
        }

        try {
            await dropdown.selectOption({ value }, { timeout: opts.timeout });
            LoggerHelper.logSuccess(`✅ Value '${value}' seçildi.`);
            return true;
        } catch (error: any) {
            LoggerHelper.logError(`❌ Value ile seçim başarısız: ${error.message}`);
            return false;
        }
    }

    // ============================================
    // DROPDOWN BULMA (VOLTRAN - 12 STRATEJİ)
    // ============================================

    private async findDropdown(name: string, opts: SelectOptions): Promise<Locator | null> {
        const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const safe = esc(name);
        const nameRegex = new RegExp(name, 'i');

        const strategies: Array<() => Locator> = [
            // 1) Native <select> with label
            () => this.page.getByLabel(name, { exact: true }),
            // 2) Native <select> by name/id
            () => this.page.locator(`select[name="${safe}"], select[id="${safe}"]`),
            // 3) Role=combobox + name (React-Select, MUI, AntD)
            () => this.page.getByRole('combobox', { name: nameRegex }),
            // 4) Role=combobox (any, near label)
            () => this.page.locator(`[role="combobox"][aria-label*="${name}" i]`),
            // 5) data-testid / aria-label
            () => this.page.locator(
                `[data-testid="${safe}"], [aria-label="${safe}" i], [name="${safe}" i], [id="${safe}" i]`
            ),
            // 6) Placeholder
            () => this.page.getByPlaceholder(name, { exact: true }),
            () => this.page.getByPlaceholder(nameRegex),
            // 7) Label + select ilişkisi
            () => this.page.locator(`label:has-text("${name}") + select, label:has-text("${name}") + div [role="combobox"]`),
            () => this.page.locator(`label:has-text("${name}") select`),
            // 8) Custom dropdown (AntD, MUI class-based)
            () => this.page.locator(
                `.ant-select:has-text("${name}"), .MuiSelect-root:has-text("${name}"), [class*="select"]:has-text("${name}")`
            ),
            // 9) XPath fallback
            () => this.page.locator(
                `//select[contains(@name,'${name}') or contains(@id,'${name}') or contains(@aria-label,'${name}')]` +
                ` | //*[@role='combobox'][contains(@aria-label,'${name}') or contains(@aria-labelledby,'${name}')]`
            ),
            // 10) Son çare: görünür tüm select'lerden ilki
            () => this.page.locator('select, [role="combobox"]'),
        ];

        for (const [i, makeLocator] of strategies.entries()) {
            try {
                const locator = makeLocator().first();
                if (await locator.isVisible({ timeout: CONFIG.SHORT_TIMEOUT }).catch(() => false)) {
                    LoggerHelper.logInfo(`   ✓ Dropdown bulundu (strateji #${i + 1})`);
                    return locator;
                }
            } catch {
                /* sıradakine geç */
            }
        }

        return null;
    }

    // ============================================
    // NATIVE <SELECT> SEÇİMİ
    // ============================================

    private async selectNative(select: Locator, optionText: string, opts: SelectOptions): Promise<boolean> {
        LoggerHelper.logInfo(`   📌 Native <select> algılandı.`);

        // 1) selectOption({ label })
        try {
            await select.selectOption({ label: optionText }, { timeout: opts.timeout });
            LoggerHelper.logSuccess(`✅ Native select: label '${optionText}' seçildi.`);
            await this.page.waitForTimeout(opts.waitAfterSelect ?? CONFIG.WAIT_AFTER_SELECT);
            return true;
        } catch (e1: any) {
            LoggerHelper.logWarn(`   ⚠️ label ile seçilemedi, value deneniyor...`);
        }

        // 2) selectOption({ value })
        try {
            await select.selectOption({ value: optionText }, { timeout: opts.timeout });
            LoggerHelper.logSuccess(`✅ Native select: value '${optionText}' seçildi.`);
            await this.page.waitForTimeout(opts.waitAfterSelect ?? CONFIG.WAIT_AFTER_SELECT);
            return true;
        } catch (e2: any) {
            LoggerHelper.logWarn(`   ⚠️ value ile seçilemedi, JS fallback deneniyor...`);
        }

        // 3) JavaScript fallback
        try {
            const ok = await select.evaluate((el, text) => {
                const sel = el as HTMLSelectElement;
                const option = Array.from(sel.options).find(
                    o => o.text.trim() === text.trim() || o.value === text
                );
                if (option) {
                    sel.value = option.value;
                    sel.dispatchEvent(new Event('change', { bubbles: true }));
                    sel.dispatchEvent(new Event('input', { bubbles: true }));
                    return true;
                }
                return false;
            }, optionText);

            if (ok) {
                LoggerHelper.logSuccess(`✅ Native select: JS ile '${optionText}' seçildi.`);
                return true;
            }
        } catch (e3: any) {
            LoggerHelper.logError(`   ✗ JS fallback başarısız: ${e3.message}`);
        }

        return false;
    }

    // ============================================
    // CUSTOM DROPDOWN SEÇİMİ (VOLTRAN - 8 STRATEJİ)
    // ============================================

    private async selectCustom(dropdown: Locator, optionText: string, opts: SelectOptions): Promise<boolean> {
        LoggerHelper.logInfo(`   📌 Custom dropdown algılandı. Açılıyor...`);

        // 1) Dropdown'ı aç
        try {
            await dropdown.scrollIntoViewIfNeeded().catch(() => {});
            await dropdown.click({ timeout: opts.timeout });
            await this.page.waitForTimeout(opts.openWait ?? CONFIG.DROPDOWN_OPEN_WAIT);
        } catch (error: any) {
            LoggerHelper.logWarn(`   ⚠️ Dropdown açılamadı, JS click deneniyor...`);
            try {
                await dropdown.evaluate(el => (el as HTMLElement).click());
                await this.page.waitForTimeout(opts.openWait ?? CONFIG.DROPDOWN_OPEN_WAIT);
            } catch {
                LoggerHelper.logError(`   ✗ Dropdown hiç açılamadı.`);
                return false;
            }
        }

        // 2) Seçeneği bul ve tıkla (Voltran)
        const optionLocatorStrategies: Array<() => Locator> = [
            // 1) Role=option (en doğru)
            () => this.page.getByRole('option', { name: optionText, exact: true }),
            // 2) Role=option (non-exact)
            () => this.page.getByRole('option', { name: optionText }),
            // 3) Role=menuitem (bazı custom dropdown'lar)
            () => this.page.getByRole('menuitem', { name: optionText, exact: true }),
            // 4) Role=listitem
            () => this.page.getByRole('listitem', { name: optionText, exact: true }),
            // 5) [role="listbox"] içinde metin
            () => this.page.locator(`[role="listbox"] >> text="${optionText}"`),
            // 6) data-value / data-testid
            () => this.page.locator(
                `[data-value="${optionText}"], [data-testid="${optionText}"], [title="${optionText}"]`
            ),
            // 7) Genel metin eşleşmesi (dropdown açık olduğu için genelde son çare)
            () => this.page.getByText(optionText, { exact: true }),
            // 8) XPath fallback
            () => this.page.locator(
                `//*[@role='option'][normalize-space(.)='${optionText}']` +
                ` | //li[normalize-space(.)='${optionText}']` +
                ` | //*[@role='listbox']//*[normalize-space(.)='${optionText}']`
            ),
        ];

        for (const [i, makeLocator] of optionLocatorStrategies.entries()) {
            try {
                const option = makeLocator().first();
                if (await option.isVisible({ timeout: CONFIG.OPTION_APPEAR_TIMEOUT }).catch(() => false)) {
                    await option.scrollIntoViewIfNeeded().catch(() => {});
                    await option.click({ timeout: opts.timeout });
                    LoggerHelper.logSuccess(
                        `✅ Custom dropdown: '${optionText}' seçildi (strateji #${i + 1}).`
                    );
                    await this.page.waitForTimeout(opts.waitAfterSelect ?? CONFIG.WAIT_AFTER_SELECT);

                    if (opts.verify) {
                        await this.verifySelected(dropdown, optionText);
                    }
                    return true;
                }
            } catch (error: any) {
                // sıradakine geç
            }
        }

        // Hiçbiri işe yaramadıysa ESC ile dropdown'ı kapat
        await this.page.keyboard.press('Escape').catch(() => {});
        LoggerHelper.logError(`❌ Custom dropdown: '${optionText}' seçeneği bulunamadı.`);
        return false;
    }

    // ============================================
    // DOĞRULAMA
    // ============================================

    /**
     * ✅ Seçimin gerçekten yapıldığını doğrular
     */
    async verifySelected(dropdown: Locator, expectedText: string): Promise<boolean> {
        try {
            const text = (await dropdown.textContent())?.trim() || '';
            const value = await dropdown.inputValue().catch(() => '');

            if (text.includes(expectedText) || value.includes(expectedText)) {
                LoggerHelper.logInfo(`   ✓ Doğrulama başarılı: '${expectedText}' görünüyor.`);
                return true;
            }
            LoggerHelper.logWarn(`   ⚠️ Doğrulama: beklenen '${expectedText}', görünen '${text}'`);
            return false;
        } catch {
            return false;
        }
    }

    // ============================================
    // HIGHLIGHT
    // ============================================

    private async highlightElement(locator: Locator): Promise<void> {
        try {
            await locator.evaluate((el, duration) => {
                const original = el.getAttribute('style');
                el.setAttribute(
                    'style',
                    'outline: 3px solid #9B59B6 !important; background-color: #E8DAEF !important; box-shadow: 0 0 15px rgba(155,89,182,0.6) !important; transition: all 0.2s !important;'
                );
                // ⏳ Kum saati: duration ms sonra kendi kendine söner
                setTimeout(() => {
                    if (original !== null) el.setAttribute('style', original);
                    else el.removeAttribute('style');
                }, duration);
            }, CONFIG.HIGHLIGHT_DURATION);
            // ❌ await this.page.waitForTimeout(100);  ← KALDIRDIK
        } catch {
            /* silent */
        }
    }

    // ============================================
    // YARDIMCI
    // ============================================

    private getDefaultOptions(): Required<Pick<SelectOptions, 'timeout' | 'highlight' | 'skipScroll' | 'verify' | 'waitAfterSelect' | 'openWait'>> {
        return {
            timeout: CONFIG.DEFAULT_TIMEOUT,
            highlight: true,
            skipScroll: false,
            verify: true,
            waitAfterSelect: CONFIG.WAIT_AFTER_SELECT,
            openWait: CONFIG.DROPDOWN_OPEN_WAIT,
        };
    }

    // ============================================
    // STATIC WRAPPERS
    // ============================================

    static async selectByText(
        page: Page,
        dropdownName: string,
        optionText: string,
        options?: SelectOptions
    ): Promise<boolean> {
        return new SelectUtils(page).selectByText(dropdownName, optionText, options);
    }

    static async selectByLocator(
        page: Page,
        dropdown: Locator,
        optionText: string,
        options?: SelectOptions
    ): Promise<boolean> {
        return new SelectUtils(page).selectByLocator(dropdown, optionText, options);
    }

    static async selectByIndex(
        page: Page,
        dropdownName: string,
        index: number,
        options?: SelectOptions
    ): Promise<boolean> {
        return new SelectUtils(page).selectByIndex(dropdownName, index, options);
    }

    static async selectByValue(
        page: Page,
        dropdownName: string,
        value: string,
        options?: SelectOptions
    ): Promise<boolean> {
        return new SelectUtils(page).selectByValue(dropdownName, value, options);
    }
}

/*
// Basit
await SelectUtils.selectByText(page, 'Ülke', 'Türkiye');

// Locator hazırsa (daha hızlı)
await SelectUtils.selectByLocator(page, page.locator('#country-select'), 'Türkiye');

// Native select
await SelectUtils.selectByValue(page, 'Ülke', 'TR');

// React-Select / AntD custom dropdown (fark etmez)
await SelectUtils.selectByText(page, 'Doğum Tarihi', '1990');

// Index ile (nadir)
await SelectUtils.selectByIndex(page, 'Kategori', 2);
 */

// ============================================
// FACTORY
// ============================================
export function createSelectUtils(page: Page): SelectUtils {
    return new SelectUtils(page);
}