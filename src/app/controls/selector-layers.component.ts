import { Component } from '@angular/core';
import { TreeNode } from '#core/tree-node';
import { TreeNodeFinder } from '#core/tree-node-finder';
import { LayersEventService } from '#core-layer/layers-event.service';


@Component({
  selector: `app-astrocadre-controls-select-layers`,
  templateUrl: './selector-layers.component.html',
  styleUrls: ['./controls.component.css', './selector-layers.component.css'],
  providers: []
})
export class SelectorLayersComponent {

  public rootLayer: TreeNode;

  constructor(private layersEventService: LayersEventService,
    private layerNodeFinder: TreeNodeFinder) {
    this.layersEventService.broadcastLayersTreeLoaded$.subscribe(
      (root: TreeNode) => this.rootLayer = root
    );
  }

  public fireLayerChangedEvent(layerCode: string, visible: boolean): void {
    const layer = this.layerNodeFinder.findInTree(layerCode, this.rootLayer);
    if (layer) {
      this.updateSelectorRecursively(this.layerNodeFinder.findInTree(layerCode, this.rootLayer), visible);
    }
  }

  private requestLayerVisibility(layerCode: string, visible: boolean): void {
    const layer = this.layerNodeFinder.findInTree(layerCode, this.rootLayer);
    layer.selected = visible;
    if (layer) {
      this.layersEventService.layerVisibleRequested(layer);
    }
  }

  private updateSelectorRecursively(layer: TreeNode, visible: boolean): void {
    if (layer) {
      this.requestLayerVisibility(layer.code, visible);
      if (layer.nodes) {
        layer.nodes.forEach(subLayer => {
          this.updateSelectorRecursively(subLayer, visible);
        });
      }
    }
  }

}
