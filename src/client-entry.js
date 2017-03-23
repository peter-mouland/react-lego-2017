import Preact, { h } from 'preact';

import Root from './app/Root';

let root;
Preact.render(<Root />, document.getElementById('html'), root);
