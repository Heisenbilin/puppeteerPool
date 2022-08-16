import { Controller } from 'egg';

export default class HomeController extends Controller {
  async getInfo() {
    const { ctx, service } = this;
    const res = await service.savePage.genPdf();
    ctx.body = res;
    ctx.status = 200;
  }

  async getImg() {
    const { ctx, service } = this;
    const res = await service.savePage.genImg();
    ctx.body = res;
    ctx.status = 200;
  }
}
