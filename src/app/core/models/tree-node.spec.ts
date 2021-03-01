import { TreeNode } from '#core/models/tree-node';

export const newTreeNode = (code: string, childNodes: Array<TreeNode>): TreeNode => new TreeNode(code, undefined, undefined, childNodes);

describe('TreeNode', () => {

  describe('constructor should', () => {

    it('throw expected error if code arg is undefined', () => {
      expect(() => newTreeNode('', []))
        .toThrow(new Error('code arg must be defined, but was \'\''));
    });

    it('initialize selected field with true', () => {
      expect(newTreeNode('node1', []).selected).toBeTruthy();
    });

  });

  describe('from should', () => {

    it('throw expected error if the arg is undefined', () => {
      expect(() => TreeNode.from(undefined)).toThrow(new Error('node arg must be defined, but was \'undefined\''));
    });

    describe('return expected TreeNode', () => {

      it('at root level', () => {
        const node = new TreeNode('root', 'l', 'd');
        const built = TreeNode.from(node);
        expect(built).toBeDefined();
        expect(built.code).toBe(node.code);
        expect(built.label).toBe(node.label);
        expect(built.description).toBe(node.description);
        expect(built.nodes).toBeDefined();
        expect(built.nodes.length).toBe(0);
        expect(built.selected).toBeTruthy();
      });

      it('at child level', () => {
        const child = new TreeNode('c1', 'l1', 'd1');
        const root = new TreeNode('root', 'l', 'd', [child]);
        const built = TreeNode.from(root);
        expect(built).toBeDefined();
        expect(built.nodes).toBeDefined();
        expect(built.nodes.length).toBe(1);

        const childBuilt = built.nodes[0];
        expect(childBuilt.code).toBe(child.code);
        expect(childBuilt.label).toBe(child.label);
        expect(childBuilt.description).toBe(child.description);
        expect(childBuilt.nodes).toBeDefined();
        expect(childBuilt.nodes.length).toBe(0);
        expect(childBuilt.selected).toBeTruthy();
      });

    });

  });

});
