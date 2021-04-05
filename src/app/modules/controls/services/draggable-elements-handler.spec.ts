import { DraggableElementsHandler } from '#controls/services/draggable-elements-handler';

describe('DraggableElementsHandler', () => {

  let handler: DraggableElementsHandler;

  beforeEach(() => {
    handler = new DraggableElementsHandler();
  });

  const newHtmlElement = (): HTMLElement => {
    const element = document.createElement('div');
    return element;
  };

  describe('isDraggable should return', () => {

    describe('false', () => {

      it('for undefined arg', () => {
        expect(handler.isDraggable(undefined)).toBeFalse();
      });

      it('if the element is not draggable', () => {
        expect(handler.isDraggable(newHtmlElement())).toBeFalse();
      });

      it('if the element was first draggable, then disabled', () => {
        const element = newHtmlElement();
        handler.makeDraggable(element);
        handler.disableDragging(element);
        expect(handler.isDraggable(element)).toBeFalse();
      });

      it('if the arg is an element very similar to a draggable one', () => {
        const element = newHtmlElement();
        handler.makeDraggable(element);
        expect(handler.isDraggable(newHtmlElement())).toBeFalse();
      });

    });
    it('true if the element is draggable', () => {
      const element = newHtmlElement();
      handler.makeDraggable(element);
      expect(handler.isDraggable(element)).toBeTrue();
    });

  });

  describe('makeDraggable should', () => {

    it('throw expected error if the element is already draggable', () => {
      const element = newHtmlElement();
      handler.makeDraggable(element);
      expect(() => handler.makeDraggable(element)).toThrow(new Error('This HTMLElement is already draggable!'));
    });

    it('make element draggable', () => {
      const element = newHtmlElement();
      handler.makeDraggable(element);
      expect(handler.isDraggable(element)).toBeTrue();
    });

  });

  it('disableDragging should unmake element draggable', () => {
    const element = newHtmlElement();
    handler.makeDraggable(element);
    handler.disableDragging(element);
    expect(handler.isDraggable(element)).toBeFalse();
  });

});
