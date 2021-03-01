import { assertTextStyleBuilt, emptyThemeDef, textStyle } from '#core/models/abstract-factories.spec';
import { Layers } from '#core/models/layers';
import { StarsTextStyleFactory } from '#core/models/stars-text-style-factory';
import { ThemeDefinition } from '#core/models/theme-definition';

describe('StarsTextStyleFactory', () => {

  const factory = new StarsTextStyleFactory();

  const themeDef: ThemeDefinition = Object.create(emptyThemeDef);

  themeDef.stars.names.proper = textStyle('size2', 'fam2', 'style2', 'weight2', 'color2');
  themeDef.stars.names.standard = textStyle('size3', 'fam3', 'style3', 'weight3', 'color3');

  it('constructor should initialize targetLayerName field', () => {
    expect(factory.layerName).toBe(Layers.STARS);
  });

  describe('buildTextStyles should', () => {

    it('throw expected error if themeDef is undefined', () => {
      const expectedMessage = 'Missing theme definition in StarsTextStyleFactory';
      expect(() => factory.buildTextStyles(undefined)).toThrow(new Error(expectedMessage));
    });

    it('return expected text styles map', () => {
      const styles = factory.buildTextStyles(themeDef);
      expect(styles).toBeDefined();
      expect(styles.size).toBe(2);
      assertTextStyleBuilt(styles, 'names-proper', textStyle('size2', 'fam2', 'style2', 'weight2', 'color2'));
      assertTextStyleBuilt(styles, 'names-standard', textStyle('size3', 'fam3', 'style3', 'weight3', 'color3'));
    });

  });

});
