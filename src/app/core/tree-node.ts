import { ensureStringDefinedNotEmpty, ensureArgDefined } from './arg-validation-utils';

/**
 * Represents a node in a tree forming a hierarchy of nodes.
 */
export class TreeNode {

  public selected: boolean;

  constructor(public readonly code: string,
              public readonly label: string,
              public readonly description?: string,
              public readonly children?: TreeNode[]) {
    ensureStringDefinedNotEmpty(code, 'code');
    this.selected = true;
  }

  /**
   * Static factory method used to instantiate these objects when parsed from static JSON,
   * because otherwise they do not pass through the constructor.
   *
   * @param node the original node to instantiate a new one from.
   */
  // TODO add tests
  public static from(node: TreeNode): TreeNode {
    ensureArgDefined(node, 'node');
    const subLayers = !node.children ? [] : node.children.map(sl => TreeNode.from(sl));
    return new TreeNode(node.code, node.label, node.description, subLayers);
  }

}
