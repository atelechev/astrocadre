import { TreeNode } from './tree-node';

export const newTreeNode = (code: string, children: Array<TreeNode>): TreeNode => {
  return new TreeNode(code, undefined, undefined, children);
};

describe('TreeNode', () => {

  it('#constructor should throw expected error if code arg is undefined', () => {
    expect(() => newTreeNode('', []))
      .toThrow(new Error('code arg must be defined, but was \'\''));
  });

});
