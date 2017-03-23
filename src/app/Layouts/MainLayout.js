import { h, Component } from 'preact';

import './mainLayout.scss';

export default class MainLayout extends Component {

  render({ children, ...props }) {
    return (
      <div className={'layout__main'}>
        <div className={'layout__header'}>
          <div className="content-container">
            Schibsted Test
          </div>
        </div>
        <main className={'layout__content'}>
          {children}
        </main>
      </div>
    );
  }
}
