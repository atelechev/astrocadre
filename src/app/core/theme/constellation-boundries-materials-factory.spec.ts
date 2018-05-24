import { ConstellationBoundariesMaterialsFactory } from './constellation-boundaries-materials-factory';
import { ThemeDefinition } from './theme-definition';
import { Layers } from '../layers';
import { LineBasicMaterial } from 'three';
import { assertColorsSame, assertLineBasicMaterialBuilt, emptyTextStyle, emptyThemeDef } from './materials-factory.spec';


describe('ConstellationBoundariesMaterialsFactory', () => {

  const factory = new ConstellationBoundariesMaterialsFactory();

  const themeDef: ThemeDefinition = emptyThemeDef;

  emptyThemeDef.constellation.boundaries = {
      line: {
        common: 'rgb(3, 3, 3)'
      }
    };

  it('#constructor should initialize targetLayerName field', () => {
    expect(factory.targetLayerName).toBe(Layers.CONSTELLATION_BOUNDARIES);
  });

  it('#buildMaterials should throw expected error if themeDef is undefined', () => {
    const expectedMessage = 'Missing theme definition in MaterialsFactory for layer constellation-boundaries';
    expect(() => factory.buildMaterials(undefined)).toThrow(new Error(expectedMessage));
  });

  it('#buildMaterials should return expected materials map', () => {
    const materials = factory.buildMaterials(themeDef);
    expect(materials).toBeDefined();
    expect(materials.size).toBe(1);
    assertLineBasicMaterialBuilt(materials, 'line-common', new LineBasicMaterial({ color: 'rgb(3, 3, 3)' }));
  });

});
