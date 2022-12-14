// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportTest from '../../../app/service/Test';
import ExportLighthouse = require('../../../app/service/lighthouse');
import ExportSavePage from '../../../app/service/savePage';

declare module 'egg' {
  interface IService {
    test: AutoInstanceType<typeof ExportTest>;
    lighthouse: AutoInstanceType<typeof ExportLighthouse>;
    savePage: AutoInstanceType<typeof ExportSavePage>;
  }
}
