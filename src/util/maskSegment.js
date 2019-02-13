export function isInputSegment(segment) {
  return '?' === segment.substring(0, 1);
}

export function getSegmentName(segment) {
  return segment.substring(1);
}

export function createValueFromSegments(segments) {
  let segmentValue = {};
  segments.forEach(segment => {
    if (isInputSegment(segment)) {
      const segmentName = getSegmentName(segment);
      segmentValue[segmentName] = '';
    }
  });

  return segmentValue;
}
