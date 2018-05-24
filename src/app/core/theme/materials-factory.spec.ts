import { Material, LineBasicMaterial, Color } from 'three';
import { TextStyle } from '../text-style';
import { ThemeDefinition } from './theme-definition';

export const emptyTextStyle: TextStyle = {
  fontSize: 'irrelevant',
  fontFamily: 'irrelevant',
  fontStyle: 'irrelevant',
  fontWeight: 'irrelevant',
  color: 'irrelevant',
};

export const emptyThemeDef: ThemeDefinition = {
  name: 'test',
  background: {
    color: 'irrelevant'
  },
  skyGrid: {
    line: {
      common: 'irrelevant',
      reference: 'irrelevant'
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

export const assertColorsSame = (color1: Color, color2: Color) => {
  expect(color1).toBeDefined();
  expect(color2).toBeDefined();
  expect(color1.r).toBe(color2.r);
  expect(color1.g).toBe(color2.g);
  expect(color1.b).toBe(color2.b);
};

export const assertLineBasicMaterialBuilt = (materials: Map<string, Material>,
                                             key: string,
                                             expectedMaterial: LineBasicMaterial) => {
  expect(materials.has(key)).toBeTruthy();
  const material = materials.get(key);
  expect(material).toBeDefined();
  expect(material instanceof LineBasicMaterial).toBeTruthy();
  assertColorsSame((<LineBasicMaterial> material).color, expectedMaterial.color);
};
