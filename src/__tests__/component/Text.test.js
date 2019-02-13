import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Text from './../../Text';

test('Text snapshot', () => {
  const component = renderer.create(<Text>foo</Text>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Text value', () => {
  test('is `foo`', () => {
    const wrapper = shallow(<Text>foo</Text>);

    expect(wrapper.text()).toEqual('foo');
  });
});
