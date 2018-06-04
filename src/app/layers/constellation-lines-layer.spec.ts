import { LayersTreeNode } from '../core/layer/layers-tree-node';
import { Layers } from '../core/layers';
import { ConstellationLinesLayer } from './constellation-lines-layer';
import { LineSegments } from 'three';

describe('ConstellationLinesLayer', () => {

  const treeNode = new LayersTreeNode(Layers.CONSTELLATION_LINES, []);

  const ls = new LineSegments();

  it('#constructor should throw expected exception if tree arg is not defined', () => {
    expect(() => new ConstellationLinesLayer(undefined, ls))
      .toThrow(new Error('tree arg must be defined, but was \'undefined\''));
  });

  it('#constructor should throw expected exception if lines arg is not defined', () => {
    expect(() => new ConstellationLinesLayer(treeNode, undefined))
      .toThrow(new Error('lines arg must be defined, but was \'undefined\''));
  });

  it('#getObjects should return expected object for valid args', () => {
    const layer = new ConstellationLinesLayer(treeNode, ls);
    const objects = layer.getObjects();
    expect(objects).toBeDefined();
    expect(objects.length).toBe(1);
  });

  it('#getName should return expected value', () => {
    const layer = new ConstellationLinesLayer(treeNode, ls);
    expect(layer.getName()).toBe(Layers.CONSTELLATION_LINES);
  });

  it('#getTextElements should return an empty array', () => {
    const layer = new ConstellationLinesLayer(treeNode, ls);
    const texts = layer.getTextElements();
    expect(texts).toBeDefined();
    expect(texts.length).toBe(0);
  });

  it('#getRenderableLabels should return an empty map', () => {
    const layer = new ConstellationLinesLayer(treeNode, ls);
    const texts = layer.getRenderableLabels();
    expect(texts).toBeDefined();
    expect(texts.size).toBe(0);
  });

});
