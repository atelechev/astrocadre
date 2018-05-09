import { Component, AfterViewInit } from '@angular/core';
import { SelectableItem } from './selectable-item';
import { Layers } from '../core/layers';
import { LayersEventService } from '../layers/layers-event.service';
import { ControlsService } from './controls.service';
import { SectionMetadata } from './section-metadata';


@Component({
  selector: `app-sky-view-controls-select-layers`,
  templateUrl: './selector-layers.component.html',
  styleUrls: [ './controls.component.css' ],
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
          this.availableLayers.forEach(layer => {
                                this.layersEventService.loadLayerRequested(layer.code);
                                this.fireLayerChangedEvent(layer.code, layer.selected);
                              });
        }
      },
      (error: any) => console.error(`Failed to load layers metadata: ${error}`)
    );
  }

  public fireLayerChangedEvent(layerCode: string, visible: boolean): void {
    this.layersEventService.layerVisibleRequested({ layer: layerCode, visible: visible });
  }

  public ngAfterViewInit(): void {
    this.initAvailableLayers();
  }

}
