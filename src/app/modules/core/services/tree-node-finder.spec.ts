import { TestBed } from '@angular/core/testing';
import { TreeNode } from '#core/models/tree-node';
import { TreeNodeFinder } from '#core/services/tree-node-finder';

describe('TreeNodeFinder', () => {

  let service: TreeNodeFinder;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TreeNodeFinder] });
    service = TestBed.inject(TreeNodeFinder);
  });

  const newItem = (code: string, childNodes: Array<TreeNode> = []): TreeNode =>
    new TreeNode(code, code, undefined, childNodes);

  describe('findInTree should return', () => {

    describe('undefined', () => {

      it('if code arg is undefined', () => {
        expect(service.findInTree(undefined, newItem('test'))).toBeUndefined();
      });

      it('if node arg is undefined', () => {
        expect(service.findInTree('test', undefined)).toBeUndefined();
      });

      it('if layer was not found', () => {
        const tree = newItem('root', [newItem('i1'), newItem('i2')]);
        expect(service.findInTree('i0', tree)).toBeUndefined();
      });

    });

    describe('expected layer', () => {

      it('if it is present in root level of the array', () => {
        const tree = newItem('root', [newItem('i1'), newItem('i2')]);
        const found = service.findInTree('root', tree);
        expect(found).toBeDefined();
        expect(found.code).toBe('root');
      });

      it('if it is present among children', () => {
        const tree = newItem('root', [newItem('i1', [newItem('i1c1')]), newItem('i2', [newItem('i2c1')])]);
        const found = service.findInTree('i2c1', tree);
        expect(found).toBeDefined();
        expect(found.code).toBe('i2c1');
      });

    });

  });

});
