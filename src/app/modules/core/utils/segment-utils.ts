
/**
 * Returns true if the coordinates in the specified segment data correspond to a
 * line located along the parallels in the world grid.
 *
 * A segment lying on a parallel is expected to have the same value of the declination
 * for the start and end points.
 *
 * @param segment the segment data, using the format [ra0, decl0, ra1, decl1].
 * @returns true if the segment is located along the parallels.
 */
export const isParallelSegment = (segment: number[]): boolean => {
  if (!segment || segment.length < 4) {
    return false;
  }
  const decl0 = segment[1];
  const decl1 = segment[3];
  return decl0 === decl1;
};

/**
 * Returns true if the coordinates in the specified segment data correspond to a
 * line located along the meridians in the world grid.
 *
 * A segment lying on a meridian is expected to have the same value of the right ascension
 * for the start and end points.
 *
 * @param segment the segment data, using the format [ra0, decl0, ra1, decl1].
 * @returns true if the segment is located along the meridians.
 */
export const isMeridionalSegment = (segment: number[]): boolean => {
  if (!segment || segment.length < 4) {
    return false;
  }
  const ra0 = segment[0];
  const ra1 = segment[2];
  return ra0 === ra1 || (ra0 === 360 && ra1 === 0) || (ra0 === 0 && ra1 === 360);
};

/**
 * Returns true if the segment with the specified data is crossing the 0-th (360-th) meridian.
 *
 * This is a work-around for helper segments like [ 360, 10, 0, 10] that are not rendered,
 * but used to join polygons on both sides of the reference meridian.
 *
 * @param segment the segment data, using the format [ra0, decl0, ra1, decl1].
 * @returns true if the segment is crossing the initial meridian.
 */
export const isCrossingInitialMeridian = (segment: number[]): boolean =>
  isParallelSegment(segment) &&
  ((segment[0] === 360 && segment[2] === 0) || (segment[0] === 0 && segment[2] === 360));

