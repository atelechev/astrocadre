import { TestBed } from '@angular/core/testing';
import { CameraService } from 'src/app/modules2/core/services/camera.service';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { ViewportService } from 'src/app/modules2/core/services/viewport.service';
import { Vector3 } from 'three';


describe('CameraService', () => {

  let service: CameraService;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        providers: [
          CameraService,
          EventsService,
          ViewportService
        ]
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

  it('camera should return defined camera with expected origin and rotation', () => {
    const camera = service.camera;
    expect(camera).toBeDefined();
    expect(camera.position.x).toBe(0);
    expect(camera.position.y).toBe(0);
    expect(camera.position.z).toBe(0);
    assertExpectedRotation(0, 0, 0);
  });

  it('centerView should set the view centered to expected angles', () => {
    assertExpectedRotation(0, 0, 0);
    service.centerView({ rightAscension: 10, declination: 25 });
    assertExpectedRotation(2.785, -1.102, 1.175);
  });

  it('rotate should rotate the camera to requested angles', () => {
    assertExpectedRotation(0, 0, 0);
    service.rotate({ rx: 0.1, ry: 0.1, rz: 0.1 });
    assertExpectedRotation(0.1, 0.1, 0.1);
  });

  it('setFoV should set the expected field of view', () => {
    assertExpectedFov(30);
    service.setFoV(50);
    assertExpectedFov(50);
  });

  it('alignNSAxis should set the view centered to expected angles', () => {
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

});
