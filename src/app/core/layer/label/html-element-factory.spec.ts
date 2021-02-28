import { HtmlElementFactory } from '#core-layer/label/html-element-factory';

describe('HtmlElementFactory', () => {

  const factory = HtmlElementFactory;

  describe('newLabel should', () => {

    describe('throw expected error', () => {

      it('if layerName arg is undefined', () => {
        expect(() => factory.newLabel(undefined, 'style1', 'test1'))
          .toThrow(new Error('layerName arg must be defined, but was \'undefined\''));
      });

      it('if styleKey arg is undefined', () => {
        expect(() => factory.newLabel('layer2', undefined, 'test2'))
          .toThrow(new Error('styleKey arg must be defined, but was \'undefined\''));
      });

    });

    it('return expected HTMLElement for valid parameters', () => {
      const element = factory.newLabel('layer3', 'style3', 'test3');
      expect(element.tagName).toBe('DIV');
      expect(element.className).toBe('label_layer3_style3');
      expect(element.style.position).toBe('absolute');
      expect(element.style.zIndex).toBe('100');
      expect(element.textContent).toBe('test3');
    });

  });

});
