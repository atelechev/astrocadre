import { LayersTreeNode } from './layers-tree-node';

describe('LayersTreeNode', () => {

  it('#constructor should throw expected error if code arg is undefined', () => {
    expect(() => new LayersTreeNode('', []))
      .toThrow(new Error('code arg must be defined, but was \'\''));
  });

});
