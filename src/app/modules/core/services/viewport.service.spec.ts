import { TestBed } from '@angular/core/testing';
import { skip, take } from 'rxjs/operators';
import { ScreenCoordinate } from '#core/models/screen/screen-coordinate';
import { ViewportService } from '#core/services/viewport.service';
import { Dimension } from '#core/models/screen/dimension';
import { ViewportEvent } from '#core/models/event/viewport-event';
import { ViewportSizeChangeEvent } from '#core/models/event/viewport-size-change-event';


describe('ViewportService', () => {

  let service: ViewportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ViewportService
      ]
    });
    service = TestBed.inject(ViewportService);
  });

  const defaultSize = {
    width: window.screen.width,
    height: window.screen.height
  };

  it('defaultHeight should return expected value', () => {
    const expectedValue = window.screen.height;
    expect(service.defaultHeight).toEqual(expectedValue);
  });

  it('defaultWidth should return expected value', () => {
    const expectedValue = window.screen.width;
    expect(service.defaultWidth).toEqual(expectedValue);
  });

  describe('size', () => {

    it('get should return expected value', () => {
      expect(service.size).toEqual(defaultSize);
    });

    describe('set should', () => {

      it('do nothing if the arg is falsy', () => {
        service.size = undefined;
        expect(service.size).toEqual(defaultSize);
      });

      it('set the width and the hight if they are valid', () => {
        service.size = {
          width: 700,
          height: 800
        };
        expect(service.size.width).toEqual(700);
        expect(service.size.height).toEqual(800);
      });

      describe('not change the width', () => {

        it('if it is falsy', () => {
          service.size = {
            width: undefined,
            height: 800
          };
          expect(service.size.width).toEqual(defaultSize.width);
          expect(service.size.height).toEqual(800);
        });

        it('if it is negative', () => {
          service.size = {
            width: -1,
            height: 800
          };
          expect(service.size.width).toEqual(defaultSize.width);
          expect(service.size.height).toEqual(800);
        });


        it('if it greater than the allowed max', () => {
          service.size = {
            width: 16385,
            height: 800
          };
          expect(service.size.width).toEqual(defaultSize.width);
          expect(service.size.height).toEqual(800);
        });

      });

      describe('not change the height', () => {

        it('if it is falsy', () => {
          service.size = {
            width: 700,
            height: undefined
          };
          expect(service.size.width).toEqual(700);
          expect(service.size.height).toEqual(defaultSize.height);
        });

        it('if it is negative', () => {
          service.size = {
            width: 700,
            height: -1
          };
          expect(service.size.width).toEqual(700);
          expect(service.size.height).toEqual(defaultSize.height);
        });

        it('if it is greater than the allowed max', () => {
          service.size = {
            width: 700,
            height: 16385
          };
          expect(service.size.width).toEqual(700);
          expect(service.size.height).toEqual(defaultSize.height);
        });

      });

    });

  });

  it('aspectRatio should return expected value', () => {
    service.size = {
      width: 1000,
      height: 500
    };
    expect(service.aspectRatio).toEqual(2);
  });

  describe('isInBounds should return', () => {

    const coordinates = (x: number, y: number): ScreenCoordinate => ({ x, y });

    describe('false', () => {

      it('if the arg is falsy', () => {
        expect(service.isInBounds(undefined)).toBeFalse();
      });

      it('if the x coordinate is negative', () => {
        expect(service.isInBounds(coordinates(-1, 100))).toBeFalse();
      });

      it('if the y coordinate is negative', () => {
        expect(service.isInBounds(coordinates(100, -1))).toBeFalse();
      });

      it('if the x coordinate is greater than the width', () => {
        expect(service.isInBounds(coordinates(service.width + 1, 100))).toBeFalse();
      });

      it('if the y coordinate is greater than the height', () => {
        expect(service.isInBounds(coordinates(100, service.height + 1))).toBeFalse();
      });

    });

    it('true if the coordinate is in the screen bounds', () => {
      expect(service.isInBounds(coordinates(200, 200))).toBeTrue();
    });

  });

  describe('viewportEvents', () => {

    it('should emit the expected initial event', (done: DoneFn) => {
      service.events.subscribe(
        (event: ViewportEvent<any>) => {
          expect(event.key).toEqual(ViewportSizeChangeEvent.KEY);
          expect(event.data).toEqual(defaultSize);
          done();
        }
      );
    });

    it('should be fired when the size changes', (done: DoneFn) => {
      const dimension: Dimension = {
        width: 1,
        height: 2
      };
      service.events.pipe(
        skip(1) // skip the initial event
      ).subscribe(
        (event: ViewportEvent<any>) => {
          expect(event.data).toEqual(dimension);
          done();
        }
      );
      service.size = dimension;
    });

  });

});
