import { TestBed } from '@angular/core/testing';
import { TreeNode } from '#core/models/tree-node';
import { LayersTreeValidator } from '#core/services/layers-tree-validator';

describe('LayersTreeValidator', () => {

  let service: LayersTreeValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [LayersTreeValidator] });
    service = TestBed.inject(LayersTreeValidator);
  });

  const newNode = (code: string, childNodes: Array<TreeNode>): TreeNode =>
    new TreeNode(code, undefined, undefined, childNodes);

  describe('validateTree should', () => {

    describe('throw expected error', () => {

      it('if arg is undefined', () => {
        expect(() => service.validateTree(undefined))
          .toThrow(new Error('treeNode arg must be defined, but was \'undefined\''));
      });

      it('if a duplicate code was detected in the tree', () => {
        const ch2 = newNode('ch1', []);
        const ch1 = newNode('ch1', [ch2]);
        const root = newNode('root', [ch1]);
        expect(() => service.validateTree(root))
          .toThrow(new Error('Duplicate layer codes detected: root,ch1,ch1'));
      });

    });

    it('return silently if the tree is valid', () => {
      const ch2a = newNode('ch2a', []);
      const ch1a = newNode('ch1a', [ch2a]);
      const ch1b = newNode('ch1b', []);
      const root = newNode('root', [ch1a, ch1b]);
      service.validateTree(root);
    });

  });

});
