const { Rozetka } = require('../utilities/rozetka.js')
const timeout = 80000
const { phone, password } = {phone: "test", password: "test"}


describe(
    'Testing functionality:',
    () => {
        let rozetka = new Rozetka()
        let page;
        let login;
        let catalog;

        beforeAll(
            async () => {
                try {
                    page = await rozetka.openPage('https://rozetka.com.ua/')
                    login = await rozetka.loginPage(page)
                    catalog = await rozetka.catalogPage(page)
                }
                catch (error) {
                    console.log(error);
                    throw error;
                }
            }, timeout
        );

        it("Typed phone number in a wrong format",
            async () => {
                await reporter.description("Testing login functionality")

                await reporter.startStep("Enter wrong phone number and password")

                await login.loginForValidation(phone, password)
                await reporter.endStep()

                await reporter.startStep("Check classes of the email input element")
                await login.validateLogin()
                await reporter.endStep()
            }, timeout
        );

        it("Check Catalog by links",
            async () => {
                await reporter.description("Check Catalog by links")

                await reporter.startStep("Check Catalog by links")
                const inputEmailClasses = await catalog.checkCatalog()
                await reporter.endStep()

                expect(inputEmailClasses).toContain('Ноутбуки')

            }, timeout
        );

        afterAll(
            async () => {
                await rozetka.endTest()
            }
        );
    }, timeout
);
