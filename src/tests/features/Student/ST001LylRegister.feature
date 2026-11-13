@Student  @ST001LylRegisterTC01
Feature: Bir kullanici olarak siteye kayıt olabilmeliyim.

  @ST001LylRegisterTC01
  Scenario: Dogru bilgilerle siteye kayıt olabilmek istiyorum .
    * Student kullanicisi "BASE_URL" sayfasina gider
    * Student kullanicisi "Register" butona tiklar
    * Student kullanicisi "User Name" kutusuna "NAME" yazarr
    * Student kullanicisi "Email" kutusuna "STUDENT_MAIL" yazarr
    * Student kullanicisi "Password" kutusuna "STUDENT_PASSWORD" yazarr
    * Student kullanicisi "Confirm Password" kutusuna "STUDENT_PASSWORD" yazarr
    * Student kullanicisi "Submit" butona tiklar


  @US007AdDynamicRegisterAd013
  Scenario: Gecerli bilgilerle register formu doldurup kayit olabilmeliyim
    * Admin kullanicisi "INSTU_URL" sayfasina gider
    * Admin kullanicisi "NAME" ve "PASSWORD" degerleri ile siteye kayt olur
    * Admin kullanicisi role bagli buton gorunurlugu ile kayt olundugunu dogrular
