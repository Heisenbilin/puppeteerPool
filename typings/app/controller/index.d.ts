// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportLighthouse from '../../../app/controller/lighthouse';
import ExportSavePage from '../../../app/controller/savePage';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    lighthouse: ExportLighthouse;
    savePage: ExportSavePage;
  }
}
