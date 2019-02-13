import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import {
  isNextNavigation,
  isPrevNavigation,
  navigateToNextSibling,
  navigateToPrevSibling,
} from './util/navigation';

function blockKey(e) {
  13 === e.keyCode && e.preventDefault();
}

const Input = forwardRef(function Input(
  { isResetValue, onFocus, onBlur, onInput, onKeyDown, ...props },
  ref,
) {
  const [value, setValue] = useState(props.value);

  function handleIsResetValueChanged() {
    if (isResetValue) {
      const newValue =
        props.value !== value ? props.value : ref.current.innerHTML;
      setValue(newValue);
    }
  }
  useEffect(handleIsResetValueChanged, [isResetValue]);

  function navigate(e) {
    const valueLength = props.value.length || 0;
    const selection = window.getSelection();
    let caretPosition = selection.getRangeAt(0).endOffset;

    if (isNextNavigation(e)) {
      if (valueLength === caretPosition) {
        navigateToNextSibling(e.target);
      }
    } else if (isPrevNavigation(e)) {
      if (0 === caretPosition) {
        navigateToPrevSibling(e.target);
      }
    }
  }

  function focus() {
    setImmediate(
      () => document && document.execCommand('selectAll', false, null),
    );
    onFocus();
  }

  function blur() {
    window.getSelection().removeAllRanges();
    onBlur();
  }

  function change() {
    onInput();
  }

  function keyDown(e) {
    blockKey(e);
    navigate(e);

    onKeyDown(e);
  }

  const elementProps = produce(props, draft => {
    delete draft.value;
  });

  return (
    <div
      ref={ref}
      className="freemask__input"
      contentEditable
      spellCheck={false}
      dangerouslySetInnerHTML={{ __html: value }}
      onFocus={focus}
      onBlur={blur}
      onInput={change}
      onKeyDown={keyDown}
      {...elementProps}
    />
  );
});
Input.displayName = 'Input';
Input.propTypes = {
  value: PropTypes.string.isRequired,
  isResetValue: PropTypes.bool.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onInput: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};

export default Input;
