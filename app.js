const puppeteerPool = require('./utils/puppeteer-pool');
const { EventEmitter } = require('events');

EventEmitter.defaultMaxListeners = 30;
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {}

  async didLoad() {
    this.app.pool = puppeteerPool();
    console.log('挂载puppeteerPool');
  }

  async willReady() {}

  async didReady() {}

  async serviceDidReady() {}

  async beforeClose() {
    if (this.app.pool && this.app.pool.drain) {
      await this.app.pool.drain().then(() => {
        this.app.pool.clear();
      });
      console.log('已卸载puppeteerPool');
    }
  }
}

module.exports = AppBootHook;
