import {Given} from "@cucumber/cucumber";
import {InstuLearnPage} from "../../main/pages/InstuLearnPage";


Given(/^Instu kullanicisi "([^"]*)" sayfasina gider$/, async function (urlKey: string) {

    const url = process.env[urlKey]!;

    await this.page.goto(url);


});
Given(/^Instu kullanicisi "([^"]*)" ve "([^"]*)" degerleri ile kayt olur$/, async function (nameKey: string, passwordKey: string): Promise<void> {
    const name = process.env[nameKey]!;
    const password = process.env[passwordKey]!;
    const instu = new InstuLearnPage(this.page);
    await instu.registerMethod(name, password);


});
Given(/^Instu kullanicisi Basic Information Formunu doldurur$/, async function () {
    const instu = new InstuLearnPage(this.page);
    await instu.basicInformationForm();

});
