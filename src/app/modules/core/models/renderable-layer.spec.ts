import { Object3D } from 'three';
import { RenderableLayer } from '#core/models/renderable-layer';
import { newTreeNode } from '#core/models/tree-node.spec';

describe('RenderableLayer', () => {

  const childNode = newTreeNode('child1', []);
  const parentNode = newTreeNode('parent', [childNode]);

  const parentLayer = new RenderableLayer(parentNode);
  const childLayer = new RenderableLayer(childNode);

  const assertObjects3DVisible = (layer: RenderableLayer, visible: boolean) => {
    expect(layer.isVisible()).toBe(visible);
    layer.getObjects().forEach(
      (object3d: Object3D) => expect(object3d.visible).toBe(visible)
    );
  };

  it('constructor should throw expected error if tree arg is undefined', () => {
    expect(() => new RenderableLayer(undefined))
      .toThrow(new Error('tree arg must be defined, but was \'undefined\''));
  });

  it('getName should return expected value', () => {
    expect(parentLayer.getName()).toBe('parent');
  });

  it('useTheme should throw expected error if the arg is undefined', () => {
    expect(() => parentLayer.useTheme(undefined))
      .toThrow(new Error('theme arg must be defined, but was \'undefined\''));
  });

  it('setVisible should toggle the visibility of the underlying Object3D entries', () => {
    parentLayer.setVisible(false);
    assertObjects3DVisible(parentLayer, false);
    parentLayer.setVisible(true);
    assertObjects3DVisible(parentLayer, true);
  });

  describe('isParentOf should return', () => {

    describe('false', () => {

      it('for undefined arg', () => {
        expect(parentLayer.isParentOf(undefined)).toBeFalsy();
      });

      it('for same layer', () => {
        expect(parentLayer.isParentOf(parentLayer)).toBeFalsy();
      });

      it('if the layer is not parent of the one from the argument', () => {
        expect(childLayer.isParentOf(parentLayer)).toBeFalsy();
      });

    });

    it('true if the layer is parent of the one from the argument', () => {
      expect(parentLayer.isParentOf(childLayer)).toBeTruthy();
    });

  });

  describe('isChildOf should return', () => {

    describe('false', () => {

      it('for undefined arg', () => {
        expect(parentLayer.isChildOf(undefined)).toBeFalsy();
      });

      it('for same layer', () => {
        expect(parentLayer.isChildOf(parentLayer)).toBeFalsy();
      });

      it('if the layer is not child of the one from the argument', () => {
        expect(parentLayer.isChildOf(childLayer)).toBeFalsy();
      });

    });

    it('true if the layer is child of the one from the argument', () => {
      expect(childLayer.isChildOf(parentLayer)).toBeTruthy();
    });

  });

  it('getObjects should return an empty array', () => {
    const objects = parentLayer.getObjects();
    expect(objects).toBeDefined();
    expect(objects.length).toBe(0);
  });

  it('getTextElements should return an empty array', () => {
    const texts = parentLayer.getTextElements();
    expect(texts).toBeDefined();
    expect(texts.length).toBe(0);
  });

  it('getRenderableLabels should return an empty array', () => {
    const labels = parentLayer.getRenderableLabels();
    expect(labels).toBeDefined();
    expect(labels.size).toBe(0);
  });

});
