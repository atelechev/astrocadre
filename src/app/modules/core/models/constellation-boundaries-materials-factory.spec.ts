import { LineBasicMaterial } from 'three';
import { assertLineBasicMaterialBuilt, emptyThemeDef } from '#core/models/abstract-factories.spec';
import { ConstellationBoundariesMaterialsFactory } from '#core/models/constellation-boundaries-materials-factory';
import { Layers } from '#core/models/layers';
import { ThemeDefinition } from '#core/models/theme-definition';


describe('ConstellationBoundariesMaterialsFactory', () => {

  const factory = new ConstellationBoundariesMaterialsFactory();

  const themeDef: ThemeDefinition = Object.create(emptyThemeDef);

  themeDef.constellation.boundaries = {
    line: {
      common: 'rgb(3, 3, 3)'
    }
  };

  it('constructor should initialize targetLayerName field', () => {
    expect(factory.layerName).toBe(Layers.CONSTELLATION_BOUNDARIES);
  });

  describe('buildMaterials should', () => {

    it('throw expected error if themeDef is undefined', () => {
      const expectedMessage = 'Missing theme definition in ConstellationBoundariesMaterialsFactory';
      expect(() => factory.buildMaterials(undefined)).toThrow(new Error(expectedMessage));
    });

    it('return expected materials map', () => {
      const materials = factory.buildMaterials(themeDef);
      expect(materials).toBeDefined();
      expect(materials.size).toBe(1);
      assertLineBasicMaterialBuilt(materials, 'line-common', new LineBasicMaterial({ color: 'rgb(3, 3, 3)' }));
    });

  });

});