import { ViewportEventService } from './viewport-event.service';
import { TestBed } from '@angular/core/testing';
import { AxialRotation } from './axial-rotation';
import { SkyCoordinate } from './sky-coordinate';
import { Dimension } from './dimension';

describe('ViewportEventService', () => {

  let service: ViewportEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ViewportEventService] });
    service = TestBed.get(ViewportEventService);
  });

  it('#axialRotationRequested should broadcast event for the specified params', () => {
    const rotation = { rx: 1, ry: 2, rz: 3 };
    const subscribed = service.requestAxialRotation$.subscribe(
      (ar: AxialRotation) => expect(ar).toBe(rotation)
    );
    service.axialRotationRequested(rotation);
    subscribed.unsubscribe();
  });

  it('#centerViewRequested should broadcast event for the specified params', () => {
    const coord = { rightAscension: 1, declination: 2 };
    const subscribed = service.requestCenterView$.subscribe(
      (sc: SkyCoordinate) => expect(sc).toBe(coord)
    );
    service.centerViewRequested(coord);
    subscribed.unsubscribe();
  });

  it('#fovRequested should broadcast event for the specified params', () => {
    const fov = 10;
    const subscribed = service.requestFov$.subscribe(
      (f: number) => expect(f).toBe(fov)
    );
    service.fovRequested(fov);
    subscribed.unsubscribe();
  });

  it('#axisAlignmentRequested should broadcast the event', () => {
    const subscribed = service.requestAxisAlignment$.subscribe(
      () => {} // TODO how to test it?
    );
    subscribed.unsubscribe();
  });

  it('#viewportChanged should broadcast the event', () => {
    const subscribed = service.broadcastViewportChanged$.subscribe(
      () => {} // TODO how to test it?
    );
    subscribed.unsubscribe();
  });

});
