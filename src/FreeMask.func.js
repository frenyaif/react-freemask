// akan digunakan saat function component lebih banyak dukungan dari alat lain seperti halnya class component

import React, { createRef, useState, useEffect, forwardRef } from 'react';
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

function useHover(defaultIsHover) {
  const [isHover, setIsHover] = useState(defaultIsHover);

  function setHover() {
    setIsHover(true);
  }

  function setLeave() {
    setIsHover(false);
  }

  return [isHover, setHover, setLeave];
}

function useFocus(defaultIsFocus) {
  const [isFocus, setIsFocus] = useState(defaultIsFocus);

  function setFocus() {
    setIsFocus(true);
  }

  function setBlur() {
    setIsFocus(false);
  }

  return [isFocus, setFocus, setBlur];
}

function SegmentWrapper({ children }) {
  return <div className="freemask__segment-wrapper">{children}</div>;
}

const FreeMask = forwardRef(function FreeMask(
  { segments, onChange, onKeyDown, theme, ...props },
  ref,
) {
  if (undefined === segments) {
    return <div>Ooops, nothing to show</div>;
  }

  const valueFromSegments = createValueFromSegments(segments);
  const [isHover, setHover, setLeave] = useHover(false);
  const [isFocus, setFocus, setBlur] = useFocus(false);
  const [isResetValue, setIsResetValue] = useState(false);
  const [value, setValue] = useState(props.value || valueFromSegments);
  const input = createInput(value);

  function handleValueChanged() {
    !isResetValue && onChange && onChange(value);
  }
  useEffect(handleValueChanged, [value]);

  function handlePropsValueChanged() {
    if (undefined !== props.value) {
      if (!isResetValue && !Object.is(props.value, value)) {
        setValue(props.value);
        setIsResetValue(true);
      }
    }
  }
  useEffect(handlePropsValueChanged, [props.value]);

  function handleIsResetValueChanged() {
    isResetValue && setIsResetValue(false);
  }
  useEffect(handleIsResetValueChanged, [isResetValue]);

  function focus(e) {
    const freemask = e.target;

    if (freemask.classList.contains('freemask__segment-wrapper')) {
      freemask.querySelector('div[contenteditable=true]').focus();
    }
  }

  function change(segmentName) {
    delay(() => {
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

  const themeIsDefined = undefined !== theme;
  const freemaskClass = classNames('freemask', {
    'freemask--hover': isHover,
    'freemask--focus': isFocus,
    'freemask--bootsrap': themeIsDefined && 'bootstrap' === theme,
    'freemask--material': themeIsDefined && 'material' === theme,
  });

  const freemaskValue = createFreemaskValue(segments, value);

  props = produce(props, draft => {
    delete draft.value;
  });

  return (
    <div
      className={freemaskClass}
      onMouseOver={setHover}
      onMouseLeave={setLeave}
      onClick={focus}
      {...props}
    >
      <input ref={ref} type="hidden" value={freemaskValue} />
      <SegmentWrapper>
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
      </SegmentWrapper>
    </div>
  );
});
FreeMask.displayName = 'FreeMask';
FreeMask.propTypes = {
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
FreeMask.defaultProps = {
  onKeyDown: () => {},
};

export default FreeMask;
