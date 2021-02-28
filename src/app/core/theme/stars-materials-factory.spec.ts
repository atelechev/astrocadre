import { Layers } from '#core/layers';
import { StarsMaterialsFactory } from '#core-theme/stars-materials-factory';
import { ThemeDefinition } from '#core-theme/theme-definition';
import { pointsMaterial } from '#core-theme/abstract-factories.spec';
import { emptyThemeDef, textStyle, assertPointsMaterialBuilt } from '#core-theme/abstract-factories.spec';


describe('StarsMaterialsFactory', () => {

  const factory = new StarsMaterialsFactory();

  const themeDef: ThemeDefinition = Object.create(emptyThemeDef);

  const magnitudes = [1, 2];

  const multiplier = 1;

  themeDef.stars.magnitudes = magnitudes;

  themeDef.stars.texture = {
    image: 'test/path/10',
    sizeMultiplier: multiplier
  };

  it('#constructor should initialize targetLayerName field', () => {
    expect(factory.layerName).toBe(Layers.STARS);
  });

  it('#buildMaterials should throw expected error if themeDef is undefined', () => {
    const expectedMessage = 'Missing theme definition in StarsMaterialsFactory';
    expect(() => factory.buildMaterials(undefined)).toThrow(new Error(expectedMessage));
  });

  it('#buildMaterials should return expected materials map', () => {
    const materials = factory.buildMaterials(themeDef);
    expect(materials).toBeDefined();
    expect(materials.size).toBe(2);
    for (const magnitude of magnitudes) {
      const key = `star-${magnitude.toFixed(1)}`;
      const expectedMaterial = pointsMaterial((6.5 - magnitude) * multiplier, 'test/path/10');
      assertPointsMaterialBuilt(materials, key, expectedMaterial);
    }
  });

});
