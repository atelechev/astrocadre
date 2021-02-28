import { ConstellationNamesLayer } from '#layers/constellation-names-layer';
import { Constants } from '#core/constants';
import { Layers } from '#core/layers';
import { newTreeNode } from '#core/tree-node.spec';
import { ConstellationMetadata } from '#core-layer/constellation-metadata';
import { RenderableText } from '#core-layer/label/renderable-text';
import { toVector3 } from '#core-layer/vector-utils';
import { TextOffsetPolicies } from '#core-layer/label/text-offset-policy';

describe('ConstellationNamesLayer', () => {

  const layerName = Layers.CONSTELLATION_NAMES;

  const treeNode = newTreeNode(layerName, []);

  const initTestRenderables = () => {
    const map = new Map<string, RenderableText>();
    [
      {
        type: 'constellation',
        code: 'AND',
        ra: 8.532,
        dec: 38.906,
        names: ['Andromeda', 'Andromeda']
      },
      {
        type: 'constellation',
        code: 'ANT',
        ra: 150.722,
        dec: -33.231,
        names: ['Antlia', 'Pump']
      }
    ].forEach(
      (meta: ConstellationMetadata) => {
        const center = toVector3(meta.ra, meta.dec, Constants.getWorldRadiusForLayer(layerName));
        const renderable = new RenderableText(layerName, 'labels', center, meta.names[0], TextOffsetPolicies.CENTERED);
        map.set(meta.code, renderable);
      }
    );
    return map;
  };

  const renderables = initTestRenderables();


  it('#constructor should throw expected exception if tree arg is not defined', () => {
    expect(() => new ConstellationNamesLayer(undefined, new Map()))
      .toThrow(new Error('tree arg must be defined, but was \'undefined\''));
  });

  it('#constructor should throw expected exception if renderableLabels arg is not defined', () => {
    expect(() => new ConstellationNamesLayer(treeNode, undefined))
      .toThrow(new Error('renderableLabels arg must be defined, but was \'undefined\''));
  });

  it('#getObjects should return an empty array', () => {
    const layer = new ConstellationNamesLayer(treeNode, new Map());
    const objects = layer.getObjects();
    expect(objects).toBeDefined();
    expect(objects.length).toBe(0);
  });

  it('#getName should return expected value', () => {
    const layer = new ConstellationNamesLayer(treeNode, new Map());
    expect(layer.getName()).toBe(layerName);
  });

  it('#getTextElements should return expected value', () => {
    const layer = new ConstellationNamesLayer(treeNode, renderables);
    const texts = layer.getTextElements();
    expect(texts).toBeDefined();
    expect(texts.length).toBe(2);
  });

  it('#getRenderableLabels should return expected value', () => {
    const layer = new ConstellationNamesLayer(treeNode, renderables);
    const labels = layer.getRenderableLabels();
    expect(labels).toBeDefined();
    expect(labels.size).toBe(2);
  });

  it('#getTextElements should contain all elements from renderableLabels', () => {
    const layer = new ConstellationNamesLayer(treeNode, renderables);
    const texts = layer.getTextElements();
    const labels = layer.getRenderableLabels();
    expect(texts.length).toBe(labels.size);
    labels.forEach(
      (renderable: RenderableText, key: string) => {
        const foundItem = texts.find(text => text.innerText === renderable.getHtmlElement().innerText);
        expect(foundItem).toBeDefined();
      }
    );
  });

});
