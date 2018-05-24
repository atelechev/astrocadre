import { ConstellationLinesMaterialsFactory } from './constellation-lines-materials-factory';
import { ThemeDefinition } from './theme-definition';
import { Layers } from '../layers';
import { LineBasicMaterial } from 'three';
import { assertColorsSame, assertLineBasicMaterialBuilt, emptyTextStyle, emptyThemeDef } from './materials-factory.spec';


describe('ConstellationLinesMaterialsFactory', () => {

  const factory = new ConstellationLinesMaterialsFactory();

  const themeDef: ThemeDefinition = Object.create(emptyThemeDef);

  themeDef.constellation.lines = {
      line: {
        common: 'rgb(4, 4, 4)'
      }
    };

  it('#constructor should initialize targetLayerName field', () => {
    expect(factory.targetLayerName).toBe(Layers.CONSTELLATION_LINES);
  });

  it('#buildMaterials should throw expected error if themeDef is undefined', () => {
    const expectedMessage = 'Missing theme definition in MaterialsFactory for layer constellation-lines';
    expect(() => factory.buildMaterials(undefined)).toThrow(new Error(expectedMessage));
  });

  it('#buildMaterials should return expected materials map', () => {
    const materials = factory.buildMaterials(themeDef);
    expect(materials).toBeDefined();
    expect(materials.size).toBe(1);
    assertLineBasicMaterialBuilt(materials, 'line-common', new LineBasicMaterial({ color: 'rgb(4, 4, 4)' }));
  });

});
