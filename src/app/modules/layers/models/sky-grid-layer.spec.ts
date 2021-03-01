import { LineSegments } from 'three';
import { Layers } from '#core/models/layers';
import { newTreeNode } from '#core/models/tree-node.spec';
import { SkyGridLayer } from '#layers/models/sky-grid-layer';

describe('SkyGridLayer', () => {

  const treeNode = newTreeNode(Layers.SKY_GRID, []);

  const ls = new LineSegments();

  describe('constructor should throw expected exception', () => {

    it('if tree arg is not defined', () => {
      expect(() => new SkyGridLayer(undefined, ls, ls, ls, ls))
        .toThrow(new Error('tree arg must be defined, but was \'undefined\''));
    });

    it('if commonMeridians arg is not defined', () => {
      expect(() => new SkyGridLayer(treeNode, undefined, ls, ls, ls))
        .toThrow(new Error('commonMeridians arg must be defined, but was \'undefined\''));
    });

    it('if commonParallels arg is not defined', () => {
      expect(() => new SkyGridLayer(treeNode, ls, undefined, ls, ls))
        .toThrow(new Error('commonParallels arg must be defined, but was \'undefined\''));
    });

    it('if referenceMeridian arg is not defined', () => {
      expect(() => new SkyGridLayer(treeNode, ls, ls, undefined, ls))
        .toThrow(new Error('referenceMeridian arg must be defined, but was \'undefined\''));
    });

    it('if referenceParallel arg is not defined', () => {
      expect(() => new SkyGridLayer(treeNode, ls, ls, ls, undefined))
        .toThrow(new Error('referenceParallel arg must be defined, but was \'undefined\''));
    });

  });

  it('getObjects should return expected object for valid args', () => {
    const layer = new SkyGridLayer(treeNode, ls, ls, ls, ls);
    const objects = layer.getObjects();
    expect(objects).toBeDefined();
    expect(objects.length).toBe(4);
  });

  it('getName should return expected value', () => {
    const layer = new SkyGridLayer(treeNode, ls, ls, ls, ls);
    expect(layer.getName()).toBe(Layers.SKY_GRID);
  });

  it('getTextElements should return an empty array', () => {
    const layer = new SkyGridLayer(treeNode, ls, ls, ls, ls);
    const texts = layer.getTextElements();
    expect(texts).toBeDefined();
    expect(texts.length).toBe(0);
  });

  it('getRenderableLabels should return an empty map', () => {
    const layer = new SkyGridLayer(treeNode, ls, ls, ls, ls);
    const texts = layer.getRenderableLabels();
    expect(texts).toBeDefined();
    expect(texts.size).toBe(0);
  });

});
