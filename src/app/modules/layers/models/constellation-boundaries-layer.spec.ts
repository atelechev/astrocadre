import { LineSegments } from 'three';
import { Layers } from '#core/models/layers';
import { newTreeNode } from '#core/models/tree-node.spec';
import { ConstellationBoundariesLayer } from '#layers/models/constellation-boundaries-layer';

describe('ConstellationBoundariesLayer', () => {

  const treeNode = newTreeNode(Layers.CONSTELLATION_BOUNDARIES, []);

  const ls = new LineSegments();

  describe('constructor should throw expected exception', () => {

    it('if tree arg is not defined', () => {
      expect(() => new ConstellationBoundariesLayer(undefined, ls))
        .toThrow(new Error('tree arg must be defined, but was \'undefined\''));
    });

    it('if boundaries arg is not defined', () => {
      expect(() => new ConstellationBoundariesLayer(treeNode, undefined))
        .toThrow(new Error('boundaries arg must be defined, but was \'undefined\''));
    });

  });

  it('getObjects should return expected object for valid args', () => {
    const layer = new ConstellationBoundariesLayer(treeNode, ls);
    const objects = layer.getObjects();
    expect(objects).toBeDefined();
    expect(objects.length).toBe(1);
  });

  it('getName should return expected value', () => {
    const layer = new ConstellationBoundariesLayer(treeNode, ls);
    expect(layer.getName()).toBe(Layers.CONSTELLATION_BOUNDARIES);
  });

  it('getTextElements should return an empty array', () => {
    const layer = new ConstellationBoundariesLayer(treeNode, ls);
    const texts = layer.getTextElements();
    expect(texts).toBeDefined();
    expect(texts.length).toBe(0);
  });

  it('getRenderableLabels should return an empty map', () => {
    const layer = new ConstellationBoundariesLayer(treeNode, ls);
    const texts = layer.getRenderableLabels();
    expect(texts).toBeDefined();
    expect(texts.size).toBe(0);
  });

});
