import { ensureStringDefinedNotEmpty, ensureArgDefined } from './arg-validation-utils';

/**
 * Represents a node in the tree forming the hierarchy of layers.
 */
export class LayersTreeNode {

  public selected: boolean;

  constructor(public readonly code: string,
              public readonly label: string,
              public readonly description?: string,
              public readonly layers?: LayersTreeNode[]) {
    ensureStringDefinedNotEmpty(code, 'code');
    this.selected = true;
  }

  /**
   * Static factory method used to instantiate these objects when parsed from JSON,
   * because otherwise they do not pass through the constructor.
   *
   * @param node the original node to instantiate a new one from.
   */
  // TODO add tests
  public static from(node: LayersTreeNode): LayersTreeNode {
    ensureArgDefined(node, 'node');
    const subLayers = !node.layers ? [] : node.layers.map(sl => LayersTreeNode.from(sl));
    return new LayersTreeNode(node.code, node.label, node.description, subLayers);
  }

}
