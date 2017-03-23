import { h } from 'preact';
import { render } from 'preact-render-to-string';
import Error500 from '../templates/Error500';

export default function pageRenderers() {
  return async (ctx, next) => {
    ctx.renderPageToString = function renderPageToString(page) {
      return `<!doctype html>${render(page)}`;
    };
    ctx.render500 = function render500(e) {
      ctx.response.status = 500;
      return render(<Error500 />);
    };
    await next();
  };
}
