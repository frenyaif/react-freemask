import React, { Fragment, useState, useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FreeMask from 'react-freemask';
import 'react-freemask/src/static/css/react-freemask.css';
import 'react-freemask/src/static/css/react-freemask.bootstrap.css';
import 'react-freemask/src/static/css/react-freemask.material.css';

function FreeMaskSetValue() {
  const [value, setValue] = useState(0);

  return (
    <Fragment>
      <FreeMask
        segments={['?size', ' mm']}
        value={{ size: value }}
        onChange={() => {}}
      />
      <br />
      <button onClick={() => setValue(value + 1)}>+</button>{' '}
      <button onClick={() => setValue(value - 1)}>-</button>
    </Fragment>
  );
}

function FreeMaskGetValue() {
  const ref = useRef(null);

  return (
    <Fragment>
      <FreeMask
        ref={ref}
        segments={['?size', ' mm ', '?duration', ' week']}
        value={{ size: 123, duration: 2 }}
        onChange={() => {}}
      />
      <br />
      <button onClick={() => alert(ref.current.value)}>get value</button>
    </Fragment>
  );
}

storiesOf('FreeMask', module)
  .add('default', () => <FreeMask segments={['?size', ' mm']} />)
  .add('with value & onChange', () => (
    <FreeMask
      segments={['?size', ' mm']}
      value={{ size: '123' }}
      onChange={action('value changed')}
    />
  ))
  .add('with onKeyDown', () => (
    <FreeMask segments={['?size', ' mm']} onKeyDown={action('key down')} />
  ))
  .add('multiple value', () => (
    <FreeMask segments={['?size', ' mm ', '?duration', ' week']} />
  ))
  .add('set value', () => <FreeMaskSetValue />)
  .add('get element value', () => <FreeMaskGetValue />)
  .add('props.segments undefined', () => <FreeMask />);

storiesOf('Theme', module)
  .add('bootstrap', () => (
    <FreeMask theme="bootstrap" segments={['?size', ' mm']} />
  ))
  .add('material', () => (
    <FreeMask theme="material" segments={['?size', ' mm']} />
  ));
