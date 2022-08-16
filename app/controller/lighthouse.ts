import { Controller } from 'egg';

export default class LighthouseController extends Controller {
  public async run() {
    const { ctx, service } = this;
    ctx.body = await service.lighthouse.run();
  }
  public async getimg() {
    const { ctx, service } = this;
    ctx.body = await service.lighthouse.genImg();
  }
}
