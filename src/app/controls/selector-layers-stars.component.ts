import { Component, AfterViewInit, Input } from '@angular/core';
import { LayersEventService } from '../core/layer/layers-event.service';
import { Layers } from '../core/layers';
import { TreeNode } from '../core/tree-node';

@Component({
  selector: `app-astrocadre-controls-select-stars`,
  templateUrl: './selector-layers-stars.component.html',
  styleUrls: [ './controls.component.css',
               './selector-layers.component.css',
               './selector-layers-stars.component.css' ],
  providers: []
})
export class SelectorLayersStarsComponent implements AfterViewInit {


  private readonly initialMagnitude = 6;

  public magnitude: number = this.initialMagnitude;

  public showNames: boolean;

  public enabled: boolean;

  public checkProperNames = true;

  constructor(private layersEventService: LayersEventService) {
    this.showNames = true;
    this.enabled = true;
    this.layersEventService.requestLayerVisibility$.subscribe(
      (node: TreeNode) => {
        if (node.code === Layers.STARS) {
          this.enabled = node.selected;
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
    // TODO find a way to avoid calling it on init
    this.subscribeLayerLoadedEvent();
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
