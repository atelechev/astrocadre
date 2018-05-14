import { Component, AfterViewInit } from '@angular/core';
import { SelectableItem } from './selectable-item';
import { Layers } from '../core/layers';
import { LayersEventService } from '../layers/layers-event.service';
import { ControlsService } from './controls.service';
import { SectionMetadata } from './section-metadata';
import { ItemsTreeNode } from '../core/items-tree-node';


@Component({
  selector: `app-sky-view-controls-select-layers`,
  templateUrl: './selector-layers.component.html',
  styleUrls: [ './controls.component.css', './selector-layers.component.css' ],
  providers: []
})
export class SelectorLayersComponent implements AfterViewInit {

  public availableLayers: Array<SelectableItem>;

  constructor(private metadataLoader: ControlsService,
              private layersEventService: LayersEventService) {
    this.availableLayers = new Array<SelectableItem>();
  }

  private initAvailableLayers(): void {
    this.metadataLoader.getAvailableLayers().subscribe(
      (metadata: SectionMetadata) => {
        this.availableLayers = metadata.items.map(item => {
          return SelectableItem.from(item);
        });
        if (this.availableLayers) {
          this.ensureLayersTreeValid();
          this.availableLayers.forEach(layer => this.initAvailableLayer(layer));
        }
      },
      (error: any) => console.error(`Failed to load layers metadata: ${error}`)
    );
  }

  // TODO tree processing should be extracted into dedicated utilities
  private extractCodes(node: ItemsTreeNode): string[] {
    const childCodes = node.children.map(n => this.extractCodes(n))
                                    .reduce((prev, curr) => prev.concat(curr), []);
    return [ node.code ].concat(childCodes);
  }

  private ensureLayersTreeValid(): void {
    const items = this.availableLayers.map(item => item.asItemsTree());
    const allCodes = items.map(item => this.extractCodes(item))
                          .reduce((prev, curr) => prev.concat(curr), []);
    const asSet = new Set(allCodes);
    if (allCodes.length !== asSet.size) {
      throw new Error(`Duplicate layer codes detected: ${allCodes}`);
    }
  }

  private initAvailableLayer(layer: SelectableItem): void {
    this.layersEventService.loadLayerRequested(layer.asItemsTree());
    layer.items.forEach(subLayer => this.initAvailableLayer(SelectableItem.from(subLayer)));
    this.fireLayerChangedEvent(layer.code, layer.selected);
  }

  public fireLayerChangedEvent(layerCode: string, visible: boolean): void {
    this.layersEventService.layerVisibleRequested({ layer: layerCode, visible: visible });
    this.updateSelectorRecursively(this.availableLayers.find(layer => layer.code === layerCode), visible);
  }

  private updateSelectorRecursively(layer: SelectableItem, visible: boolean): void {
    if (layer && layer.items) {
      layer.items.forEach(subLayer => {
        subLayer.selected = visible;
        this.updateSelectorRecursively(subLayer, visible);
      });
    }
  }

  public ngAfterViewInit(): void {
    this.initAvailableLayers();
  }

}
