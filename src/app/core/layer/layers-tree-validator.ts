import { Injectable } from '@angular/core';
import { TreeNode } from '../tree-node';
import { ensureArgDefined } from '../arg-validation-utils';

@Injectable()
export class LayersTreeValidator {

  public validateTree(treeNode: TreeNode): void {
    ensureArgDefined(treeNode, 'treeNode');
    const allCodes = this.extractCodes(treeNode).reduce((prev, curr) => prev.concat(curr), []);
    const asSet = new Set(allCodes);
    if (allCodes.length !== asSet.size) {
      throw new Error(`Duplicate layer codes detected: ${allCodes}`);
    }
  }

  private extractCodes(node: TreeNode): string[] {
    const ownCode = [ node.code ];
    if (node.nodes) {
      const childCodes = node.nodes.map(n => this.extractCodes(n))
                                      .reduce((prev, curr) => prev.concat(curr), []);
      return ownCode.concat(childCodes);
    }
    return ownCode;
  }

}
