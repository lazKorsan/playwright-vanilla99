@echo off
title Playwright Komutları
color 0A

:menu
cls
echo ==================== PLAYWRIGHT KOMUTLARI ====================
echo.
echo 1. LoayalFriendCare
echo 2. InstuLearn
echo 3. Automation Testing Practice
echo 4. Practice Expandtesting
echo 5. Demo Web Shop
echo 6. Demo Blaze
echo 7. Demoqa
echo 8. Driver Bosta
echo 0. Cikis
echo.
echo ================================================================
echo.

set /p secim="Seciminiz: "

if "%secim%"=="1" goto codegen1
if "%secim%"=="2" goto codegen2
if "%secim%"=="3" goto codegen3
if "%secim%"=="4" goto codegen4
if "%secim%"=="5" goto codegen5
if "%secim%"=="6" goto codegen6
if "%secim%"=="7" goto codegen7
if "%secim%"=="8" goto codegen8
if "%secim%"=="0" goto exit

echo Gecersiz secim!
pause
goto menu

:codegen1

echo.
echo Calistiriliyor1: npx playwright codegen https://qa.loyalfriendcare.com/en
echo ------------------------------------------------
npx playwright codegen https://qa.loyalfriendcare.com/en
echo ------------------------------------------------
echo Komut tamamlandi!
pause
goto menu

:codegen2
echo.
echo Calistiriliyor2: npx playwright codegen https://qa.instulearn.com/
echo ------------------------------------------------
npx playwright codegen https://qa.instulearn.com/
echo ------------------------------------------------
echo Komut tamamlandi!
pause
goto menu

:codegen3
echo.
echo Calistiriliyor3: npx playwright codegen https://testautomationpractice.blogspot.com
echo ------------------------------------------------
npx playwright codegen https://testautomationpractice.blogspot.com
echo ------------------------------------------------
echo Komut tamamlandi!
pause
goto menu

:codegen4
echo.

echo Calistiriliyor4: npx playwright codegen https://practice.expandtesting.com/
echo ------------------------------------------------
npx playwright codegen https://practice.expandtesting.com/
echo ------------------------------------------------
echo Komut tamamlandi!
pause
goto menu

:codegen5
echo.
echo Calistiriliyor5: npx playwright codegen https://demowebshop.tricentis.com/
echo ------------------------------------------------
npx playwright codegen https://demowebshop.tricentis.com/
echo ------------------------------------------------
echo Komut tamamlandi!
pause
goto menu

:codegen6
echo.
echo Calistiriliyor: https://demoblaze.com
echo ------------------------------------------------
npx playwright codegen https://demoblaze.com
echo ------------------------------------------------
echo Komut tamamlandi!
pause
goto menu

:codegen7
echo.
echo Calistiriliyor: https://demoqa.com
echo ------------------------------------------------
npx playwright codegen https://demoqa.com
echo ------------------------------------------------
echo Komut tamamlandi!
pause
goto menu

:codegen8
echo.
echo Calistiriliyor: Driver Bosta
echo ------------------------------------------------
npx playwright codegen
echo ------------------------------------------------
echo Komut tamamlandi!
pause
goto menu

:exit
echo Cikis yapiliyor...
timeout /t 1 >nul
exit