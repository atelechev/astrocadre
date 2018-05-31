import { applyStyleOn } from './text-utils';
import { textStyle, IRRELEVANT } from '../../theme/abstract-factories.spec';

describe('TextStyleAssigner', () => {

  it('#applyStyleOn should throw expected error for undefined style arg', () => {
    const element = document.createElement('div');
    expect(() => applyStyleOn(undefined, element))
      .toThrow(new Error('style arg must be defined, but was \'undefined\''));
  });

  it('#applyStyleOn should throw expected error for undefined element arg', () => {
    expect(() => applyStyleOn(textStyle(), undefined))
      .toThrow(new Error('element arg must be defined, but was \'undefined\''));
  });

  it('#applyStyleOn should assign expected font size', () => {
    const style = textStyle('10px');
    const element = document.createElement('div');
    applyStyleOn(style, element);
    expect(element.style.fontSize).toBe(style.fontSize);
  });

  it('#applyStyleOn should assign expected font family', () => {
    const style = textStyle(IRRELEVANT, 'arial');
    const element = document.createElement('div');
    applyStyleOn(style, element);
    expect(element.style.fontFamily).toBe(style.fontFamily);
  });

  it('#applyStyleOn should assign expected font style', () => {
    const style = textStyle(IRRELEVANT, IRRELEVANT, 'italic');
    const element = document.createElement('div');
    applyStyleOn(style, element);
    expect(element.style.fontStyle).toBe(style.fontStyle);
  });

  it('#applyStyleOn should assign expected font weight', () => {
    const style = textStyle(IRRELEVANT, IRRELEVANT, IRRELEVANT, 'normal');
    const element = document.createElement('div');
    applyStyleOn(style, element);
    expect(element.style.fontWeight).toBe(style.fontWeight);
  });

  it('#applyStyleOn should assign expected color', () => {
    const style = textStyle(IRRELEVANT, IRRELEVANT, IRRELEVANT, IRRELEVANT, 'black');
    const element = document.createElement('div');
    applyStyleOn(style, element);
    expect(element.style.color).toBe(style.color);
  });

});
