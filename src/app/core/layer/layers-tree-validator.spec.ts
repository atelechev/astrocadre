import { LayersTreeValidator } from './layers-tree-validator';
import { TreeNode } from '../tree-node';
import { TestBed } from '@angular/core/testing';

describe('LayersTreeValidator', () => {

  let service: LayersTreeValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [LayersTreeValidator] });
    service = TestBed.get(LayersTreeValidator);
  });

  const newNode = (code: string, children: Array<TreeNode>): TreeNode => {
    return new TreeNode(code, undefined, undefined, children);
  };

  it('#validateTree should throw expected error if arg is undefined', () => {
    expect(() => service.validateTree(undefined))
      .toThrow(new Error('treeNode arg must be defined, but was \'undefined\''));
  });

  it('#validateTree should throw expected error if a duplicate code was detected in the tree', () => {
    const ch2 = newNode('ch1', []);
    const ch1 = newNode('ch1', [ ch2 ]);
    const root = newNode('root', [ ch1 ]);
    expect(() => service.validateTree(root))
      .toThrow(new Error('Duplicate layer codes detected: root,ch1,ch1'));
  });

  it('#validateTree should return silently if the tree is valid', () => {
    const ch2a = newNode('ch2a', []);
    const ch1a = newNode('ch1a', [ ch2a ]);
    const ch1b = newNode('ch1b', []);
    const root = newNode('root', [ ch1a, ch1b ]);
    service.validateTree(root);
  });

});
