import { SelectableItem } from './selectable-item';
import { LayersTreeNode } from '../layer/layers-tree-node';

describe('SelectableItem', () => {

  const assertLayerNodeExpected = (node: LayersTreeNode,
                                   expectedCode: string,
                                   expectedChildrenCount: number) => {
    expect(node).toBeDefined();
    expect(node.code).toBe(expectedCode);
    expect(node.children).toBeDefined();
    expect(node.children.length).toBe(expectedChildrenCount);
  };

  it('#asLayersTree should return expected LayersTreeNode', () => {
    const item = new SelectableItem('code1', 'label1', 'desc1', true, null);
    const node = item.asLayersTree();
    assertLayerNodeExpected(node, 'code1', 0);
  });

  it('#asLayersTree should return expected LayersTreeNode with children', () => {
    const child = new SelectableItem('code21', 'label21', 'desc21', true, null);
    const item = new SelectableItem('code2', 'label1', 'desc1', true, [ child ]);
    const node = item.asLayersTree();
    assertLayerNodeExpected(node, 'code2', 1);
    const childNode = node.children[0];
    assertLayerNodeExpected(childNode, 'code21', 0);
  });

  it('#from should return expected SelectableItem', () => {
    const item0 = new SelectableItem('code3', 'label3', 'desc3', true, null);
    const item = SelectableItem.from(item0);
    expect(item).toBeDefined();
    expect(item.code).toBe('code3');
    expect(item.label).toBe('label3');
    expect(item.description).toBe('desc3');
    expect(item.selected).toBe(true);
    expect(item.items).toBeDefined();
    expect(item.items.length).toBe(0);
  });

});
