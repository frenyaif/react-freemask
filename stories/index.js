import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import './../src/static/css/react-freemask.css';
import './../src/static/css/react-freemask.bootstrap.css';
import './../src/static/css/react-freemask.material.css';
import FreeMask from './../src/FreeMask';
import FreeMaskSetValue from './FreeMaskSetValue';
import FreeMaskGetValue from './FreeMaskGetValue';

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
