import { h, render, rerender } from 'preact';
import { expect } from 'chai';
import App from './Homepage';

describe('App', () => {
  let scratch;

  before( () => {
    scratch = document.createElement('div');
    (document.body || document.documentElement).appendChild(scratch);
  });

  beforeEach( () => {
    scratch.innerHTML = '';
  });

  after( () => {
    scratch.parentNode.removeChild(scratch);
    scratch = null;
  });


  describe('rendering', () => {
    it('should render the homepage', () => {
      render(<App />, scratch);

      expect(scratch.innerHTML).to.contain('Advertiser List');
    });

    it('should not render a request results by default', () => {
      render(<App />, scratch);
      expect(scratch.innerHTML).not.to.contain('class="results__value"');
    });

    it('should not render a request results by default', () => {
      const app = render(<App  />, scratch)._component;
      const response = JSON.stringify({ bodY: 'hi' },null,2);
      app.setState({ response: response });
      rerender()
      expect(scratch.innerHTML).to.contain('class="results__value"');
      expect(scratch.innerHTML).to.contain(response);
    });

  });
});
