import { Component, AfterViewInit, Input } from '@angular/core';
import { LayersEventService } from '../layers/layers-event.service';
import { LayerVisibility } from '../core/layer-visibility';
import { Layers } from '../core/layers';

@Component({
  selector: `app-sky-view-controls-select-stars`,
  templateUrl: './selector-layers-stars.component.html',
  styleUrls: [ './controls.component.css',
               './selector-layers.component.css',
               './selector-layers-stars.component.css' ],
  providers: []
})
export class SelectorLayersStarsComponent implements AfterViewInit {


  private readonly initialMagnitude = 6;

  public magnitude: number = this.initialMagnitude;

  @Input()
  public showNames: boolean;

  @Input()
  public enabled: boolean;

  public checkProperNames = true;

  constructor(private layersEventService: LayersEventService) {
    this.layersEventService.requestLayerVisibility$.subscribe(
      (lv: LayerVisibility) => {
        if (lv.layer === Layers.STARS) {
          this.enabled = lv.visible;
        }
      }
    );
  }

  private subscribeLayerLoadedEvent(): void {
    this.layersEventService.broadcastLayerLoaded$.subscribe(
      (layer: string) => {
        if (layer.startsWith(Layers.STARS + '-')) {
          this.fireStarsLabelsVisibilityChangeEvent();
        }
      }
    );
  }

  public ngAfterViewInit(): void {
    this.subscribeLayerLoadedEvent();
    this.fireStarsMagnitudeChangedEvent();
    this.fireStarsLabelsTypeChangeEvent();
    this.fireStarsLabelsVisibilityChangeEvent();
  }

  public fireStarsMagnitudeChangedEvent(): void {
    this.layersEventService.starsMagnitudeRequested(this.magnitude);
  }

  public fireStarsLabelsVisibilityChangeEvent(): void {
    const data = { magnitude: this.magnitude, visible: this.showNames };
    this.fireStarsLabelsTypeChangeEvent();
    this.layersEventService.starsLabelsVisibleRequested(data);
  }

  public fireStarsLabelsTypeChangeEvent(): void {
    const data = this.checkProperNames ? 'stars-names-proper' : 'stars-names-standard';
    this.layersEventService.starsLabelsTypeRequested(data);
  }

}
