import { TestBed } from '@angular/core/testing';
import { CameraControlsComponent } from './camera-controls.component';
import { ViewportEventService } from '../core/viewport/viewport-event.service';

describe('CameraControlsComponent', () => {

  let service: CameraControlsComponent;
  let viewportEventService: ViewportEventService;

  const precision = 3;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CameraControlsComponent,
        ViewportEventService
      ] });
    service = TestBed.get(CameraControlsComponent);
    viewportEventService = TestBed.get(ViewportEventService);
  });

  it('#alignNSAxis should trigger axis alignment request event', () => {
    viewportEventService.requestAxisAlignment$.subscribe(
      (event) => expect(event).toBeUndefined()
    );
    service.alignNSAxis();
  });

  it('#changeFov should trigger FOV change request event', () => {
    viewportEventService.requestFov$.subscribe(
      (fov) => expect(fov).toBe(100)
    );
    service.changeFov(100);
  });

  it('#rotateView should trigger camera rotation request event', () => {
    viewportEventService.requestAxialRotation$.subscribe(
      (rotation) => {
        expect(rotation.rx).toBeCloseTo(0.017, precision);
        expect(rotation.ry).toBeCloseTo(0.035, precision);
        expect(rotation.rz).toBeCloseTo(0.052, precision);
      }
    );
    service.rotateView(1, 2, 3);
  });

  it('#ngAfterViewInit should trigger camera rotation request event', () => {
    viewportEventService.requestAxialRotation$.subscribe(
      (rotation) => {
        expect(rotation.rx).toBeCloseTo(Math.PI / 2, precision);
        expect(rotation.ry).toBe(0);
        expect(rotation.rz).toBe(0);
      }
    );
    service.ngAfterViewInit();
  });

});
