const puppeteer  = require('puppeteer')

class Page {
    _page;
    Page = this._page;
    setPage = (page) => this._page = page;

    async openPage(url) {
        const width = 1920;
        const height = 1080;
        this.browser = await puppeteer.launch({
            headless: false,
            slowMo: 3,
            'defaultViewport' : { 'width' : width, 'height' : height },
        });
        let page = await this.browser.newPage();
        page.setDefaultTimeout(1000 * 60 * 5);
        await page.setViewport( { 'width' : width, 'height' : height } );
        await page.setUserAgent( 'UA-TEST' );
        await page.goto(url);
        this.setPage(page)
        return page
    }

    async endTest() {
        await this.browser.close();
    }

}


module.exports.Page = Page