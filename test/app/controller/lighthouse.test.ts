import assert from 'assert';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/lighthouse.test.ts', () => {
  it('should GET /', async () => {
    const result = await app.httpRequest().get('/lighthouse/run').expect(200);
    console.log(result.text);
    assert(result.text === 'hi, egg');
  });
});
