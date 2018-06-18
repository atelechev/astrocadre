import { Component } from '@angular/core';
import { LayersEventService } from '../core/layer/layers-event.service';
import { LayersTreeNode } from '../core/layer/layers-tree-node';
import { LayerNodeFinder } from '../core/layer/layer-node-finder';


@Component({
  selector: `app-astrocadre-controls-select-layers`,
  templateUrl: './selector-layers.component.html',
  styleUrls: [ './controls.component.css', './selector-layers.component.css' ],
  providers: []
})
export class SelectorLayersComponent {

  public rootLayer: LayersTreeNode;

  constructor(private layersEventService: LayersEventService,
              private layerNodeFinder: LayerNodeFinder) {
    this.layersEventService.broadcastLayersTreeLoaded$.subscribe(
      (root: LayersTreeNode) => this.rootLayer = root
    );
  }

  public fireLayerChangedEvent(layerCode: string, visible: boolean): void {
    const layer = this.layerNodeFinder.findInTree(layerCode, this.rootLayer);
    if (layer) {
      this.updateSelectorRecursively(this.layerNodeFinder.findInTree(layerCode, this.rootLayer), visible);
    }
  }

  private requestLayerVisibility(layerCode: string, visible: boolean): void {
    this.layersEventService.layerVisibleRequested({ layer: layerCode, visible: visible });
  }

  private updateSelectorRecursively(layer: LayersTreeNode, visible: boolean): void {
    if (layer) {
      this.requestLayerVisibility(layer.code, visible);
      layer.selected = visible;
      if (layer.layers) {
        layer.layers.forEach(subLayer => {
          this.updateSelectorRecursively(subLayer, visible);
        });
      }
    }
  }

}
