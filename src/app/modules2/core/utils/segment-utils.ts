
export const isParallelSegment = (segment: number[]): boolean => {
  if (!segment || segment.length < 4) {
    return false;
  }
  const decl0 = segment[1];
  const decl1 = segment[3];
  return decl0 === decl1;
};

export const isMeridionalSegment = (segment: number[]): boolean => {
  if (!segment || segment.length < 4) {
    return false;
  }
  const ra0 = segment[0];
  const ra1 = segment[2];
  return ra0 === ra1 || (ra0 === 360 && ra1 === 0) || (ra0 === 0 && ra1 === 360);
};

/*
    Work-around for helper segments like [ 360, 10, 0, 10] that are not rendered,
    but used to join polygons on both sides of the reference meridian.
  */
export const isCrossingInitialMeridian = (segment: number[]): boolean =>
  isParallelSegment(segment) &&
  ((segment[0] === 360 && segment[2] === 0) || (segment[0] === 0 && segment[2] === 360));

