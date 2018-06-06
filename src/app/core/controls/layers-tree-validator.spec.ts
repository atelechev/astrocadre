import { LayersTreeValidator } from './layers-tree-validator';
import { TestBed } from '@angular/core/testing';
import { LayersTreeNode } from '../layer/layers-tree-node';

describe('LayersTreeValidator', () => {

  let validator: LayersTreeValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ LayersTreeValidator] });
    validator = TestBed.get(LayersTreeValidator);
  });

  it('#validateTree should throw expected error if arg is undefined', () => {
    expect(() => validator.validateTree(undefined))
      .toThrow(new Error('treeNode arg must be defined, but was \'undefined\''));
  });

  it('#validateTree should throw expected error if a duplicate code was detected in the tree', () => {
    const ch2 = new LayersTreeNode('ch1', []);
    const ch1 = new LayersTreeNode('ch1', [ ch2 ]);
    const root = new LayersTreeNode('root', [ ch1 ]);
    expect(() => validator.validateTree(root))
      .toThrow(new Error('Duplicate layer codes detected: root,ch1,ch1'));
  });

  it('#validateTree should return silently if the tree is valid', () => {
    const ch2a = new LayersTreeNode('ch2a', []);
    const ch1a = new LayersTreeNode('ch1a', [ ch2a ]);
    const ch1b = new LayersTreeNode('ch1b', []);
    const root = new LayersTreeNode('root', [ ch1a, ch1b ]);
    validator.validateTree(root);
  });

});
