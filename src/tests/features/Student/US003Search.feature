@Student @StUS003Search
Feature: Bir ziyaretci olarak sitede aradagım urunlere erişebilmek istiyorum

  @StUS003SearchTC01
  Scenario: Kullanici site header kısmındaki arama kutusunda arama yapabilmeli
  sayfaya yonlendirildigini dogrulayabilmeli
    * Student kullanicisi "BASE_URL" sayfasina gider
    * Student kullanicisi "Search Here Service, Medicine or Vaccinations .." kutusuna "re" yazar
    * Student kullanicisi "Search" butonuna tiklar
    * Student kullanicisi "search=re" sayfasinda oldugunu dogrular
    * Student kullanicisi arama sonucu urun sayisini consola yazdirir
    * Student kullanicisi arama sonucu urunleri consola yazdirir
