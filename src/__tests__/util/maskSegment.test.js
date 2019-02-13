import {
  isInputSegment,
  getSegmentName,
  createValueFromSegments,
} from './../../util/maskSegment';

describe('isInputSegment', () => {
  test('by `?size` is true', () => {
    expect(isInputSegment('?size')).toBeTruthy();
  });

  test('by `mm` is false', () => {
    expect(isInputSegment('mm')).toBeFalsy();
  });
});

describe('getSegmentName', () => {
  test('by `?size` is `size`', () => {
    expect(getSegmentName('?size')).toEqual('size');
  });
});

describe('createValueFromSegments', () => {
  describe('by [`?size`, `mm`]', () => {
    const segment = createValueFromSegments([`?size`, `mm`]);

    test('is have 1 segment', () => {
      expect(Object.keys(segment)).toHaveLength(1);
    });

    test('the segment is `size`', () => {
      expect(segment.size).not.toBeUndefined();
    });
  });
});
