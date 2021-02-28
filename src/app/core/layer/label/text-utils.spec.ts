import { IRRELEVANT, textStyle } from '#core-theme/abstract-factories.spec';
import { applyStyleOn } from '#core-layer/label/text-utils';

describe('text-utils', () => {

  describe('applyStyleOn should', () => {

    describe('throw expected error', () => {

      it('for undefined style arg', () => {
        const element = document.createElement('div');
        expect(() => applyStyleOn(undefined, element))
          .toThrow(new Error('style arg must be defined, but was \'undefined\''));
      });

      it('for undefined element arg', () => {
        expect(() => applyStyleOn(textStyle(), undefined))
          .toThrow(new Error('element arg must be defined, but was \'undefined\''));
      });

    });

    describe('assign expected', () => {

      it('font size', () => {
        const style = textStyle('10px');
        const element = document.createElement('div');
        applyStyleOn(style, element);
        expect(element.style.fontSize).toBe(style.fontSize);
      });

      it('font family', () => {
        const style = textStyle(IRRELEVANT, 'arial');
        const element = document.createElement('div');
        applyStyleOn(style, element);
        expect(element.style.fontFamily).toBe(style.fontFamily);
      });

      it('font style', () => {
        const style = textStyle(IRRELEVANT, IRRELEVANT, 'italic');
        const element = document.createElement('div');
        applyStyleOn(style, element);
        expect(element.style.fontStyle).toBe(style.fontStyle);
      });

      it('font weight', () => {
        const style = textStyle(IRRELEVANT, IRRELEVANT, IRRELEVANT, 'normal');
        const element = document.createElement('div');
        applyStyleOn(style, element);
        expect(element.style.fontWeight).toBe(style.fontWeight);
      });

      it('color', () => {
        const style = textStyle(IRRELEVANT, IRRELEVANT, IRRELEVANT, IRRELEVANT, 'black');
        const element = document.createElement('div');
        applyStyleOn(style, element);
        expect(element.style.color).toBe(style.color);
      });

    });

  });

});
