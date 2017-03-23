import { h, Component } from 'preact';

import MainLayout from './Layouts/MainLayout';
import Homepage from './containers/Homepage/Homepage';

const baseMetaData = {
  title: 'React Lego',
  description: 'React Lego : incrementally add more cool stuff to your react app',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,example'
    },
    title: 'About React SSR Base'
  }
};

export default class Root extends Component {
  render() {
    return (
      <MainLayout>
        <Homepage meta={ baseMetaData } />
      </MainLayout>
    );
  }
}
