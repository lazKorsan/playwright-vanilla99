#Proje yapısi
proje yapisini vern komut
npx tree-node-cli -I "node_modules|.git|playwright-report|test-results" -o proje-yapisi.txt
npx tree-node-cli -I "node_modules|dist|.git|playwright-report|test-results" -o proje-yapisi.txt
PS C:\Users\user\WebstormProjects\playwright-vanilla99> npx tree-node-cli -I "node_modules|dist|.git|playwright-report|test-results" -o proje-yapisi.txt

## 📁 Proje Yapısı

```text
playwright-vanilla99
├── Alumni
│   ├── Loyal
│   │   ├── US001LylRegisterTest.spec.ts
│   │   ├── US002VerifyUrl.spec.ts
│   │   ├── US003ArrayList.spec.ts
│   │   ├── US004FromArrayListgetElelemt.spec.ts
│   │   └── US005ProductsList.spec.ts
│   └── Student
│       ├── US0023CreateCourse.spec.ts
│       ├── US0024ReserveMeetings.spec.ts
│       └── US004DynamicRegister.spec.ts
├── LoyalFriendCare.bat
├── Readme.md
├── VanillaRunner.ts
├── cucumber.json
├── example.env
├── general-scripts.ts
├── generate-tree.ts
├── package-lock.json
├── package.json
├── playwright.config.ts
├── qa-testing-sites.bat
├── runnerScipts.ts
├── setUp.bat
├── src
│   ├── main
│   │   ├── pages
│   │   │   ├── AdminPage.ts
│   │   │   ├── ArrayPage.ts
│   │   │   ├── BasePage.ts
│   │   │   ├── ButtonMethodsPage.ts
│   │   │   ├── CreateMethodsPage.ts
│   │   │   ├── ExamplePage.ts
│   │   │   ├── InstuLearnPage.ts
│   │   │   ├── LoyalPage.ts
│   │   │   ├── StudentPage.ts
│   │   │   └── VisitorPage.ts
│   │   └── utils
│   │       ├── AccountStorageHelper.ts
│   │       ├── ClickUtils.ts
│   │       ├── LoggerHelper.ts
│   │       ├── ReusableMethods.ts
│   │       ├── RobotUtils.ts
│   │       ├── SelectUtils.ts
│   │       └── SendKeysUtils.ts
│   └── tests
│       ├── Runners
│       │   ├── AdminRunner.ts
│       │   ├── CucumberTagRunner.ts
│       │   ├── StudentRunner.ts
│       │   ├── TestRunner.ts
│       │   └── fromScript.ts
│       ├── features
│       │   ├── Admin
│       │   │   └── US004DynamicRegister.feature
│       │   ├── Student
│       │   │   ├── ST001LylRegister.feature
│       │   │   ├── ST002LylRegister.feature
│       │   │   ├── US003Search.feature
│       │   │   ├── US004DynamicRegister.feature
│       │   │   ├── US007DynamicRegister.feature
│       │   │   └── checkbox.feature
│       │   └── Visitor
│       │       └── US001VtUploadFile.feature
│       └── step-definitions
│           ├── AdminSteps.ts
│           ├── HistorySteps.ts
│           ├── LoginPluginLogger.ts
│           ├── StudentSteps.ts
│           ├── VisitorSteps.ts
│           └── hooks.ts
└── tsconfig.json
```

---






# Report Way Balance - Kurulum ve Kullanım Kılavuzu

Bu proje, **Playwright**, **TypeScript** ve **Cucumber** framework'leri kullanılarak hazırlanan bir test otomasyon projesidir. Projeyi bilgisayarınıza kopyalayıp testleri sorunsuz bir şekilde koşturabilmek için aşağıdaki adımları sırasıyla takip etmeniz gerekmektedir.

## Gereksinimler

Projenin çalışabilmesi için bilgisayarınızda **Node.js** yüklü olmalıdır. Terminalinizden `node -v` ve `npm -v` komutlarını çalıştırarak yüklü olduğunu doğrulayabilirsiniz.

---

## 🛠️ Kurulum Adımları

### 1. Projeyi Bilgisayarınıza Klonlayın
Öncelikle GitHub üzerindeki bu depoyu bilgisayarınıza indirin ve proje klasörünün içerisine giriş yapın:
```bash
git clone <PROJE_GITHUB_LINKI>
cd report-way-balance
```

### 2. Gerekli Paketleri Yükleyin
`package.json` dosyasında bulunan test kütüphanelerini, TypeScript bağımlılıklarını ve raporlama araçlarını eksiksiz kurmak için terminalde şu komutu çalıştırın:
```bash
npm install
```
*(Eğer projede `package-lock.json` dosyası mevcutsa, sürümlerin birebir aynı kalması ve daha kararlı bir kurulum için alternatif olarak `npm ci` komutunu da kullanabilirsiniz.)*

### 3. Playwright Tarayıcılarını Kurun
Projede Playwright kullanıldığı için testlerin koşturulacağı tarayıcı motorlarının (Chromium, Firefox, WebKit) bilgisayarınıza indirilmesi gerekir. Paket yüklemesi bittikten sonra şu komutu çalıştırın:
```bash
npx playwright install
```

---

## 🚀 Testleri Çalıştırma Komutları

Kurulum işlemleri tamamlandıktan sonra, projedeki hazır betikleri (scripts) kullanarak testleri ve raporlamaları başlatabilirsiniz:

*   **Standart Playwright Testlerini Çalıştırma:**
    ```bash
    npm run test
    ```
*   **Cucumber / BDD Testlerini Çalıştırma:**
    ```bash
    npm run test:cucumber
    ```
*   **Testleri Koşturup Otomatik Allure Raporu Açma:**
    ```bash
    npm run test:report
    ```
*   **Eski Allure Raporu Verilerini Temizleme:**
    ```bash
    npm run allure:clean
    ```

## 📝 Notlar
*   Projede ortam değişkenleri için `dotenv` kullanılmaktadır. Eğer gerekliyse, proje kök dizininde `.env` dosyası oluşturup gerekli tanımlamaları yapmayı unutmayın.
