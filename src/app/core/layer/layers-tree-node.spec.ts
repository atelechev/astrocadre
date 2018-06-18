import { LayersTreeNode } from './layers-tree-node';

export const newLayersTreeNode = (code: string, children: Array<LayersTreeNode>): LayersTreeNode => {
  return new LayersTreeNode(code, undefined, undefined, children);
};

describe('LayersTreeNode', () => {

  it('#constructor should throw expected error if code arg is undefined', () => {
    expect(() => newLayersTreeNode('', []))
      .toThrow(new Error('code arg must be defined, but was \'\''));
  });

});
