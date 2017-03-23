import { h } from 'preact';
import renderToString from 'preact-render-to-string';

import Root from '../../app/Root';

function setRouterContext() {
  return async (ctx, next) => {
    ctx.status = 200;
    ctx.markup = renderToString(<Root />);
    await next();
  };
}

export default setRouterContext;
