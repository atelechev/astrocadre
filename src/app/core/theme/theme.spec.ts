import { ThemeDefinition } from './theme-definition';
import { textStyle, assertColorsSame, assertLineBasicMaterialExpected, assertTextStyleExpected } from './abstract-factories.spec';
import { lineBasicMaterial, assertPointsMaterialExpected, pointsMaterial } from './abstract-factories.spec';
import { Theme } from './theme';
import { Color, LineBasicMaterial } from 'three';
import { Layers } from '../layers';

describe('Theme', () => {

  const magnitudes = [ -1, 0, 1, 2 ];

  const sizeMultiplier = 1;

  const themeDef: ThemeDefinition = {
    code: 'test1',
    background: {
      color: 'rgb(0,0,0)'
    },
    skyGrid: {
      line: {
        common: 'rgb(1,1,1)',
        reference: 'rgb(2,2,2)'
      }
    },
    constellation: {
      boundaries: {
        line: {
          common: 'rgb(3,3,3)'
        }
      },
      lines: {
        line: {
          common: 'rgb(4,4,4)'
        }
      },
      names: textStyle('size1', 'fam1', 'style1', 'weight1', 'rgb(5,5,5)')
    },
    stars: {
      magnitudes: magnitudes,
      texture: {
        image: 'test/path/1',
        sizeMultiplier: sizeMultiplier
      },
      names: {
        proper: textStyle('size2', 'fam2', 'style2', 'weight2', 'rgb(6,6,6)'),
        standard: textStyle('size3', 'fam3', 'style3', 'weight3', 'rgb(7,7,7)')
      }
    }
  };

  const theme = new Theme(themeDef);

  it('#constructor should throw expected error if themeDef arg is undefined', () => {
    expect(() => new Theme(undefined)).toThrow(new Error('Failed to create Theme: undefined themeDef arg'));
  });

  it('#getName should return expected name', () => {
    expect(theme.getCode()).toBe('test1');
  });

  it('#getBackgroundColor should return expected color', () => {
    assertColorsSame(theme.getBackgroundColor(), new Color(0, 0, 0));
  });

  it('#getMaxShownMagnitude should return expected value', () => {
    expect(theme.getMaxShownMagnitude()).toBeCloseTo(2);
  });

  it('#getMinShownMagnitude should return expected value', () => {
    expect(theme.getMinShownMagnitude()).toBeCloseTo(-1);
  });

  it('#getRenderedStarMagnitudes should return expected values', () => {
    const allMagnitudes = theme.getRenderedStarMagnitudes();
    expect(allMagnitudes).toBeDefined();
    expect(allMagnitudes.length).toBe(4);
    for (let i = 0; i < allMagnitudes.length; i++) {
      expect(allMagnitudes[i]).toBe(magnitudes[i]);
    }
  });

  it('#getMaterialsForLayer should throw error if layer is undefined', () => {
    expect(() => theme.getMaterialsForLayer(undefined)).toThrow(new Error('Unexpected layer name: \'undefined\''));
  });

  it('#getMaterialsForLayer should throw error if layer was not found', () => {
    expect(() => theme.getMaterialsForLayer('any')).toThrow(new Error('Unexpected layer name: \'any\''));
  });

  it('#getMaterialsForLayer should return expected materials for sky-grid layer', () => {
    const materials = theme.getMaterialsForLayer(Layers.SKY_GRID);
    expect(materials).toBeDefined();
    expect(materials.size).toBe(2);
    expect(materials.has('line-common')).toBeTruthy();
    expect(materials.has('line-reference')).toBeTruthy();
  });

  it('#getMaterialsForLayer should return expected materials for constellation-boundaries layer', () => {
    const materials = theme.getMaterialsForLayer(Layers.CONSTELLATION_BOUNDARIES);
    expect(materials).toBeDefined();
    expect(materials.size).toBe(1);
    expect(materials.has('line-common')).toBeTruthy();
  });

  it('#getMaterialsForLayer should return expected materials for constellation-lines layer', () => {
    const materials = theme.getMaterialsForLayer(Layers.CONSTELLATION_LINES);
    expect(materials).toBeDefined();
    expect(materials.size).toBe(1);
    expect(materials.has('line-common')).toBeTruthy();
  });

  it('#getMaterialsForLayer should return expected materials for stars layer', () => {
    const materials = theme.getMaterialsForLayer(Layers.STARS);
    expect(materials).toBeDefined();
    expect(materials.size).toBe(4);
    for (const magnitude of magnitudes) {
      expect(materials.has(`star-${magnitude.toFixed(1)}`)).toBeTruthy();
    }
  });

  it('#getMaterialForLayer should throw error for sky-grid layer and unsupported material key', () => {
    expect(() => theme.getMaterialForLayer(Layers.SKY_GRID, 'any'))
      .toThrow(new Error('Unexpected key \'any\' for layer \'sky-grid\''));
  });

  it('#getMaterialForLayer should throw error for constellation-boundaries layer and unsupported material key', () => {
    expect(() => theme.getMaterialForLayer(Layers.CONSTELLATION_BOUNDARIES, 'any'))
      .toThrow(new Error('Unexpected key \'any\' for layer \'constellation-boundaries\''));
  });

  it('#getMaterialForLayer should throw error for constellation-lines layer and unsupported material key', () => {
    expect(() => theme.getMaterialForLayer(Layers.CONSTELLATION_LINES, 'any'))
      .toThrow(new Error('Unexpected key \'any\' for layer \'constellation-lines\''));
  });

  it('#getMaterialForLayer should throw error for sky-grid layer and unsupported material key', () => {
    expect(() => theme.getMaterialForLayer(Layers.STARS, 'any'))
      .toThrow(new Error('Unexpected key \'any\' for layer \'stars\''));
  });

  it('#getMaterialForLayer should return expected material for sky-grid line-common', () => {
    const material = theme.getMaterialForLayer(Layers.SKY_GRID, 'line-common');
    assertLineBasicMaterialExpected(material, lineBasicMaterial('rgb(1,1,1)'));
  });

  it('#getMaterialForLayer should return expected material for sky-grid line-reference', () => {
    const material = theme.getMaterialForLayer(Layers.SKY_GRID, 'line-reference');
    assertLineBasicMaterialExpected(material, lineBasicMaterial('rgb(2,2,2)'));
  });

  it('#getMaterialForLayer should return expected material for constellation-boundaries line-common', () => {
    const material = theme.getMaterialForLayer(Layers.CONSTELLATION_BOUNDARIES, 'line-common');
    assertLineBasicMaterialExpected(material, lineBasicMaterial('rgb(3,3,3)'));
  });

  it('#getMaterialForLayer should return expected material for constellation-lines line-common', () => {
    const material = theme.getMaterialForLayer(Layers.CONSTELLATION_LINES, 'line-common');
    assertLineBasicMaterialExpected(material, lineBasicMaterial('rgb(4,4,4)'));
  });

  it('#getMaterialForLayer should return expected material for stars of all magnitude classes', () => {
    for (const magnitude of magnitudes) {
      const key = `star-${magnitude.toFixed(1)}`;
      const material = theme.getMaterialForLayer(Layers.STARS, key);
      assertPointsMaterialExpected(material, pointsMaterial((6.5 - magnitude) * sizeMultiplier, 'test/path/1'));
    }
  });

  it('#getTextStylesForLayer should throw error if layer is undefined', () => {
    expect(() => theme.getTextStylesForLayer(undefined)).toThrow(new Error('Unexpected layer name: \'undefined\''));
  });

  it('#getTextStylesForLayer should throw error if layer was not found', () => {
    expect(() => theme.getTextStylesForLayer('any')).toThrow(new Error('Unexpected layer name: \'any\''));
  });

  it('#getTextStylesForLayer should return expected styles for constellation-names layer', () => {
    const styles = theme.getTextStylesForLayer(Layers.CONSTELLATION_NAMES);
    expect(styles).toBeDefined();
    expect(styles.size).toBe(1);
    expect(styles.has('labels'));
  });

  it('#getTextStylesForLayer should return expected styles for stars layer', () => {
    const styles = theme.getTextStylesForLayer(Layers.STARS);
    expect(styles).toBeDefined();
    expect(styles.size).toBe(2);
    expect(styles.has('names-proper'));
    expect(styles.has('names-standard'));
  });

  it('#getTextStylesForLayer should return expected styles for stars layer by magnitudes', () => {
    for (const magnitude of magnitudes) {
      const styles = theme.getTextStylesForLayer(`stars-mag${magnitude}`);
      expect(styles).toBeDefined();
      expect(styles.size).toBe(2);
      expect(styles.has('names-proper'));
      expect(styles.has('names-standard'));
    }
  });

  it('#getTextStyleForLayer should throw error for constellation-names layer and unsupported key', () => {
    expect(() => theme.getTextStyleForLayer(Layers.CONSTELLATION_NAMES, 'any'))
      .toThrow(new Error('Unexpected key \'any\' for layer \'constellation-names\''));
  });

  it('#getTextStyleForLayer should throw error for stars layer and unsupported key', () => {
    expect(() => theme.getTextStyleForLayer(Layers.STARS, 'any'))
      .toThrow(new Error('Unexpected key \'any\' for layer \'stars\''));
  });

  it('#getTextStyleForLayer should return expected style for constellation-names layer and labels key', () => {
    const style = theme.getTextStyleForLayer(Layers.CONSTELLATION_NAMES, 'labels');
    const expected = textStyle('size1', 'fam1', 'style1', 'weight1', 'rgb(5,5,5)');
    assertTextStyleExpected(style, expected);
  });

  it('#getTextStyleForLayer should return expected style for stars layer and names-proper key', () => {
    const style = theme.getTextStyleForLayer(Layers.STARS, 'names-proper');
    const expected = textStyle('size2', 'fam2', 'style2', 'weight2', 'rgb(6,6,6)');
    assertTextStyleExpected(style, expected);
  });

  it('#getTextStyleForLayer should return expected style for stars layer and names-standard key', () => {
    const style = theme.getTextStyleForLayer(Layers.STARS, 'names-standard');
    const expected = textStyle('size3', 'fam3', 'style3', 'weight3', 'rgb(7,7,7)');
    assertTextStyleExpected(style, expected);
  });

});
