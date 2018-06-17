import { DraggableElementsHandler } from './draggable-elements-handler';
import { TestBed } from '@angular/core/testing';

describe('DraggableElementsHandler', () => {

  let service: DraggableElementsHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [DraggableElementsHandler] });
    service = TestBed.get(DraggableElementsHandler);
  });

  const newHtmlElement = (): HTMLElement => {
    const element = document.createElement('div');
    return element;
  };

  it('#isDraggable should return false for undefined arg', () => {
    expect(service.isDraggable(undefined)).toBeFalsy();
  });

  it('#isDraggable should return false if the element is not draggable', () => {
    expect(service.isDraggable(newHtmlElement())).toBeFalsy();
  });

  it('#isDraggable should return false if the element was first draggable, then disabled', () => {
    const element = newHtmlElement();
    service.makeDraggable(element);
    service.disableDragging(element);
    expect(service.isDraggable(element)).toBeFalsy();
  });

  it('#isDraggable should return true if the element is draggable', () => {
    const element = newHtmlElement();
    service.makeDraggable(element);
    expect(service.isDraggable(element)).toBeTruthy();
  });

  it('#isDraggable should return false if the arg is an element very similar to a draggable one', () => {
    const element = newHtmlElement();
    service.makeDraggable(element);
    expect(service.isDraggable(newHtmlElement())).toBeFalsy();
  });

  it('#makeDraggable should throw expected error if the element is already draggable', () => {
    const element = newHtmlElement();
    service.makeDraggable(element);
    expect(() => service.makeDraggable(element)).toThrow(new Error('This HTMLElement is already draggable!'));
  });

  it('#makeDraggable should make element draggable', () => {
    const element = newHtmlElement();
    service.makeDraggable(element);
    expect(service.isDraggable(element)).toBeTruthy();
  });

  it('#disableDragging should unmake element draggable', () => {
    const element = newHtmlElement();
    service.makeDraggable(element);
    service.disableDragging(element);
    expect(service.isDraggable(element)).toBeFalsy();
  });

});
