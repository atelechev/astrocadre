import { TestBed } from '@angular/core/testing';
import { CameraControlsComponent } from '#controls/components/camera-controls/camera-controls.component';
import { ViewportEventService } from '#core/services/viewport-event.service';

describe('CameraControlsComponent', () => {

  let component: CameraControlsComponent;
  let viewportEventService: ViewportEventService;

  const precision = 3;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CameraControlsComponent,
        ViewportEventService
      ]
    });
    component = TestBed.inject(CameraControlsComponent);
    viewportEventService = TestBed.inject(ViewportEventService);
  });

  it('alignNSAxis should trigger axis alignment request event', () => {
    viewportEventService.requestAxisAlignment$.subscribe(
      (event) => expect(event).toBeUndefined()
    );
    component.alignNSAxis();
  });

  it('changeFov should trigger FOV change request event', () => {
    viewportEventService.requestFov$.subscribe(
      (fov) => expect(fov).toBe(100)
    );
    component.changeFov(100);
  });

  it('rotateView should trigger camera rotation request event', () => {
    viewportEventService.requestAxialRotation$.subscribe(
      (rotation) => {
        expect(rotation.rx).toBeCloseTo(0.017, precision);
        expect(rotation.ry).toBeCloseTo(0.035, precision);
        expect(rotation.rz).toBeCloseTo(0.052, precision);
      }
    );
    component.rotateView(1, 2, 3);
  });

});
