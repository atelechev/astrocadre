import { TestBed } from '@angular/core/testing';
import { MouseEventsHandler } from '#viewport/services/mouse-events-handler';
import { ViewportEventService } from '#core/services/viewport-event.service';

describe('MouseEventsHandler', () => {

  let service: MouseEventsHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ViewportEventService, MouseEventsHandler] });
    service = TestBed.inject(MouseEventsHandler);
  });

  const newElement = () => document.createElement('div');

  describe('initMouseListenersOn should initialize', () => {

    it('mouse down event', () => {
      const element = newElement();
      expect(element.onmousedown).toBeNull();

      service.initMouseListenersOn(element);
      expect(element.onmousedown).toBeDefined();
    });

    it('mouse up event', () => {
      const element = newElement();
      expect(element.onmouseup).toBeNull();

      service.initMouseListenersOn(element);
      expect(element.onmouseup).toBeDefined();
    });

    it('mouse leave event', () => {
      const element = newElement();
      expect(element.onmouseleave).toBeNull();

      service.initMouseListenersOn(element);
      expect(element.onmouseleave).toBeDefined();
    });

    it('mouse move event', () => {
      const element = newElement();
      expect(element.onmousemove).toBeNull();

      service.initMouseListenersOn(element);
      expect(element.onmousemove).toBeDefined();
    });

    it('double click event', () => {
      const element = newElement();
      expect(element.ondblclick).toBeNull();

      service.initMouseListenersOn(element);
      expect(element.ondblclick).toBeDefined();
    });

  });

});
