import { TestBed } from '@angular/core/testing';
import { ViewportDimensionService } from '#core/services/viewport-dimension.service';
import { Dimension } from '#core/models/dimension';
import { Constants } from '#core/models/constants';


describe('ViewportDimensionService', () => {

  let service: ViewportDimensionService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ViewportDimensionService] });
    service = TestBed.inject(ViewportDimensionService);
  });

  const width = 'width';
  const height = 'height';

  const assertErrorExpected = (setterFunct: () => void, axis: string) => {
    expect(() => setterFunct()).toThrow(new Error(`dimension.${axis} must be in range [1, 16384]`));
  };

  const dimension = (w: number, h: number): Dimension => ({ width: w, height: h });

  const ensureViewportDimenstion = (w: number, h: number) => {
    service.setDimension(dimension(w, h));
  };

  const coord = (x: number, y: number) => ({ x, y });

  describe('setDimension should', () => {

    describe('throw expected error', () => {

      it('for negative first arg', () => {
        assertErrorExpected(() => service.setDimension(dimension(-1, 100)), width);
      });

      it('for zero first arg', () => {
        assertErrorExpected(() => service.setDimension(dimension(0, 100)), width);
      });

      it('for first arg greater than max supported', () => {
        assertErrorExpected(() => service.setDimension(dimension(16385, 100)), width);
      });

      it('for negative second arg', () => {
        assertErrorExpected(() => service.setDimension(dimension(100, -1)), height);
      });

      it('for zero second arg', () => {
        assertErrorExpected(() => service.setDimension(dimension(100, 0)), height);
      });

      it('for second arg greater than max supported', () => {
        assertErrorExpected(() => service.setDimension(dimension(100, 16385)), height);
      });

    });

    it('set the width from valid value', () => {
      const value = 100;
      service.setDimension(dimension(value, 100));
      expect(service.getWidth()).toBe(value);
    });

    it('set the height from valid value', () => {
      const value = 100;
      service.setDimension(dimension(100, value));
      expect(service.getHeight()).toBe(value);
    });

  });

  describe('isInBounds should return', () => {

    describe('false', () => {

      it('for a point to the top of the viewport', () => {
        ensureViewportDimenstion(10, 10);
        expect(service.isInBounds(coord(5, -1))).toBeFalsy();
      });

      it('for a point to the top right of the viewport', () => {
        ensureViewportDimenstion(10, 10);
        expect(service.isInBounds(coord(11, -1))).toBeFalsy();
      });

      it('for a point to the right of the viewport', () => {
        ensureViewportDimenstion(10, 10);
        expect(service.isInBounds(coord(11, 5))).toBeFalsy();
      });

      it('for a point to the bottom right of the viewport', () => {
        ensureViewportDimenstion(10, 10);
        expect(service.isInBounds(coord(11, 11))).toBeFalsy();
      });

      it('for a point to the bottom of the viewport', () => {
        ensureViewportDimenstion(10, 10);
        expect(service.isInBounds(coord(5, 11))).toBeFalsy();
      });

      it('for a point to the bottom left of the viewport', () => {
        ensureViewportDimenstion(10, 10);
        expect(service.isInBounds(coord(-1, 11))).toBeFalsy();
      });

      it('for a point to the left of the viewport', () => {
        ensureViewportDimenstion(10, 10);
        expect(service.isInBounds(coord(-1, 5))).toBeFalsy();
      });

      it('for a point to the top left of the viewport', () => {
        ensureViewportDimenstion(10, 10);
        expect(service.isInBounds(coord(-1, -1))).toBeFalsy();
      });

    });

    it('true for a point inside the viewport', () => {
      ensureViewportDimenstion(10, 10);
      expect(service.isInBounds(coord(5, 5))).toBeTruthy();
    });

  });

  describe('getAspect should return', () => {

    it('1 when width is equal to height', () => {
      ensureViewportDimenstion(100, 100);
      expect(service.getAspect()).toBeCloseTo(1, 3);
    });

    it('0.5 when width is two times lower than height', () => {
      ensureViewportDimenstion(100, 200);
      expect(service.getAspect()).toBeCloseTo(0.5, 3);
    });

    it('2 when width is two times greater than height', () => {
      ensureViewportDimenstion(200, 100);
      expect(service.getAspect()).toBeCloseTo(2, 3);
    });

  });

  describe('broadcastDimensionChanged', () => {

    it('should broadcast dimension change', () => {
      const dim = dimension(1000, 1000);
      expect(service.getWidth()).toBe(Constants.VIEW_WIDTH);
      expect(service.getHeight()).toBe(Constants.VIEW_HEIGHT);
      const subscribed = service.broadcastDimensionChanged$.subscribe(
        () => {
          expect(service.getWidth()).toBe(dim.width);
          expect(service.getHeight()).toBe(dim.height);
        }
      );
      service.setDimension(dim);
      subscribed.unsubscribe();
    });

    describe('should not broadcast event', () => {

      it('if arg is undefined', () => {
        const subscribed = service.broadcastDimensionChanged$.subscribe(
          () => {
            throw new Error('event must not have been broadcasted!');
          }
        );
        service.setDimension(undefined);
        subscribed.unsubscribe();
      });

      it('if arg is same as current dimension', () => {
        const subscribed = service.broadcastDimensionChanged$.subscribe(
          () => {
            throw new Error('event must not have been broadcasted!');
          }
        );
        service.setDimension(dimension(Constants.VIEW_WIDTH, Constants.VIEW_HEIGHT));
        subscribed.unsubscribe();
      });

      it('if width is invalid', () => {
        const subscribed = service.broadcastDimensionChanged$.subscribe(
          () => {
            throw new Error('event must not have been broadcasted!');
          }
        );
        const newDim = dimension(-1, Constants.VIEW_HEIGHT);
        assertErrorExpected(() => service.setDimension(newDim), width);
        subscribed.unsubscribe();
      });

      it('if height is invalid', () => {
        const subscribed = service.broadcastDimensionChanged$.subscribe(
          () => {
            throw new Error('event must not have been broadcasted!');
          }
        );
        const newDim = dimension(Constants.VIEW_WIDTH, -1);
        assertErrorExpected(() => service.setDimension(newDim), height);
        subscribed.unsubscribe();
      });

    });

  });

});
