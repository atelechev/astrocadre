
/**
 * Represents a node in the tree forming the hierarchy of layers.
 */
export class LayersTreeNode {

  constructor(public readonly code: string,
              public readonly children: LayersTreeNode[]) {

  }

}
