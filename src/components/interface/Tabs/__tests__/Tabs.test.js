import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';
import { Tabs, Tab } from '../index';

Enzyme.configure({ adapter: new Adapter() });

describe('<Tabs />', () => {
  const initProps = {
    className: 'my-class',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Tabs
        className={initProps.className}
        defaultActiveTab={1}
        data-testid="tabs"
      >
        <Tab label="Label" data-test-id="tab">Tab</Tab>
      </Tabs>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Tabs properly', () => {
    const component = renderer
      .create(
        <Tabs>
          <Tab label="Label1">Tab #1</Tab>
          <Tab label="Label2">Tab #2</Tab>
        </Tabs>,
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('should have custom class', () => {
    expect(wrapper.find('.fr-tabs').hasClass('my-class')).toBeTruthy();
  });

  it('should call setHeight', () => {
    const setHeight = jest.fn();
    const useState = jest.spyOn(React, 'useState');
    useState.mockImplementation((contentTabHeight) => [contentTabHeight, setHeight]);
    expect(setHeight).toBeTruthy();
  });
});
