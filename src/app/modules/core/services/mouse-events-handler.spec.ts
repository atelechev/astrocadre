import { TestBed } from '@angular/core/testing';
import { CameraService } from '#core/services/camera.service';
import { MouseEventsHandler } from '#core/services/mouse-events-handler';
import { ViewportService } from '#core/services/viewport.service';


describe('MouseEventsHandler', () => {

  let service: MouseEventsHandler;
  let element: HTMLDivElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CameraService,
        MouseEventsHandler,
        ViewportService
      ]
    });
    service = TestBed.inject(MouseEventsHandler);
    element = document.createElement('div');
  });

  describe('initMouseListenersOn should initialize', () => {

    it('mouse down event', () => {
      expect(element.onmousedown).toBeNull();

      service.initMouseListenersOn(element);
      expect(element.onmousedown).toBeDefined();
    });

    it('mouse up event', () => {
      expect(element.onmouseup).toBeNull();

      service.initMouseListenersOn(element);
      expect(element.onmouseup).toBeDefined();
    });

    it('mouse leave event', () => {
      expect(element.onmouseleave).toBeNull();

      service.initMouseListenersOn(element);
      expect(element.onmouseleave).toBeDefined();
    });

    it('mouse move event', () => {
      expect(element.onmousemove).toBeNull();

      service.initMouseListenersOn(element);
      expect(element.onmousemove).toBeDefined();
    });

    it('double click event', () => {
      expect(element.ondblclick).toBeNull();

      service.initMouseListenersOn(element);
      expect(element.ondblclick).toBeDefined();
    });

  });

});
