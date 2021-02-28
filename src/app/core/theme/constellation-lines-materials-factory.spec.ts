import { LineBasicMaterial } from 'three';
import { Layers } from '#core/layers';
import { ThemeDefinition } from '#core-theme/theme-definition';
import {
  assertLineBasicMaterialBuilt,
  emptyThemeDef
} from '#core-theme/abstract-factories.spec';
import { ConstellationLinesMaterialsFactory } from '#core-theme/constellation-lines-materials-factory';


describe('ConstellationLinesMaterialsFactory', () => {

  const factory = new ConstellationLinesMaterialsFactory();

  const themeDef: ThemeDefinition = Object.create(emptyThemeDef);

  themeDef.constellation.lines = {
    line: {
      common: 'rgb(4, 4, 4)'
    }
  };

  it('#constructor should initialize targetLayerName field', () => {
    expect(factory.layerName).toBe(Layers.CONSTELLATION_LINES);
  });

  it('#buildMaterials should throw expected error if themeDef is undefined', () => {
    const expectedMessage = 'Missing theme definition in ConstellationLinesMaterialsFactory';
    expect(() => factory.buildMaterials(undefined)).toThrow(new Error(expectedMessage));
  });

  it('#buildMaterials should return expected materials map', () => {
    const materials = factory.buildMaterials(themeDef);
    expect(materials).toBeDefined();
    expect(materials.size).toBe(1);
    assertLineBasicMaterialBuilt(materials, 'line-common', new LineBasicMaterial({ color: 'rgb(4, 4, 4)' }));
  });

});
