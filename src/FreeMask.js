import React, { PureComponent, createRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import produce from 'immer';
import Input from './Input';
import Text from './Text';
import {
  isInputSegment,
  getSegmentName,
  createValueFromSegments,
} from './util/maskSegment';

const createInput = (() => {
  let input = {};

  return value => {
    const inputKeys = Object.keys(input);
    const valueKeys = Object.keys(value);

    if (0 < inputKeys.length && valueKeys.length === inputKeys.length) {
      return input;
    }

    valueKeys.forEach(segmentName => (input[segmentName] = createRef()));

    return input;
  };
})();

const delay = (() => {
  let timer = 0;

  return (callback, delay) => {
    clearTimeout(timer);

    timer = setTimeout(callback, delay);
  };
})();

function createFreemaskValue(segments, value) {
  return segments
    .map(segment => {
      if (isInputSegment(segment)) {
        const segmentName = getSegmentName(segment);

        return value[segmentName];
      } else {
        return segment;
      }
    })
    .join('');
}

class FreeMask extends PureComponent {
  constructor(props) {
    super(props);

    const valueFromSegments =
      undefined !== props.segments
        ? createValueFromSegments(props.segments)
        : {};
    const value = props.value || valueFromSegments;

    this.state = {
      isHover: false,
      isFocus: false,
      isResetValue: false,
      value,
    };

    this.input = createInput(value);

    this._setHover = this._setHover.bind(this);
    this._setLeave = this._setLeave.bind(this);
    this._setFocus = this._setFocus.bind(this);
    this._setBlur = this._setBlur.bind(this);
    this._focus = this._focus.bind(this);
    this._change = this._change.bind(this);
    this._setValue = this._setValue.bind(this);
    this._setIsResetValue = this._setIsResetValue.bind(this);
  }

  render() {
    if (undefined === this.props.segments) {
      return <div>Ooops, nothing to show</div>;
    }

    const setHover = this._setHover;
    const setLeave = this._setLeave;
    const setFocus = this._setFocus;
    const setBlur = this._setBlur;
    const focus = this._focus;
    const change = this._change;

    const { segments, theme, forwardedRef, onKeyDown, ...props } = this.props;
    const { value, isHover, isFocus, isResetValue } = this.state;

    const ref = forwardedRef;
    const input = this.input;

    const themeIsDefined = undefined !== theme;
    const freemaskClass = classNames('freemask', {
      'freemask--hover': isHover,
      'freemask--focus': isFocus,
      'freemask--bootsrap': themeIsDefined && 'bootstrap' === theme,
      'freemask--material': themeIsDefined && 'material' === theme,
    });

    const freemaskValue = createFreemaskValue(segments, value);

    return (
      <div
        className={freemaskClass}
        onMouseOver={setHover}
        onMouseLeave={setLeave}
        onClick={focus}
        {...props}
      >
        <input ref={ref} type="hidden" value={freemaskValue} />
        <div className="freemask__segment-wrapper">
          {segments.map((segment, index) => {
            if (isInputSegment(segment)) {
              const segmentName = getSegmentName(segment);

              return (
                <Input
                  ref={input[segmentName]}
                  onFocus={setFocus}
                  onBlur={setBlur}
                  onInput={() => change(segmentName)}
                  onKeyDown={onKeyDown}
                  value={value[segmentName]}
                  isResetValue={isResetValue}
                  key={segmentName + index}
                />
              );
            } else {
              return <Text key={segment + index}>{segment}</Text>;
            }
          })}
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value !== prevState.value) {
      this._handleValueChanged();
    }

    if (this.props.value !== prevProps.value) {
      this._handlePropsValueChanged();
    }

    if (this.state.isResetValue !== prevState.isResetValue) {
      this._handleIsResetValueChanged();
    }
  }

  _setHover() {
    this.setState({
      isHover: true,
    });
  }

  _setLeave() {
    this.setState({
      isHover: false,
    });
  }

  _setFocus() {
    this.setState({
      isFocus: true,
    });
  }

  _setBlur() {
    this.setState({
      isFocus: false,
    });
  }

  _setIsResetValue(isResetValue) {
    this.setState({
      isResetValue,
    });
  }

  _setValue(value) {
    this.setState({
      value,
    });
  }

  _handleValueChanged() {
    const onChange = this.props.onChange;
    const { isResetValue, value } = this.state;

    !isResetValue && onChange && onChange(value);
  }

  _handlePropsValueChanged() {
    const setIsResetValue = this._setIsResetValue;
    const setValue = this._setValue;

    const props = this.props;
    const { isResetValue, value } = this.state;

    if (undefined !== props.value) {
      if (!isResetValue && !Object.is(props.value, value)) {
        setValue(props.value);
        setIsResetValue(true);
      }
    }
  }

  _handleIsResetValueChanged() {
    const setIsResetValue = this._setIsResetValue;
    const isResetValue = this.state.isResetValue;

    isResetValue && setIsResetValue(false);
  }

  _focus(e) {
    const freemask = e.target;

    if (freemask.classList.contains('freemask__segment-wrapper')) {
      freemask.querySelector('div[contenteditable=true]').focus();
    }
  }

  _change(segmentName) {
    delay(() => {
      const value = this.state.value;
      const input = this.input;
      const setValue = this._setValue;

      const segmentValue =
        null !== input[segmentName].current
          ? input[segmentName].current.innerHTML
          : '';

      const newSegmentValue = produce(value, draft => {
        draft[segmentName] = segmentValue;
      });

      setValue(newSegmentValue);
    }, 30);
  }
}

const WrappedFreeMask = forwardRef((props, ref) => {
  return <FreeMask {...props} forwardedRef={ref} />;
});
WrappedFreeMask.displayName = 'FreeMask';
WrappedFreeMask.propTypes = {
  theme: PropTypes.string,
  segments: PropTypes.array.isRequired,
  value: PropTypes.object,
  onChange: (props, propName, componentName) => {
    if (undefined !== props.value) {
      return (
        undefined === props.onChange &&
        new Error(
          `You provided a value prop to a \`${componentName}\` field without an \`${propName}\` handler, that means every changes of text only affects inside of the component.`,
        )
      );
    }
  },
  onKeyDown: PropTypes.func,
};
WrappedFreeMask.defaultProps = {
  onKeyDown: () => {},
};

export { WrappedFreeMask as default, FreeMask };
