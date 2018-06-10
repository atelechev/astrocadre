import { Component, AfterViewInit } from '@angular/core';
import { SelectableItem } from '../core/controls/selectable-item';
import { LayersEventService } from '../core/layer/layers-event.service';
import { StaticDataService } from '../core/static-data-service';
import { SectionMetadata } from '../core/controls/section-metadata';
import { LayersTreeNode } from '../core/layer/layers-tree-node';
import { LayersTreeValidator } from '../core/controls/layers-tree-validator';
import { SelectableItemFinder } from '../core/controls/selectable-item-finder';


@Component({
  selector: `app-astrocadre-controls-select-layers`,
  templateUrl: './selector-layers.component.html',
  styleUrls: [ './controls.component.css', './selector-layers.component.css' ],
  providers: []
})
export class SelectorLayersComponent implements AfterViewInit {

  public availableLayers: Array<SelectableItem>;

  private layersTreeValidator: LayersTreeValidator;

  private itemsFinder: SelectableItemFinder;

  constructor(private dataService: StaticDataService,
              private layersEventService: LayersEventService) {
    this.layersTreeValidator = new LayersTreeValidator();
    this.availableLayers = new Array<SelectableItem>();
    this.itemsFinder = new SelectableItemFinder();
  }

  private initAvailableLayers(): void {
    this.dataService.getAvailableLayers().subscribe(
      (metadata: SectionMetadata) => {
        this.availableLayers = metadata.items.map(item => {
          return SelectableItem.from(item);
        });
        if (this.availableLayers) {
          const wrappedWithRoot = new LayersTreeNode('root',
                                                     this.availableLayers.map(item => item.asLayersTree()));
          this.layersTreeValidator.validateTree(wrappedWithRoot);
          this.availableLayers.forEach(layer => this.initAvailableLayer(layer));
        }
      },
      (error: any) => console.error(`Failed to load layers metadata: ${error}`)
    );
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

  private subscribeLayerLoaded(): void {
    this.layersEventService.broadcastLayerLoaded$.subscribe(
      (layer: string) => {
        const layerItem = this.itemsFinder.findInSelectableItems(layer, this.availableLayers);
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
