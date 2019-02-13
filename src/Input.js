import React, { PureComponent, forwardRef } from 'react';
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

class Input extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };

    this._navigate = this._navigate.bind(this);
    this._focus = this._focus.bind(this);
    this._blur = this._blur.bind(this);
    this._change = this._change.bind(this);
    this._keyDown = this._keyDown.bind(this);
    this._setValue = this._setValue.bind(this);
  }

  render() {
    const {
      isResetValue,
      onFocus,
      onBlur,
      onInput,
      onKeyDown,
      forwardedRef,
      ...props
    } = this.props;
    const ref = forwardedRef;

    const focus = this._focus;
    const blur = this._blur;
    const change = this._change;
    const keyDown = this._keyDown;

    const value = this.state.value;

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
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isResetValue !== prevProps.isResetValue) {
      this._handleIsResetValueChanged();
    }
  }

  _setValue(value) {
    this.setState({
      value,
    });
  }

  _handleIsResetValueChanged() {
    const props = this.props;
    const isResetValue = props.isResetValue;
    const value = this.state.value;
    const setValue = this._setValue;

    if (isResetValue) {
      const newValue =
        props.value !== value ? props.value : this.ref.current.innerHTML;
      setValue(newValue);
    }
  }

  _navigate(e) {
    const props = this.props;

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

  _focus() {
    const onFocus = this.props.onFocus;

    setImmediate(
      () => document && document.execCommand('selectAll', false, null),
    );
    onFocus();
  }

  _blur() {
    const onBlur = this.props.onBlur;

    window.getSelection().removeAllRanges();
    onBlur();
  }

  _change() {
    const onInput = this.props.onInput;

    onInput();
  }

  _keyDown(e) {
    const navigate = this._navigate;
    const onKeyDown = this.props.onKeyDown;

    blockKey(e);
    navigate(e);

    onKeyDown(e);
  }
}

const WrappedInput = forwardRef((props, ref) => {
  return <Input {...props} forwardedRef={ref} />;
});
WrappedInput.displayName = 'Input';
WrappedInput.propTypes = {
  value: PropTypes.string.isRequired,
  isResetValue: PropTypes.bool.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onInput: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};

export { WrappedInput as default, Input };
