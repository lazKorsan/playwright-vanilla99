@Student @US007DynamicRegister
Feature: Bir kullanici olarak sitenin fonksiyonlarindan faydalanabilmek icin siteye kayit olabilmek istiyorum

  @US007HtDynamicRegisterTC01
  Scenario: Gecerli bilgilerle register formu doldurup kayit olabilmeliyim
    * History kullanicisi "INSTU_URL" sayfasina gider
    * History kullanicisi "NAME" ve "PASSWORD" degerleri ile site kaydi yapar
    * History kullanicisi role bagli buton gorunurlugu ile kayt olundugunu dogrular