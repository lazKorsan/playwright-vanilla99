@echo off
echo === Playwright + TypeScript + Cucumber Kurulumu Başlıyor (Sadece Chromium) ===

echo.
echo [1/7] npm init ve temel paketler...
call npm init -y

echo.
echo [2/7] TypeScript ve Node tipleri...
call npm install --save-dev typescript @types/node

echo.
echo [3/7] Playwright Test...
call npm install --save-dev @playwright/test

echo.
echo [4/7] Sadece Chromium tarayıcısını indir...
call npx playwright install chromium

echo.
echo [5/7] Dotenv...
call npm install dotenv --save

echo.
echo [6/7] Cucumber ve TypeScript çalıştırıcı...
call npm install --save-dev @cucumber/cucumber ts-node

echo.
echo [7/7] Allure raporlama (Playwright + Cucumber uyumlu)...
call npm install --save-dev allure-playwright allure-commandline allure-cucumberjs

echo.
echo [8/8] @path alians yolunun yuklenmesi
call npm install -D tsconfig-paths

echo.
echo === Kurulum Tamamlandı ===
pause