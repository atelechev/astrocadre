import { LayersTreeNode } from './layers-tree-node';
import { Injectable } from '@angular/core';

@Injectable()
export class LayerNodeFinder {

  public findInTree(layerCode: string, layerNode: LayersTreeNode): LayersTreeNode {
    if (layerCode && layerNode) {
      if (layerNode.code === layerCode) {
        return layerNode;
      }
      if (layerNode.layers) {
        for (let i = 0; i < layerNode.layers.length; i++) {
          const foundAmongChildren = this.findInTree(layerCode, layerNode.layers[i]);
          if (foundAmongChildren) {
            return foundAmongChildren;
          }
        }
      }
    }
    return undefined;
  }

}
