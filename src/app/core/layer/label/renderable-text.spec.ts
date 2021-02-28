import { Vector3 } from 'three';
import { Layers } from '#core/layers';
import { emptyThemeDef, textStyle } from '#core-theme/abstract-factories.spec';
import { Theme } from '#core-theme/theme';
import { ThemeDefinition } from '#core-theme/theme-definition';
import { RenderableText } from '#core-layer/label/renderable-text';
import { TextOffsetPolicies } from '#core-layer/label/text-offset-policy';

describe('RenderableText', () => {

  const newVector = () => new Vector3();

  const themeDef: ThemeDefinition = Object.create(emptyThemeDef);

  themeDef.constellation.names = textStyle('16px', 'dialog', 'normal', 'bold');

  const theme = new Theme(themeDef);

  const ensureOffsetsExpected = (offsetX: number, offsetY: number, renderable: RenderableText) => {
    expect(renderable.getOffsetX()).toBe(offsetX);
    expect(renderable.getOffsetY()).toBe(offsetY);
  };

  describe('constructor should throw expected error', () => {

    it('if parentLayer arg is undefined', () => {
      expect(() => new RenderableText(undefined, 'style1', newVector(), 'test1', TextOffsetPolicies.TOP_RIGHT))
        .toThrow(new Error('layerName arg must be defined, but was \'undefined\''));
    });

    it('if styleKey arg is undefined', () => {
      expect(() => new RenderableText('layer2', undefined, newVector(), 'test2', TextOffsetPolicies.TOP_RIGHT))
        .toThrow(new Error('styleKey arg must be defined, but was \'undefined\''));
    });

    it('if position arg is undefined', () => {
      expect(() => new RenderableText('layer3', 'style3', undefined, 'test3', TextOffsetPolicies.TOP_RIGHT))
        .toThrow(new Error('position arg must be defined, but was \'undefined\''));
    });

    it('if offsetPolicy arg is undefined', () => {
      expect(() => new RenderableText('layer4', 'style4', newVector(), 'test4', undefined))
        .toThrow(new Error('offsetPolicy arg must be defined, but was \'undefined\''));
    });

  });

  it('getHtmlElement should return the underlying HTMLElement', () => {
    const renderable = new RenderableText('layer5', 'style5', newVector(), 'test5', TextOffsetPolicies.TOP_RIGHT);
    expect(renderable.getHtmlElement()).toBeTruthy();
  });

  describe('setVisible should', () => {

    it('hide the underlying HTMLElement if false', () => {
      const renderable = new RenderableText('layer5', 'style5', newVector(), 'test5', TextOffsetPolicies.TOP_RIGHT);
      renderable.setVisible(false);
      expect(renderable.getHtmlElement().style.display).toBe('none');
    });

    it('display the underlying HTMLElement if true', () => {
      const renderable = new RenderableText('layer5', 'style5', newVector(), 'test5', TextOffsetPolicies.TOP_RIGHT);
      renderable.setVisible(true);
      expect(renderable.getHtmlElement().style.display).toBe('initial');
    });

  });

  it('getOffsetX should return the expected X and Y offsets', () => {
    const renderable = new RenderableText(Layers.CONSTELLATION_NAMES, 'labels', newVector(), 'test5', TextOffsetPolicies.CENTERED);
    renderable.useTheme(theme);
    ensureOffsetsExpected(-16, -8, renderable);
  });

  it('useTheme should recalculate the offsets', () => {
    const renderable = new RenderableText(Layers.CONSTELLATION_NAMES, 'labels', newVector(), 'test6', TextOffsetPolicies.CENTERED);
    ensureOffsetsExpected(0, 0, renderable);
    renderable.useTheme(theme);
    ensureOffsetsExpected(-16, -8, renderable);
  });

});
