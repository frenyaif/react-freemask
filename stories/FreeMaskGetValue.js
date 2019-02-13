import React, { Fragment, useRef } from 'react';
import FreeMask from './../src/FreeMask';

export default function FreeMaskGetValue() {
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
