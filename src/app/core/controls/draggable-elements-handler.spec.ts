import { TestBed } from '@angular/core/testing';
import { DraggableElementsHandler } from '#core-controls/draggable-elements-handler';

describe('DraggableElementsHandler', () => {

  let service: DraggableElementsHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [DraggableElementsHandler] });
    service = TestBed.inject(DraggableElementsHandler);
  });

  const newHtmlElement = (): HTMLElement => {
    const element = document.createElement('div');
    return element;
  };

  describe('isDraggable should return', () => {

    describe('false', () => {

      it('for undefined arg', () => {
        expect(service.isDraggable(undefined)).toBeFalsy();
      });

      it('if the element is not draggable', () => {
        expect(service.isDraggable(newHtmlElement())).toBeFalsy();
      });

      it('if the element was first draggable, then disabled', () => {
        const element = newHtmlElement();
        service.makeDraggable(element);
        service.disableDragging(element);
        expect(service.isDraggable(element)).toBeFalsy();
      });

      it('if the arg is an element very similar to a draggable one', () => {
        const element = newHtmlElement();
        service.makeDraggable(element);
        expect(service.isDraggable(newHtmlElement())).toBeFalsy();
      });

    });
    it('true if the element is draggable', () => {
      const element = newHtmlElement();
      service.makeDraggable(element);
      expect(service.isDraggable(element)).toBeTruthy();
    });

  });

  describe('makeDraggable should', () => {

    it('throw expected error if the element is already draggable', () => {
      const element = newHtmlElement();
      service.makeDraggable(element);
      expect(() => service.makeDraggable(element)).toThrow(new Error('This HTMLElement is already draggable!'));
    });

    it('make element draggable', () => {
      const element = newHtmlElement();
      service.makeDraggable(element);
      expect(service.isDraggable(element)).toBeTruthy();
    });

  });

  it('disableDragging should unmake element draggable', () => {
    const element = newHtmlElement();
    service.makeDraggable(element);
    service.disableDragging(element);
    expect(service.isDraggable(element)).toBeFalsy();
  });

});
