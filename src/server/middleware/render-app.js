import { h } from 'preact';
import Html from '../templates/Html';

export default function renderApp(assets = {}) {
  return async (ctx, next) => {
    await next();
    try {
      ctx.body = ctx.renderPageToString(
        <Html
          scripts={assets.javascript}
          stylesheets={assets.styles}
          markup={ctx.markup}
        />
      );
    } catch (error) {
      ctx.body = ctx.render500(error);
    }
  };
}
