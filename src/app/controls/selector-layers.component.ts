import { Component, AfterViewInit } from '@angular/core';
import { SelectableItem } from './selectable-item';
import { CoreComponent } from '../core/core.component';
import { Layers } from '../core/layers';
import { LayersEventService } from '../layers/layers-event.service';


@Component({
  selector: `app-sky-view-controls-select-layers`,
  templateUrl: './selector-layers.component.html',
  styleUrls: [ './controls.component.css' ],
  providers: []
})
export class SelectorLayersComponent implements AfterViewInit {

  public availableLayers: Array<SelectableItem>;

  constructor(private core: CoreComponent,
              private layersEventService: LayersEventService) {
    this.availableLayers = this.initAvailableLayers();
  }

  private initAvailableLayers(): Array<SelectableItem> {
    return [
      new SelectableItem(Layers.SKY_GRID, 'Coordinates grid', 'Celestial coordinates grid in degrees', true),
      new SelectableItem(Layers.CONSTELLATION_BOUNDARIES, 'Constellation boundaries', 'Boundaries of constellations', true),
      new SelectableItem(Layers.CONSTELLATION_LINES, 'Constellation lines', 'Lines between stars in constellations', true),
      new SelectableItem(Layers.STARS, 'Stars', 'Stars', true)
    ];
  }

  public getSelectedLayers(): Array<SelectableItem> {
    return this.availableLayers.filter(layer => layer.selected);
  }

  public fireLayerChangedEvent(layerCode: string, visible: boolean): void {
    this.layersEventService.layerVisibleRequested({ layer: layerCode, visible: visible });
  }

  public ngAfterViewInit(): void {
    this.availableLayers.filter(layer => layer.selected)
                        .forEach(layer => {
                          this.layersEventService.loadLayerRequested(layer.code);
                          this.fireLayerChangedEvent(layer.code, true);
                        });
  }

}
