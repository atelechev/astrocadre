import { LineBasicMaterial } from 'three';
import { Layers } from '#core/layers';
import { SkyGridMaterialsFactory } from '#core-theme/sky-grid-materials-factory';
import { ThemeDefinition } from '#core-theme/theme-definition';
import { assertLineBasicMaterialBuilt, emptyThemeDef } from '#core-theme/abstract-factories.spec';


describe('SkyGridMaterialsFactory', () => {

  const factory = new SkyGridMaterialsFactory();

  const themeDef: ThemeDefinition = Object.create(emptyThemeDef);

  themeDef.skyGrid = {
    line: {
      common: 'rgb(1, 1, 1)',
      reference: 'rgb(2, 2, 2)'
    }
  };

  it('constructor should initialize targetLayerName field', () => {
    expect(factory.layerName).toBe(Layers.SKY_GRID);
  });

  describe('buildMaterials should', () => {

    it('throw expected error if themeDef is undefined', () => {
      const expectedMessage = 'Missing theme definition in SkyGridMaterialsFactory';
      expect(() => factory.buildMaterials(undefined)).toThrow(new Error(expectedMessage));
    });

    it('return expected materials map', () => {
      const materials = factory.buildMaterials(themeDef);
      expect(materials).toBeDefined();
      expect(materials.size).toBe(2);
      assertLineBasicMaterialBuilt(materials, 'line-common', new LineBasicMaterial({ color: 'rgb(1, 1, 1)' }));
      assertLineBasicMaterialBuilt(materials, 'line-reference', new LineBasicMaterial({ color: 'rgb(2, 2, 2)' }));
    });

  });

});
