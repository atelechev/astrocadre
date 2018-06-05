import { LayersTreeNode } from '../core/layer/layers-tree-node';
import { Layers } from '../core/layers';
import { StarsMagnitudeLayerFactory } from './stars-magnitude-layer-factory';
import { RenderableText } from '../core/layer/label/renderable-text';
import { toVector3 } from '../core/layer/vector-utils';
import { Constants } from '../core/constants';
import { TextOffsetPolicies } from '../core/layer/label/text-offset-policy';
import { StarsMagnitudeLayer } from './stars-magnitude-layer';
import { Points } from 'three';

describe('StarsMagnitudeLayer', () => {

  const layerName = StarsMagnitudeLayerFactory.LAYER_PREFIX + '1.0';

  const treeNode = new LayersTreeNode(layerName, []);

  const emptyNames = new Map<string, RenderableText>();

  const testProperNames = new Map<string, RenderableText>();
  const testStandardNames = new Map<string, RenderableText>();

  const initTestStars = () => {
    [ [ 24.43, -57.24, 0.5, 'Achernar', 'ALP ERI' ],
      [ 37.95,  89.26, 2.0, 'Polaris', 'ALP UMI' ] ].forEach(
        (rawStar: any[]) => {
          const center = toVector3(rawStar[0], rawStar[1], Constants.getWorldRadiusForLayer(layerName));
          const properName = new RenderableText(layerName, 'labels', center, rawStar[3], TextOffsetPolicies.CENTERED);
          testProperNames.set(rawStar[3], properName);
          const standardName = new RenderableText(layerName, 'labels', center, rawStar[4], TextOffsetPolicies.CENTERED);
          testStandardNames.set(rawStar[4], standardName);
        }
      );
  };

  beforeAll(() => {
    initTestStars();
  });

  it('#constructor should throw expected error if tree arg is undefined', () => {
    expect(() => new StarsMagnitudeLayer(undefined, 1, new Points(), emptyNames, emptyNames))
      .toThrow(new Error('tree arg must be defined, but was \'undefined\''));
  });

  it('#constructor should throw expected error if magClass arg is undefined', () => {
    expect(() => new StarsMagnitudeLayer(treeNode, undefined, new Points(), emptyNames, emptyNames))
      .toThrow(new Error('magClass arg must be defined, but was \'undefined\''));
  });

  it('#constructor should throw expected error if stars arg is undefined', () => {
    expect(() => new StarsMagnitudeLayer(treeNode, 1, undefined, emptyNames, emptyNames))
      .toThrow(new Error('stars arg must be defined, but was \'undefined\''));
  });

  it('#constructor should throw expected error if properNameLabels arg is undefined', () => {
    expect(() => new StarsMagnitudeLayer(treeNode, 1, new Points(), undefined, emptyNames))
      .toThrow(new Error('properNameLabels arg must be defined, but was \'undefined\''));
  });

  it('#constructor should throw expected error if standardNameLabels arg is undefined', () => {
    expect(() => new StarsMagnitudeLayer(treeNode, 1, new Points(), emptyNames, undefined))
      .toThrow(new Error('standardNameLabels arg must be defined, but was \'undefined\''));
  });

  it('#getObjects should return expected value', () => {
    const layer = new StarsMagnitudeLayer(treeNode, 1, new Points(), testProperNames, testStandardNames);
    const objects = layer.getObjects();
    expect(objects).toBeDefined();
    expect(objects.length).toBe(1);
  });

  it('#getName should return expected value', () => {
    const layer = new StarsMagnitudeLayer(treeNode, 1, new Points(), testProperNames, testStandardNames);
    expect(layer.getName()).toBe(layerName);
  });

  it('#getTextElements should return expected value', () => {
    const layer = new StarsMagnitudeLayer(treeNode, 1, new Points(), testProperNames, testStandardNames);
    const texts = layer.getTextElements();
    expect(texts).toBeDefined();
    expect(texts.length).toBe(4);
  });

  const assertLabelsExpected = (labels: Map<string, RenderableText>, expected: Array<string>): void => {
    expect(labels.size).toBeGreaterThanOrEqual(expected.length);
    labels.forEach(
      (renderable: RenderableText, key: string) => {
        const foundItem = expected.find(text => text === renderable.getHtmlElement().innerText);
        expect(foundItem).toBeDefined();
      }
    );
  };

  it('#getRenderableLabels should return proper name labels if shown label types is set to names-proper', () => {
    const layer = new StarsMagnitudeLayer(treeNode, 1, new Points(), testProperNames, testStandardNames);
    layer.setShownLabelsType(StarsMagnitudeLayer.LABELTYPE_NAME_PROPER);
    const labels = layer.getRenderableLabels();
    expect(labels).toBeDefined();
    expect(labels.size).toBe(2);
    assertLabelsExpected(labels, [ 'Achernar', 'Polaris' ]);
  });

  it('#getRenderableLabels should return standard name labels if shown label types is set to names-standard', () => {
    const layer = new StarsMagnitudeLayer(treeNode, 1, new Points(), testProperNames, testStandardNames);
    layer.setShownLabelsType(StarsMagnitudeLayer.LABELTYPE_NAME_STANDARD);
    const labels = layer.getRenderableLabels();
    expect(labels).toBeDefined();
    expect(labels.size).toBe(2);
    assertLabelsExpected(labels, [ 'ALP ERI', 'ALP UMI' ]);
  });

  it('#getRenderableLabels should return empty map if shown label types is not set', () => {
    const layer = new StarsMagnitudeLayer(treeNode, 1, new Points(), testProperNames, testStandardNames);
    layer.setShownLabelsType(undefined);
    const labels = layer.getRenderableLabels();
    expect(labels).toBeDefined();
    expect(labels.size).toBe(0);
  });

});