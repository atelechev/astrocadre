import { TestBed } from '@angular/core/testing';
import { skip } from 'rxjs/operators';
import { Vector3 } from 'three';
import { CameraService } from '#core/services/camera.service';
import { ViewportService } from '#core/services/viewport.service';
import { ViewportEvent } from '#core/models/event/viewport-event';
import { ViewportViewChangeEvent } from '#core/models/event/viewport-view-change-event';
import { CoreModule } from '#core/core.module';
import { toVector3 } from '#core/utils/vector-utils';


describe('CameraService', () => {

  let service: CameraService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule]
    });
    service = TestBed.inject(CameraService);
  });

  const assertExpectedRotation = (rx: number, ry: number, rz: number) => {
    const camera = service.camera;
    const precision = 2;
    expect(camera.rotation.x).toBeCloseTo(rx, precision);
    expect(camera.rotation.y).toBeCloseTo(ry, precision);
    expect(camera.rotation.z).toBeCloseTo(rz, precision);
  };

  const assertExpectedFov = (fov: number) => {
    const camera = service.camera;
    expect(camera.fov).toBeCloseTo(fov, 2);
  };

  const assertExpectedPoint = (checked: Vector3, expected: Vector3) => {
    const precision = 3;
    expect(checked.x).toBeCloseTo(expected.x, precision);
    expect(checked.y).toBeCloseTo(expected.y, precision);
    expect(checked.z).toBeCloseTo(expected.z, precision);
  };

  const assertViewportViewChangedEventFired = (expectData: string, skipEvents: number, done?: DoneFn): void => {
    TestBed.inject(ViewportService).events
      .pipe(skip(skipEvents))
      .subscribe(
        (event: ViewportEvent<any>) => {
          expect(event.key).toEqual(ViewportViewChangeEvent.KEY);
          expect(event.data).toEqual(expectData);
          if (done) {
            done();
          }
        }
      );
  };

  it('camera should return defined camera with expected origin and rotation', () => {
    const camera = service.camera;
    expect(camera).toBeDefined();
    expect(camera.position.x).toBe(0);
    expect(camera.position.y).toBe(0);
    expect(camera.position.z).toBe(0);
    assertExpectedRotation(0, 0, 0);
  });

  describe('centerView should', () => {

    it('have no effect if the arg is falsy', () => {
      assertExpectedRotation(0, 0, 0);
      service.centerView(undefined);
      assertExpectedRotation(0, 0, 0);
    });

    it('set the view centered northwards to expected angles and emit an expected event', (done: DoneFn) => {
      assertViewportViewChangedEventFired('centerView', 1);
      assertExpectedRotation(0, 0, 0);
      service.centerView({ rightAscension: 10, declination: 25 });
      assertExpectedRotation(2.785, -1.102, 1.175);
      done();
    });

    it('set the view centered southwards to expected angles and emit an expected event', (done: DoneFn) => {
      assertViewportViewChangedEventFired('centerView', 1);
      assertExpectedRotation(0, 0, 0);
      service.centerView({ rightAscension: 10, declination: -25 });
      assertExpectedRotation(0.356, -1.102, 1.966);
      done();
    });

  });

  describe('rotate should', () => {

    it('have no effect if the arg is falsy', () => {
      assertExpectedRotation(0, 0, 0);
      service.rotate(undefined);
      assertExpectedRotation(0, 0, 0);
    });

    it('rotate the camera to requested angles and emit an expected event', (done: DoneFn) => {
      assertViewportViewChangedEventFired('rotate', 1);
      assertExpectedRotation(0, 0, 0);
      service.rotate({ rx: 0.1, ry: 0.1, rz: 0.1 });
      assertExpectedRotation(0.1, 0.1, 0.1);
      done();
    });

  });

  describe('setFoV should ', () => {

    it('have not effect if the arg is falsy', () => {
      assertExpectedFov(30);
      service.setFoV(undefined);
      assertExpectedFov(30);
    });

    it('have not effect if the arg is negative', () => {
      assertExpectedFov(30);
      service.setFoV(-10);
      assertExpectedFov(30);
    });

    it('set the expected field of view and emit an expected event', (done: DoneFn) => {
      assertViewportViewChangedEventFired('setFoV', 1, done);
      assertExpectedFov(30);
      service.setFoV(50);
      assertExpectedFov(50);
    });

  });

  it('alignNSAxis should set the view centered to expected angles and emit an expected event', (done: DoneFn) => {
    assertViewportViewChangedEventFired('alignNSAxis', 2, done);
    assertExpectedRotation(0, 0, 0);
    service.centerView({ rightAscension: 10, declination: 25 });
    service.alignNSAxis();
    assertExpectedRotation(2.785, -1.102, 1.175);
  });

  it('getViewCenterCoordinates should return expected coordinates', () => {
    const initial = service.getViewCenterCoordinates();
    assertExpectedPoint(initial, new Vector3(0, 0, -2.1));
    service.centerView({ rightAscension: 10, declination: 25 });
    const changed = service.getViewCenterCoordinates();
    assertExpectedPoint(changed, new Vector3(1.874, 0.330, 0.887));
  });

  it('isPointBehind should return true if the arg is falsy', () => {
    expect(service.isPointBehind(undefined)).toBeTrue();
  });

  describe('getOnScreenPosition should return', () => {

    it('expected NaN coordinates if the arg is falsy', () => {
      const coords = service.getOnScreenPosition(undefined);
      expect(coords).toBeDefined();
      expect(coords.x).toBeNaN();
      expect(coords.y).toBeNaN();
    });

    it('expected coordinates', () => {
      const coords = service.getOnScreenPosition(toVector3(51.745747, 18.79993, 2));
      expect(coords).toBeDefined();
      expect(coords.x).toBeCloseTo(-1636, 0);
      expect(coords.y).toBeCloseTo(2883, 0);
    });

  });

});
