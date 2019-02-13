import { isNextNavigation, isPrevNavigation } from './../../util/navigation';

describe('isNextNavigation', () => {
  test('by right arrow is true', () => {
    expect(isNextNavigation({ keyCode: 39 })).toBeTruthy();
  });

  test('by non right arrow is false', () => {
    expect(isNextNavigation({ keyCode: 37 })).toBeFalsy();
  });
});

describe('isPrevNavigation', () => {
  test('by left arrow is true', () => {
    expect(isPrevNavigation({ keyCode: 37 })).toBeTruthy();
  });

  test('by non left arrow is false', () => {
    expect(isPrevNavigation({ keyCode: 39 })).toBeFalsy();
  });
});
