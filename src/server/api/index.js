import Router from 'koa-router';
import fs from 'fs';
import path from 'path';

import handleError from '../middleware/handle-error';

const router = Router({ prefix: '/api/v1' });

router.use(handleError());

router.get('/', (ctx) => {
  ctx.type = 'json';
  ctx.status = 200;
  ctx.response.body = { status: 'healthy' };
});

router.use('/:list', async (ctx) => {
  const { query } = ctx;
  const ext = query.responseType === 'xml' ? 'xml' : 'json';
  const fixture = path.resolve(process.cwd(), 'tests', 'fixtures', `response.${ext}`);
  await new Promise((resolve, reject) => {
    fs.readFile(fixture, 'utf-8', (e, data) => {
      e && reject(e);
      !e && resolve(data);
    });
  })
    .then((result) => {
      ctx.type = 'json';
      ctx.body = result;
    });
});

export default router;
