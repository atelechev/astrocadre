import { SkyGridMaterialsFactory } from './sky-grid-materials-factory';
import { ThemeDefinition } from './theme-definition';
import { Layers } from '../layers';
import { Material, LineBasicMaterial, Color } from 'three';
import { assertColorsSame, assertLineBasicMaterialBuilt, emptyTextStyle, emptyThemeDef } from './materials-factory.spec';


describe('SkyGridMaterialsFactory', () => {

  const factory = new SkyGridMaterialsFactory();

  const themeDef: ThemeDefinition = emptyThemeDef;

  emptyThemeDef.skyGrid = {
      line: {
        common: 'rgb(1, 1, 1)',
        reference: 'rgb(2, 2, 2)'
      }
    };

  it('#constructor should initialize targetLayerName field', () => {
    expect(factory.targetLayerName).toBe(Layers.SKY_GRID);
  });

  it('#buildMaterials should throw expected error if themeDef is undefined', () => {
    const expectedMessage = 'Missing theme definition in MaterialsFactory for layer sky-grid';
    expect(() => factory.buildMaterials(undefined)).toThrow(new Error(expectedMessage));
  });

  it('#buildMaterials should return expected materials map', () => {
    const materials = factory.buildMaterials(themeDef);
    expect(materials).toBeDefined();
    expect(materials.size).toBe(2);
    assertLineBasicMaterialBuilt(materials, 'line-common', new LineBasicMaterial({ color: 'rgb(1, 1, 1)' }));
    assertLineBasicMaterialBuilt(materials, 'line-reference', new LineBasicMaterial({ color: 'rgb(2, 2, 2)' }));
  });

});
