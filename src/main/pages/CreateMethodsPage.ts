import { Page } from '@playwright/test';

// =====================================================================
// 1) TOP-LEVEL FONKSİYON (⭐3) — global utility
// =====================================================================
export async function navigateToHomePage(page: Page): Promise<void> {
    await page.goto(process.env.INSTU_URL!);
    // Sınıf state'i gerekmiyorsa, import ile kullanılır.
    // POM'da nadir; utility helper olarak uygundur.
}

// =====================================================================
// ANA SINIF
// =====================================================================
export class CreateMethodsPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // -------------------------------------------------------------------
    // 1) PUBLIC ASYNC NORMAL METHOD (⭐5 — EN ÇOK TERCİH EDİLEN)
    // -------------------------------------------------------------------
    async navigateToHomePage(url: string): Promise<void> {
        await this.page.goto(url);
        // Varsayılan seçim. prototype üzerinde tek kopya.
        // Doğrudan çağrı: await tm.navigateToHomePage('https://x.com')
        // Callback olarak geçirirsen this kaybolur → .bind(this) gerekir.
    }

    // -------------------------------------------------------------------
    // 2) ARROW CLASS FIELD (⭐4 — CALLBACK İÇİN İDEAL)
    // -------------------------------------------------------------------
    navigateToHomePage7 = async (url: string): Promise<void> => {
        await this.page.goto(url);
        // this lexical binding → her yerde güvenli.
        // Callback / event / Promise.all için tercih et.
        // DİKKAT: Sadece arrow'un başında async; normal method'un başında async.
        // Çift async (async x = async () =>) HATA verir.
    };

    // -------------------------------------------------------------------
    // 3) PRIVATE ASYNC (⭐4 — İÇ YARDIMCI)
    // -------------------------------------------------------------------
    private async navigateToHomePage2(): Promise<void> {
        await this.page.goto(process.env.INSTU_URL!);
        // Sadece sınıf içinden çağrılır (compile-time).
        // Test dışından erişilmez.
        // Tipik desen: public goHome() → this.navigateToHomePage2()
    }

    // Wrapper örneği (private method'u dışarı açar)
    async goHome(): Promise<void> {
        await this.navigateToHomePage2();
    }

    // -------------------------------------------------------------------
    // 4) PROTECTED ASYNC (⭐3 — BASE CLASS + EXTEND)
    // -------------------------------------------------------------------
    protected async navigateToHomePage3(url:string): Promise<void> {
        await this.page.goto(url);
        // Sadece sınıf + alt sınıflar erişir.
        // BasePage yazıp extend edeceksen anlamlı.
    }

    // -------------------------------------------------------------------
    // 5) STATIC ASYNC (⭐2 — SAF YARDIMCI)
    // -------------------------------------------------------------------
    static async navigateToHomePageStatic(page: Page): Promise<void> {
        await page.goto(process.env.INSTU_URL!);
        // this.page YOK; page parametre.
        // Çağrı: await TestMethods.navigateToHomePageStatic(page)
        // State tutmayan saf helper için.
    }

    // -------------------------------------------------------------------
    // 6) PRIVATE STATIC ASYNC (⭐2 — İÇ STATIC HELPER)
    // -------------------------------------------------------------------
    private static async navigateToHomePage2Static(page: Page): Promise<void> {
        await page.goto(process.env.INSTU_URL!);
        // Sadece sınıf içinden çağrılır. Dışarı kapalı static helper.
    }

    // -------------------------------------------------------------------
    // 7) GETTER (❌ ÖNERİLMEZ — sadece eğitim)
    // -------------------------------------------------------------------
    get navigateToHomePage4() {
        return async (): Promise<void> => {
            await this.page.goto(process.env.INSTU_URL!);
        };
        // Çağrı: await this.navigateToHomePage4() — dikkat, getter önce çalışır.
        // Her erişimde yeni fonksiyon döner. Kafa karıştırır. KULLANMA.
    }
}

// =====================================================================
// FACTORY (mevcut kodun)
// =====================================================================
export function createTestMethods(page: Page): CreateMethodsPage {
    return new CreateMethodsPage(page);
}