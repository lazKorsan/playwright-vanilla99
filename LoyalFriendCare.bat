@echo off
title Playwright Komutları
color 0A

:menu
cls
echo ==================== PLAYWRIGHT KOMUTLARI ====================
echo.
echo 1. Test UI'ı ac (npx playwright test --ui)
echo 2. Codegen baslat (npx playwright codegen https://qa.loyalfriendcare.com/en)
echo 3. Tum testleri calistir (npx playwright test)
echo 4. Belirli testi calistir
echo 5. Report ac (npx playwright show-report)
echo 6. allure report paketi olustur (allure generate target/allure-results -o target/allure-report --clean)
echo 7. allure report ac ( allure open target/allure-report)
echo 0. Cikis
echo.
echo ================================================================
echo.

set /p secim="Seciminiz: "

if "%secim%"=="1" goto ui
if "%secim%"=="2" goto codegen
if "%secim%"=="3" goto alltests
if "%secim%"=="4" goto specifictest
if "%secim%"=="5" goto report
if "%secim%"=="6" goto set-allure-package
if "%secim%"=="7" goto open-allure-report
if "%secim%"=="0" goto exit

echo Gecersiz secim!
pause
goto menu

:ui

echo.
echo Calistiriliyor: npx playwright test --ui
echo ------------------------------------------------
npx playwright test --ui
echo ------------------------------------------------
echo Komut tamamlandi!
pause
goto menu

:codegen
echo.
echo Calistiriliyor: npx playwright codegen https://qa.loyalfriendcare.com/en
echo ------------------------------------------------
npx playwright codegen https://qa.loyalfriendcare.com/en
echo ------------------------------------------------
echo Komut tamamlandi!
pause
goto menu

:alltests
echo.
echo Calistiriliyor: npx playwright test
echo ------------------------------------------------
npx playwright test
echo ------------------------------------------------
echo Komut tamamlandi!
pause
goto menu

:specifictest
echo.
set /p testadi="Test dosyasini girin (ornek: login.spec.ts): "
echo Calistiriliyor: npx playwright test %testadi%
echo ------------------------------------------------
npx playwright test %testadi%
echo ------------------------------------------------
echo Komut tamamlandi!
pause
goto menu

:report
echo.
echo Calistiriliyor: npx playwright show-report
echo ------------------------------------------------
npx playwright show-report
echo ------------------------------------------------
echo Komut tamamlandi!
pause
goto menu

:set-allure-package
echo.
echo Calistiriliyor: allure generate target/allure-results -o target/allure-report --clean
echo ------------------------------------------------
allure generate target/allure-results -o target/allure-report --clean
echo ------------------------------------------------
echo Komut tamamlandi!
pause
goto menu

:open-allure-report
echo.
echo Calistiriliyor: allure open target/allure-report
echo ------------------------------------------------
allure open target/allure-report
echo ------------------------------------------------
echo Komut tamamlandi!
pause
goto menu

:exit
echo Cikis yapiliyor...
timeout /t 1 >nul
exit