@Student  @ST002LylRegister
Feature: Bir kullanici olarak siteye kayit olabilmeliyim

  @ST002LylRegisterTC01
  Scenario: Bir kullanici olarak gecerli bilgilerle siteye kayıt olabilmeliyim
    * Student kullanicisi "BASE_URL" sayfasina gider
    * Student kullanicisi "NAME" ve "STUDENT_PASSWORD" degerleri ile siteye kayit olur
