import React, { Fragment, useState } from 'react';
import FreeMask from './../src/FreeMask';

export default function FreeMaskSetValue() {
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
