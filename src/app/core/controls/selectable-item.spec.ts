import { SelectableItem } from './selectable-item';
import { TreeNode } from '../tree-node';

describe('SelectableItem', () => {

  const assertLayerNodeExpected = (node: TreeNode,
                                   expectedCode: string,
                                   expectedChildrenCount: number) => {
    expect(node).toBeDefined();
    expect(node.code).toBe(expectedCode);
    expect(node.children).toBeDefined();
    expect(node.children.length).toBe(expectedChildrenCount);
  };

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
