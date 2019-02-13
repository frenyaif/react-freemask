import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { FreeMask } from './../../FreeMask';

const anonFunc = () => {};

test('FreeMask snapshot', () => {
  const component = renderer.create(
    <FreeMask segments={['?value']} onKeyDown={anonFunc} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

describe('FreeMask', () => {
  describe('segments', () => {
    test('has Input', () => {
      const wrapper = shallow(
        <FreeMask segments={['?value']} onKeyDown={anonFunc} />,
      );

      expect(wrapper.find('.freemask__segment-wrapper Input')).toHaveLength(1);
    });

    test('has Text', () => {
      const wrapper = shallow(
        <FreeMask segments={['text']} onKeyDown={anonFunc} />,
      );

      expect(wrapper.find('.freemask__segment-wrapper Text')).toHaveLength(1);
    });
  });

  describe('value', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <FreeMask segments={['?value']} onKeyDown={anonFunc} />,
      );
    });

    test('is ``', () => {
      expect(wrapper.state('value')).toEqual({ value: '' });
    });

    test('changed by props, from `` to `foo`', () => {
      wrapper.setProps({ value: { value: 'foo' }, onChange: jest.fn() });
      expect(wrapper.state('value')).toEqual({ value: 'foo' });
    });
  });

  describe('theme', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <FreeMask segments={['?value']} onKeyDown={anonFunc} />,
      );
    });

    test('is undefined', () => {
      expect(wrapper.props().theme).toBeUndefined();
    });

    test('is bootstrap', () => {
      wrapper.setProps({ theme: 'bootstrap' });
      expect(wrapper.hasClass('freemask--bootsrap')).toEqual(true);
    });

    test('is material', () => {
      wrapper.setProps({ theme: 'material' });
      expect(wrapper.hasClass('freemask--material')).toEqual(true);
    });
  });
});

describe('FreeMask action', () => {
  test('change', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <FreeMask
        segments={['?value']}
        value={{ value: '' }}
        onChange={onChange}
        onKeyDown={anonFunc}
      />,
    );

    wrapper.simulate('change');
    expect(onChange).toBeCalled();
  });

  test('keydown', () => {
    const onKeyDown = jest.fn();
    const wrapper = shallow(
      <FreeMask segments={['?value']} onKeyDown={onKeyDown} />,
    );

    wrapper
      .find('.freemask__segment-wrapper Input')
      .simulate('keydown', { keyCode: 13, preventDefault: jest.fn() });
    expect(onKeyDown).toBeCalled();
  });
});
