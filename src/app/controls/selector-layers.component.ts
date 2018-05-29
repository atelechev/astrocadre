import { Component, AfterViewInit } from '@angular/core';
import { SelectableItem } from '../core/controls/selectable-item';
import { Layers } from '../core/layers';
import { LayersEventService } from '../core/layer/layers-event.service';
import { StaticDataService } from '../core/static-data-service';
import { SectionMetadata } from '../core/controls/section-metadata';
import { LayersTreeNode } from '../core/layer/layers-tree-node';


@Component({
  selector: `app-sky-view-controls-select-layers`,
  templateUrl: './selector-layers.component.html',
  styleUrls: [ './controls.component.css', './selector-layers.component.css' ],
  providers: []
})
export class SelectorLayersComponent implements AfterViewInit {

  public availableLayers: Array<SelectableItem>;

  constructor(private dataService: StaticDataService,
              private layersEventService: LayersEventService) {
    this.availableLayers = new Array<SelectableItem>();
  }

  private initAvailableLayers(): void {
    this.dataService.getAvailableLayers().subscribe(
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
  private extractCodes(node: LayersTreeNode): string[] {
    const childCodes = node.children.map(n => this.extractCodes(n))
                                    .reduce((prev, curr) => prev.concat(curr), []);
    return [ node.code ].concat(childCodes);
  }

  private ensureLayersTreeValid(): void {
    const items = this.availableLayers.map(item => item.asLayersTree());
    const allCodes = items.map(item => this.extractCodes(item))
                          .reduce((prev, curr) => prev.concat(curr), []);
    const asSet = new Set(allCodes);
    if (allCodes.length !== asSet.size) {
      throw new Error(`Duplicate layer codes detected: ${allCodes}`);
    }
  }

  private initAvailableLayer(layer: SelectableItem): void {
    this.layersEventService.loadLayerRequested(layer.asLayersTree());
    layer.items.forEach(subLayer => this.initAvailableLayer(SelectableItem.from(subLayer)));
  }

  public fireLayerChangedEvent(layerCode: string, visible: boolean): void {
    this.requestLayerVisibility(layerCode, visible);
    this.updateSelectorRecursively(this.availableLayers.find(layer => layer.code === layerCode), visible);
  }

  private requestLayerVisibility(layerCode: string, visible: boolean): void {
    this.layersEventService.layerVisibleRequested({ layer: layerCode, visible: visible });
  }

  private updateSelectorRecursively(layer: SelectableItem, visible: boolean): void {
    if (layer && layer.items) {
      layer.items.forEach(subLayer => {
        subLayer.selected = visible;
        this.requestLayerVisibility(subLayer.code, visible);
        this.updateSelectorRecursively(subLayer, visible);
      });
    }
  }

  private findLayerInSelectableItems(layer: string, items: Array<SelectableItem>): SelectableItem {
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.code === layer) {
          return item;
        } else {
          const foundAmongChildren = this.findLayerInSelectableItems(layer, item.items);
          if (foundAmongChildren) {
            return foundAmongChildren;
          }
        }
      }
    }
    return undefined;
  }

  private subscribeLayerLoaded(): void {
    this.layersEventService.broadcastLayerLoaded$.subscribe(
      (layer: string) => {
        const layerItem = this.findLayerInSelectableItems(layer, this.availableLayers);
        if (layerItem) {
          this.fireLayerChangedEvent(layer, layerItem.selected);
        }
      }
    );
  }

  public ngAfterViewInit(): void {
    this.initAvailableLayers();
    this.subscribeLayerLoaded();
  }

}
