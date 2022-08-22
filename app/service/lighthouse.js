const Service = require('egg').Service;
const getData = require('../../mock/mock');
const lighthouse = require('lighthouse');
const { URL } = require('url');

(async () => {})();

/**
 * Test Service
 */
class LighthouseService extends Service {
  async run() {
    const { app, config, ctx } = this;
    const startTime = Date.now();
    let res = {};
    try {
      res = await app.pool.use(async (browser) => {
        console.log('开始执行puppeteer', browser);
        const url = 'https://bcc.xiwang.com';

        const page = await browser.newPage();
        await page.goto(url);
        // await page.close();
        const urlObj = new URL(browser.wsEndpoint());
        // browser.on('targetchanged', async (target) => {
        //   const page = await target.page();
        //   if (page && page.url() === url) {
        //     await page.addStyleTag({ content: '* {color: red}' });
        //   }
        // });

        // Lighthouse will open the URL.
        // Puppeteer will observe `targetchanged` and inject our stylesheet.
        const { lhr } = await lighthouse(url, {
          port: urlObj.port,
          logLevel: 'error',
          output: 'json', //Reporter for the results, supports multiple values. choices: "json", "html", "csv"  [array] [default: ["html"]]
          onlyCategories: [
            // Only run the specified categories. Available categories: accessibility, best-practices, performance, pwa, seo  [array]
            'performance',
            'accessibility',
            'best-practices',
            'seo',
          ],
        });

        page.close();

        console.log(
          `Lighthouse scores: ${Object.values(lhr.categories)
            .map((c) => c.score)
            .join(', ')}`
        );

        // const page = await instance.newPage();
        // await page.goto(url, { timeout: 120000 });

        // // const page = await instance.use();
        // // await page.goto(url);
        // console.log(page);
        // // if (page && page.url() === url) {
        // //   await page.addStyleTag({ content: '* {color: red}' });
        // // }
        // // Lighthouse will open the URL.
        // // Puppeteer will observe `targetchanged` and inject our stylesheet.
        // const { lhr } = await lighthouse(url, {
        //   port: new URL(instance.wsEndpoint()).port,
        //   output: 'json',
        //   logLevel: 'info',
        // });
        // // const data = getData();
        // console.log(
        //   `Lighthouse scores: ${Object.values(lhr.categories)
        //     .map((c) => c.score)
        //     .join(', ')}`
        // );
        return lhr;
      });
    } catch (err) {
      console.log(err);
    }
    console.log('耗时:', Date.now() - startTime);
    return res;
  }
  async genImg() {
    const { app, config, ctx } = this;
    console.log(config.app);
    const res = await app.pool.use(async (instance) => {
      const page = await instance.use();
      const data = getData();
      const template = await ctx.renderView('index.html', { tableData: data });
      await page.setContent(template);
      await page.emulateMedia('screen');
      const buffer = await page.screenshot({
        type: 'jpeg',
        fullPage: true,
        quality: 80,
        encoding: 'base64',
      });
      return buffer;
    });
    return res;
  }
}

module.exports = LighthouseService;
