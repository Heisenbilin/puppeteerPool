const Service = require('egg').Service;
const getData = require('../../mock/mock');

export class SavePageService extends Service {
  public async genPdf() {
    const { app, config, ctx } = this;
    console.log(config.app);
    const res = await app.pool.use(async (instance) => {
      const page = await instance.use();
      const data = getData();
      const template = await ctx.renderView('index.html', { tableData: data });
      await page.setContent(template);
      await page.emulateMedia('screen');
      const buffer = await page.pdf({
        format: 'A4',
        displayHeaderFooter: true,
        printBackground: true,
        '-webkit-print-color-adjust': 'exact',
        margin: {
          left: '40px',
          right: '40px',
          top: '60px',
          bottom: '60px',
        },
      });
      return Buffer.from(buffer).toString('base64');
    });
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
