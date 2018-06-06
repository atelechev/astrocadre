import { LayersTreeNode } from '../layer/layers-tree-node';
import { ensureArgDefined } from '../layer/arg-validation-utils';


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
    const childCodes = node.children.map(n => this.extractCodes(n))
                                    .reduce((prev, curr) => prev.concat(curr), []);
    return [ node.code ].concat(childCodes);
  }

}
