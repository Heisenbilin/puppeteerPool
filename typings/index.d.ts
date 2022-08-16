import 'egg';

declare module 'egg' {}

interface Application {
  view: ViewManager;
  pool: any;
}
