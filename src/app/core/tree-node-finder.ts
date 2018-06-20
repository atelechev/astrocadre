import { TreeNode } from './tree-node';
import { Injectable } from '@angular/core';

@Injectable()
export class TreeNodeFinder {

  public findInTree(code: string, node: TreeNode): TreeNode {
    if (code && node) {
      if (node.code === code) {
        return node;
      }
      if (node.nodes) {
        for (let i = 0; i < node.nodes.length; i++) {
          const foundAmongChildren = this.findInTree(code, node.nodes[i]);
          if (foundAmongChildren) {
            return foundAmongChildren;
          }
        }
      }
    }
    return undefined;
  }

}
