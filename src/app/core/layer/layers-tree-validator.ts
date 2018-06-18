import { Injectable } from '@angular/core';
import { LayersTreeNode } from './layers-tree-node';
import { ensureArgDefined } from '../layer/arg-validation-utils';

@Injectable()
export class LayersTreeValidator {

  public validateTree(treeNode: LayersTreeNode): void {
    ensureArgDefined(treeNode, 'treeNode');
    const allCodes = this.extractCodes(treeNode).reduce((prev, curr) => prev.concat(curr), []);
    const asSet = new Set(allCodes);
    if (allCodes.length !== asSet.size) {
      throw new Error(`Duplicate layer codes detected: ${allCodes}`);
    }
  }

  private extractCodes(node: LayersTreeNode): string[] {
    const ownCode = [ node.code ];
    if (node.layers) {
      const childCodes = node.layers.map(n => this.extractCodes(n))
                                      .reduce((prev, curr) => prev.concat(curr), []);
      return ownCode.concat(childCodes);
    }
    return ownCode;
  }

}
