import { TestBed } from '@angular/core/testing';
import { MouseEventsHandler } from '#viewport/mouse-events-handler';
import { ViewportEventService } from '#core-viewport/viewport-event.service';

describe('MouseEventsHandler', () => {

  let service: MouseEventsHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ViewportEventService, MouseEventsHandler] });
    service = TestBed.get(MouseEventsHandler);
  });

  const newElement = () => document.createElement('div');

  it('#initMouseListenersOn should initialize mouse down event', () => {
    const element = newElement();
    expect(element.onmousedown).toBeNull();

    service.initMouseListenersOn(element);
    expect(element.onmousedown).toBeDefined();
  });

  it('#initMouseListenersOn should initialize mouse up event', () => {
    const element = newElement();
    expect(element.onmouseup).toBeNull();

    service.initMouseListenersOn(element);
    expect(element.onmouseup).toBeDefined();
  });

  it('#initMouseListenersOn should initialize mouse leave event', () => {
    const element = newElement();
    expect(element.onmouseleave).toBeNull();

    service.initMouseListenersOn(element);
    expect(element.onmouseleave).toBeDefined();
  });

  it('#initMouseListenersOn should initialize mouse move event', () => {
    const element = newElement();
    expect(element.onmousemove).toBeNull();

    service.initMouseListenersOn(element);
    expect(element.onmousemove).toBeDefined();
  });

  it('#initMouseListenersOn should initialize double click event', () => {
    const element = newElement();
    expect(element.ondblclick).toBeNull();

    service.initMouseListenersOn(element);
    expect(element.ondblclick).toBeDefined();
  });

});
