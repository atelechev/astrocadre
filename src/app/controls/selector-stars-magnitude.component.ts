import { Component, AfterViewInit, Input } from '@angular/core';
import { LayersEventService } from '../layers/layers-event.service';
import { LayerVisibility } from '../core/layer-visibility';
import { Layers } from '../core/layers';

@Component({
  selector: `app-sky-view-controls-select-stars-magnitude`,
  templateUrl: './selector-stars-magnitude.component.html',
  styleUrls: [ './controls.component.css', './selector-stars-magnitude.component.css' ],
  providers: []
})
export class SelectorStarsMagnitudeComponent implements AfterViewInit {

  public initialMagnitude = 6;

  @Input()
  public enabled: boolean;

  constructor(private layersEventService: LayersEventService) {
    this.layersEventService.requestLayerVisibility$.subscribe(
      (lv: LayerVisibility) => {
        if (lv.layer === Layers.STARS) {
          this.enabled = lv.visible;
        }
      }
    );
  }

  public ngAfterViewInit(): void {
    this.fireStarsMagnitudeChangedEvent(this.initialMagnitude);
  }

  public fireStarsMagnitudeChangedEvent(magnitude: any): void {
    this.layersEventService.starsMagnitudeRequested(parseFloat(magnitude));
  }

}
