import { Component, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SelectableItem } from './selectable-item';
import { CoreComponent } from '../core/core.component';
import { Layers } from '../core/layers';


@Component({
  selector: `app-sky-view-controls-select-layers`,
  templateUrl: './selector-layers.component.html',
  styleUrls: [ './controls.component.css' ],
  providers: []
})
export class SelectorLayersComponent implements AfterViewInit {

  @Output()
  private layerVisibilityChanged = new EventEmitter<any>();

  public availableLayers: Array<SelectableItem>;

  constructor(private core: CoreComponent) {
    this.availableLayers = this.initAvailableLayers();
  }

  private initAvailableLayers(): Array<SelectableItem> {
    return [
      new SelectableItem(Layers[0], 'Coordinates grid', 'Celestial coordinates grid in degrees', true),
      new SelectableItem(Layers[1], 'Constellation boundaries', 'Boundaries of constellations', true),
      new SelectableItem(Layers[2], 'Constellation lines', 'Lines between stars in constellations', true),
      new SelectableItem(Layers[3], 'Stars', 'Stars', true)
    ];
  }


  public getSelectedLayers(): Array<SelectableItem> {
    return this.availableLayers.filter(layer => layer.selected);
  }

  public fireLayerChangedEvent(layerCode: string, visible: boolean): void {
    this.layerVisibilityChanged.emit({ code: layerCode, visible: visible });
  }

  public ngAfterViewInit(): void {
    this.availableLayers.filter(layer => layer.selected)
                        .forEach(layer => {
                          this.fireLayerChangedEvent(layer.code, true);
                        });
  }

}
