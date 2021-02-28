import { Layers } from '#core/layers';
import { ThemeDefinition } from '#core-theme/theme-definition';
import {
  assertTextStyleBuilt,
  emptyThemeDef,
  textStyle
} from '#core-theme/abstract-factories.spec';
import { ConstellationNamesTextStylesFactory } from '#core-theme/constellation-names-text-style-factory';

describe('ConstellationNamesTextStylesFactory', () => {

  const factory = new ConstellationNamesTextStylesFactory();

  const themeDef: ThemeDefinition = Object.create(emptyThemeDef);

  themeDef.constellation.names = textStyle('size1', 'fam1', 'style1', 'weight1', 'color1');

  it('#constructor should initialize targetLayerName field', () => {
    expect(factory.layerName).toBe(Layers.CONSTELLATION_NAMES);
  });

  it('#buildTextStyles should throw expected error if themeDef is undefined', () => {
    const expectedMessage = 'Missing theme definition in ConstellationNamesTextStylesFactory';
    expect(() => factory.buildTextStyles(undefined)).toThrow(new Error(expectedMessage));
  });

  it('#buildTextStyles should return expected text styles map', () => {
    const styles = factory.buildTextStyles(themeDef);
    expect(styles).toBeDefined();
    expect(styles.size).toBe(1);
    const expectedStyle = textStyle('size1', 'fam1', 'style1', 'weight1', 'color1');
    assertTextStyleBuilt(styles, 'labels', expectedStyle);
  });

});
