import { isCrossingInitialMeridian, isMeridionalSegment, isParallelSegment } from '#core/utils/segment-utils';

describe('segment-utils', () => {

  describe('isParallelSegment should return', () => {

    describe('false', () => {

      it('if arg is not defined', () => {
        expect(isParallelSegment(undefined)).toBeFalsy();
      });

      it('if arg length is lower than expected', () => {
        expect(isParallelSegment([])).toBeFalsy();
      });

      it('if segment does not represent a parallel', () => {
        const segment = [1, 2, 3, 4];
        expect(isParallelSegment(segment)).toBeFalsy();
      });

    });

    it('true if segment represents a parallel', () => {
      const segment = [1, 2, 3, 2];
      expect(isParallelSegment(segment)).toBeTruthy();
    });

  });

  describe('isMeridionalSegment should return', () => {

    describe('false', () => {

      it('if arg is not defined', () => {
        expect(isMeridionalSegment(undefined)).toBeFalsy();
      });

      it('if arg length is lower than expected', () => {
        expect(isMeridionalSegment([])).toBeFalsy();
      });

      it('if segment does not represent a meridian', () => {
        const segment = [1, 2, 3, 4];
        expect(isMeridionalSegment(segment)).toBeFalsy();
      });

    });

    it('true if segment represents a meridian', () => {
      const segment = [1, 2, 1, 4];
      expect(isMeridionalSegment(segment)).toBeTruthy();
    });

  });

  describe('isCrossingInitialMeridian should return', () => {

    describe('false', () => {

      it('if arg is not defined', () => {
        expect(isCrossingInitialMeridian(undefined)).toBeFalsy();
      });

      it('if arg length is lower than expected', () => {
        expect(isCrossingInitialMeridian([])).toBeFalsy();
      });

      it('if segment does not cross the initial meridian', () => {
        const segment = [25, 10, 50, 10];
        expect(isCrossingInitialMeridian(segment)).toBeFalsy();
      });

    });

    describe('true', () => {

      it('if segment is at initial meridian, leftwards', () => {
        const segment = [0, 10, 360, 10];
        expect(isCrossingInitialMeridian(segment)).toBeTruthy();
      });

      it('if segment is at initial meridian, rightwards', () => {
        const segment = [360, 10, 0, 10];
        expect(isCrossingInitialMeridian(segment)).toBeTruthy();
      });

    });

  });

});
