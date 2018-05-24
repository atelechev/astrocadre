import { SkyGridMaterialsFactory } from './sky-grid-materials-factory';
import { ThemeDefinition } from './theme-definition';
import { TextStyle } from '../text-style';
import { Layers } from '../layers';
import { Material, LineBasicMaterial, Color } from 'three';


describe('SkyGridMaterialsFactory', () => {

  const factory = new SkyGridMaterialsFactory();

  const emptyTextStyle: TextStyle = {
    fontSize: 'irrelevant',
    fontFamily: 'irrelevant',
    fontStyle: 'irrelevant',
    fontWeight: 'irrelevant',
    color: 'irrelevant',
  };

  const themeDef: ThemeDefinition = {
    name: 'test',
    background: {
      color: 'irrelevant'
    },
    skyGrid: {
      line: {
        common: 'rgb(1, 1, 1)',
        reference: 'rgb(2, 2, 2)'
      }
    },
    constellation: {
      boundaries: {
        line: {
          common: 'irrelevant'
        }
      },
      lines: {
        line: {
          common: 'irrelevant'
        }
      },
      names: emptyTextStyle
    },
    stars: {
      magnitudes: [],
      texture: {
        image: 'irrelevant',
        sizeMultiplier: 0
      },
      names: {
        proper: emptyTextStyle,
        standard: emptyTextStyle
      }
    }
  };

  const assertColorsSame = (color1: Color, color2: Color) => {
    expect(color1).toBeDefined();
    expect(color2).toBeDefined();
    expect(color1.r).toBe(color2.r);
    expect(color1.g).toBe(color2.g);
    expect(color1.b).toBe(color2.b);
  };

  const assertMaterialBuilt = (materials: Map<string, Material>, key: string, expectedMaterial: LineBasicMaterial) => {
    expect(materials.has(key)).toBeTruthy();
    const material = materials.get(key);
    expect(material).toBeDefined();
    expect(material instanceof LineBasicMaterial).toBeTruthy();
    assertColorsSame((<LineBasicMaterial> material).color, expectedMaterial.color);
  };

  it('#constructor should initialize targetLayerName field', () => {
    expect(factory.targetLayerName).toBe(Layers.SKY_GRID);
  });

  it('#buildMaterials should throw expected error if themeDef is undefined', () => {
    expect(() => factory.buildMaterials(undefined)).toThrow(new Error('Missing theme definition in MaterialsFactory for layer sky-grid'));
  });

  it('#buildMaterials should return expected materials map', () => {
    const materials = factory.buildMaterials(themeDef);
    expect(materials).toBeDefined();
    expect(materials.size).toBe(2);
    assertMaterialBuilt(materials, 'line-common', new LineBasicMaterial({ color: 'rgb(1, 1, 1)' }));
    assertMaterialBuilt(materials, 'line-reference', new LineBasicMaterial({ color: 'rgb(2, 2, 2)' }));
  });

});
