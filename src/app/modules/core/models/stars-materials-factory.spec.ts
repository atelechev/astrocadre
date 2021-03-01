import { pointsMaterial } from '#core/models/abstract-factories.spec';
import { assertPointsMaterialBuilt, emptyThemeDef, textStyle } from '#core/models/abstract-factories.spec';
import { Layers } from '#core/models/layers';
import { StarsMaterialsFactory } from '#core/models/stars-materials-factory';
import { ThemeDefinition } from '#core/models/theme-definition';


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

  it('constructor should initialize targetLayerName field', () => {
    expect(factory.layerName).toBe(Layers.STARS);
  });

  describe('buildMaterials should', () => {

    it('throw expected error if themeDef is undefined', () => {
      const expectedMessage = 'Missing theme definition in StarsMaterialsFactory';
      expect(() => factory.buildMaterials(undefined)).toThrow(new Error(expectedMessage));
    });

    it('return expected materials map', () => {
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

});
