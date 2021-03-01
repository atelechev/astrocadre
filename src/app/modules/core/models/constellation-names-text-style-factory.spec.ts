import { assertTextStyleBuilt, emptyThemeDef, textStyle } from '#core/models/abstract-factories.spec';
import { ConstellationNamesTextStylesFactory } from '#core/models/constellation-names-text-style-factory';
import { Layers } from '#core/models/layers';
import { ThemeDefinition } from '#core/models/theme-definition';

describe('ConstellationNamesTextStylesFactory', () => {

  const factory = new ConstellationNamesTextStylesFactory();

  let themeDef: ThemeDefinition;

  beforeEach(() => {
    themeDef = Object.create(emptyThemeDef);
    themeDef.constellation.names = textStyle('size1', 'fam1', 'style1', 'weight1', 'color1');
  });

  it('constructor should initialize targetLayerName field', () => {
    expect(factory.layerName).toBe(Layers.CONSTELLATION_NAMES);
  });

  describe('buildTextStyles should', () => {

    it('throw expected error if themeDef is undefined', () => {
      const expectedMessage = 'Missing theme definition in ConstellationNamesTextStylesFactory';
      expect(() => factory.buildTextStyles(undefined)).toThrow(new Error(expectedMessage));
    });

    it('return expected text styles map', () => {
      const styles = factory.buildTextStyles(themeDef);
      expect(styles).toBeDefined();
      expect(styles.size).toBe(1);
      const expectedStyle = textStyle('size1', 'fam1', 'style1', 'weight1', 'color1');
      assertTextStyleBuilt(styles, 'labels', expectedStyle);
    });

  });

});
