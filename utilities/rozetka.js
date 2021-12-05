const {Page} = require("./page");

class Rozetka extends Page {
    async loginPage(webPage) {
        async function signIn(phone, password) {
            await webPage.click('button[class="header__button ng-star-inserted"]')
                await webPage.waitForSelector('input[id=auth_email]', { visible: true });
                await webPage.type('input[id=auth_email]', phone, { delay: 100 })
                await webPage.waitForSelector('input[id=auth_pass]');
                await webPage.type('input[id=auth_pass]', password, { delay: 100 })
                await webPage.click('button[class="button button--large button--green auth-modal__submit ng-star-inserted"]')
                await webPage.waitForTimeout(1000)
        }
        return {
            loginForValidation: async (phone, password) => {
                await signIn(phone, password)    
            },
            validateLogin: async () => {
                await webPage.waitForSelector('input[id=auth_email]')
                const inputEmailClasses = await webPage.evaluate( input => [...input.classList],
                    await webPage.$('p[class="error-message ng-star-inserted"]'))
                await webPage.click('button[class="modal__close ng-star-inserted"]')
                return inputEmailClasses
            },
        }
    }

    async catalogPage(webPage) {
        return {
            checkCatalog: async () => {
                await webPage.waitForSelector('button[id="fat-menu"]')
                await webPage.click('button[id="fat-menu"]')
                await webPage.waitForTimeout(1000)
                const itemsLinks = await webPage.evaluate(() =>
                    Array.from(document.querySelectorAll('.menu-categories__link').values())
                        .map(el => el.href))
                await webPage.goto(itemsLinks[0])
                await webPage.waitForTimeout(3000)
                const itemsLinks2 = await webPage.evaluate(() =>
                    Array.from(document.querySelectorAll('.tile-cats__picture').values())
                        .map(el => el.href))
                await webPage.goto(itemsLinks2[0])
                await webPage.waitForTimeout(3000)
                const itemsLinks3 = await webPage.evaluate(() =>
                    Array.from(document.querySelectorAll('.goods-tile__picture').values())
                        .map(el => el.href))
                await webPage.goto(itemsLinks3[0])
                return await webPage.evaluate(() =>
                    Array.from(document.querySelectorAll('.breadcrumbs__link span').values())
                        .map(el => el.innerHTML))
            }
        }
    }
}


module.exports.Rozetka = Rozetka