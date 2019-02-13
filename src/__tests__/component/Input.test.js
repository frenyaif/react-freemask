import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Input } from './../../Input';

const anonFunc = () => {};

test('Input snapshot', () => {
  const component = renderer.create(
    <Input
      value="foo"
      isResetValue={false}
      onFocus={anonFunc}
      onBlur={anonFunc}
      onInput={anonFunc}
      onKeyDown={anonFunc}
    />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Input value', () => {
  const wrapper = mount(
    <Input
      value="foo"
      isResetValue={false}
      onFocus={anonFunc}
      onBlur={anonFunc}
      onInput={anonFunc}
      onKeyDown={anonFunc}
    />,
  );

  test('is `foo`', () => {
    expect(wrapper.text()).toEqual('foo');
  });

  test('changed by props, from `foo` to `bar`', () => {
    wrapper.setProps({ value: 'bar', isResetValue: true });
    expect(wrapper.text()).toEqual('bar');
  });
});

describe('Input action', () => {
  window.getSelection = () => ({
    removeAllRanges: jest.fn(),
    getRangeAt: () => ({
      endOffset: 0,
    }),
  });

  test('focus', () => {
    const onFocus = jest.fn();
    const wrapper = shallow(
      <Input
        value="foo"
        isResetValue={false}
        onFocus={onFocus}
        onBlur={anonFunc}
        onInput={anonFunc}
        onKeyDown={anonFunc}
      />,
    );

    wrapper.simulate('focus');
    expect(onFocus).toBeCalled();
  });

  test('blur', () => {
    const onBlur = jest.fn();
    const wrapper = shallow(
      <Input
        value="foo"
        isResetValue={false}
        onFocus={anonFunc}
        onBlur={onBlur}
        onInput={anonFunc}
        onKeyDown={anonFunc}
      />,
    );

    wrapper.simulate('blur');
    expect(onBlur).toBeCalled();
  });

  test('input', () => {
    const onInput = jest.fn();
    const wrapper = shallow(
      <Input
        value="foo"
        isResetValue={false}
        onFocus={anonFunc}
        onBlur={anonFunc}
        onInput={onInput}
        onKeyDown={anonFunc}
      />,
    );

    wrapper.simulate('input');
    expect(onInput).toBeCalled();
  });

  test('keydown', () => {
    const onKeyDown = jest.fn();
    const wrapper = shallow(
      <Input
        value="foo"
        isResetValue={false}
        onFocus={anonFunc}
        onBlur={anonFunc}
        onInput={anonFunc}
        onKeyDown={onKeyDown}
      />,
    );

    wrapper.simulate('keydown', { keyCode: 13, preventDefault: jest.fn() });
    expect(onKeyDown).toBeCalled();
  });
});
