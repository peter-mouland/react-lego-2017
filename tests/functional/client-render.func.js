import h from 'preact';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Root from '../../src/app/Root';
import Homepage from '../../src/app/containers/Homepage/Homepage';

describe('Client Render', function () {
  it('Should render the Homepage', () => {
    this.wrapper = mount(<Root />);
    expect(this.wrapper.find(Homepage).length).to.equal(1);
  });
});
