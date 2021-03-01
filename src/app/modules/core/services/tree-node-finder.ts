import { Injectable } from '@angular/core';
import { TreeNode } from '#core/models/tree-node';

@Injectable()
export class TreeNodeFinder {

  public findInTree(code: string, node: TreeNode): TreeNode {
    if (code && node) {
      if (node.code === code) {
        return node;
      }
      if (node.nodes) {
        for (const n of node.nodes) {
          const foundAmongChildren = this.findInTree(code, n);
          if (foundAmongChildren) {
            return foundAmongChildren;
          }
        }
      }
    }
    return undefined;
  }

}
