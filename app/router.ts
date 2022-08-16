import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  router.get('/lighthouse/run', controller.lighthouse.run);
  router.get('/lighthouse/getimg', controller.lighthouse.getimg);
};
