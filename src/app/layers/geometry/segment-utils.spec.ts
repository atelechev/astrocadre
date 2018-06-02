import { isParallelSegment, isMeridionalSegment, isCrossingInitialMeridian } from './segment-utils';

describe('segment-utils', () => {

  it('#isParallelSegment should return false if arg is not defined', () => {
    expect(isParallelSegment(undefined)).toBeFalsy();
  });

  it('#isParallelSegment should return false if arg length is lower than expected', () => {
    expect(isParallelSegment([])).toBeFalsy();
  });

  it('#isParallelSegment should return false if segment does not represent a parallel', () => {
    const segment = [ 1, 2, 3, 4 ];
    expect(isParallelSegment(segment)).toBeFalsy();
  });

  it('#isParallelSegment should return true if segment represents a parallel', () => {
    const segment = [ 1, 2, 3, 2 ];
    expect(isParallelSegment(segment)).toBeTruthy();
  });

  it('#isMeridionalSegment should return false if arg is not defined', () => {
    expect(isMeridionalSegment(undefined)).toBeFalsy();
  });

  it('#isMeridionalSegment should return false if arg length is lower than expected', () => {
    expect(isMeridionalSegment([])).toBeFalsy();
  });

  it('#isMeridionalSegment should return false if segment does not represent a meridian', () => {
    const segment = [ 1, 2, 3, 4 ];
    expect(isMeridionalSegment(segment)).toBeFalsy();
  });

  it('#isMeridionalSegment should return true if segment represents a meridian', () => {
    const segment = [ 1, 2, 1, 4 ];
    expect(isMeridionalSegment(segment)).toBeTruthy();
  });


  it('#isCrossingInitialMeridian should return false if arg is not defined', () => {
    expect(isCrossingInitialMeridian(undefined)).toBeFalsy();
  });

  it('#isCrossingInitialMeridian should return false if arg length is lower than expected', () => {
    expect(isCrossingInitialMeridian([])).toBeFalsy();
  });

  it('#isCrossingInitialMeridian should return false if segment does not cross the initial meridian', () => {
    const segment = [ 25, 10, 50, 10 ];
    expect(isCrossingInitialMeridian(segment)).toBeFalsy();
  });

  it('#isCrossingInitialMeridian should return true if segment is at initial meridian, leftwards', () => {
    const segment = [ 0, 10, 360, 10 ];
    expect(isCrossingInitialMeridian(segment)).toBeTruthy();
  });

  it('#isCrossingInitialMeridian should return true if segment is at initial meridian, rightwards', () => {
    const segment = [ 360, 10, 0, 10 ];
    expect(isCrossingInitialMeridian(segment)).toBeTruthy();
  });

});
