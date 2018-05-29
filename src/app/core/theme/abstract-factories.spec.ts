import { Material, LineBasicMaterial, Color, PointsMaterial, TextureLoader } from 'three';
import { TextStyle } from './text-style';
import { ThemeDefinition } from './theme-definition';
import { defer } from 'rxjs/observable/defer';

export const IRRELEVANT = 'irrelevant';

export const textStyle = (fSize: string = IRRELEVANT,
                          fFam: string = IRRELEVANT,
                          fStyle: string = IRRELEVANT,
                          fWeight: string = IRRELEVANT,
                          fColor: string = IRRELEVANT) => {
  return {
    fontSize: fSize,
    fontFamily: fFam,
    fontStyle: fStyle,
    fontWeight: fWeight,
    color: fColor,
  };
};

export const emptyTextStyle: TextStyle = textStyle();

export const emptyThemeDef: ThemeDefinition = {
  name: 'test',
  background: {
    color: IRRELEVANT
  },
  skyGrid: {
    line: {
      common: IRRELEVANT,
      reference: IRRELEVANT
    }
  },
  constellation: {
    boundaries: {
      line: {
        common: IRRELEVANT
      }
    },
    lines: {
      line: {
        common: IRRELEVANT
      }
    },
    names: emptyTextStyle
  },
  stars: {
    magnitudes: [],
    texture: {
      image: IRRELEVANT,
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

export const lineBasicMaterial = (color: string) => {
  return new LineBasicMaterial({ color: color });
};

export const assertLineBasicMaterialExpected = (checked: Material, expected: LineBasicMaterial) => {
  expect(checked).toBeDefined();
  expect(checked instanceof LineBasicMaterial).toBeTruthy();
  assertColorsSame((<LineBasicMaterial> checked).color, expected.color);
};

export const assertLineBasicMaterialBuilt = (materials: Map<string, Material>,
                                             key: string,
                                             expectedMaterial: LineBasicMaterial) => {
  expect(materials.has(key)).toBeTruthy();
  const material = materials.get(key);
  assertLineBasicMaterialExpected(material, expectedMaterial);
};

export const pointsMaterial = (size: number, name: string) => {
  return new PointsMaterial({ size: size,
                            sizeAttenuation: false,
                            transparent: true,
                            opacity: 0.95,
                            alphaTest: 0.05,
                            map: new TextureLoader().load(name) } );
};

export const assertPointsMaterialExpected = (checked: Material, expected: PointsMaterial) => {
  expect(checked).toBeDefined();
  expect(checked instanceof PointsMaterial).toBeTruthy();
  const checkedPoints = <PointsMaterial> checked;
  expect(checkedPoints.map.name).toBe(expected.map.name);
  expect(checkedPoints.size).toBe(expected.size);
};

export const assertPointsMaterialBuilt = (materials: Map<string, Material>,
                                          key: string,
                                          expectedMaterial: PointsMaterial) => {
  expect(materials.has(key)).toBeTruthy();
  const material = materials.get(key);
  assertPointsMaterialExpected(material, expectedMaterial);
};

export const assertTextStyleBuilt = (styles: Map<string, TextStyle>,
                                     key: string,
                                     expectedStyle: TextStyle) => {
  expect(styles.has(key)).toBeTruthy();
  const style = styles.get(key);
  assertTextStyleExpected(style, expectedStyle);
};

export const assertTextStyleExpected = (checked: TextStyle, expected: TextStyle) => {
  expect(checked).toBeDefined();
  expect(checked.color).toBe(expected.color);
  expect(checked.fontFamily).toBe(expected.fontFamily);
  expect(checked.fontSize).toBe(expected.fontSize);
  expect(checked.fontStyle).toBe(expected.fontStyle);
  expect(checked.fontWeight).toBe(expected.fontWeight);
};

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}
