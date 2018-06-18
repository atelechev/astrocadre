import { LayerNodeFinder } from './layer-node-finder';
import { TestBed } from '@angular/core/testing';
import { LayersTreeNode } from './layers-tree-node';

describe('LayerNodeFinder', () => {

  let service: LayerNodeFinder;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [LayerNodeFinder] });
    service = TestBed.get(LayerNodeFinder);
  });

  const newItem = (code: string, children: Array<LayersTreeNode> = []): LayersTreeNode => {
    return new LayersTreeNode(code, code, undefined, children);
  };

  it('#findInTree should return undefined if layerCode arg is undefined', () => {
    expect(service.findInTree(undefined, newItem('test'))).toBeUndefined();
  });

  it('#findInTree should return undefined if layerNode arg is undefined', () => {
    expect(service.findInTree('test', undefined)).toBeUndefined();
  });

  it('#findInTree should return undefined if layer was not found', () => {
    const tree = newItem('root', [ newItem('i1'), newItem('i2') ]);
    expect(service.findInTree('i0', tree)).toBeUndefined();
  });

  it('#findInTree should return expected layer if it is present in root level of the array', () => {
    const tree = newItem('root', [ newItem('i1'), newItem('i2') ]);
    const found = service.findInTree('root', tree);
    expect(found).toBeDefined();
    expect(found.code).toBe('root');
  });

  it('#findInTree should return expected layer if it is present among children', () => {
    const tree = newItem('root', [ newItem('i1', [ newItem('i1c1') ]), newItem('i2', [ newItem('i2c1') ]) ]);
    const found = service.findInTree('i2c1', tree);
    expect(found).toBeDefined();
    expect(found.code).toBe('i2c1');
  });

});
