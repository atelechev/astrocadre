import { AfterViewInit, Component, Input } from '@angular/core';
import { Layers } from '#core/models/layers';
import { TreeNode } from '#core/models/tree-node';
import { LayersEventService } from '#core/services/layers-event.service';

@Component({
  selector: `ac-controls-select-stars`,
  templateUrl: './selector-layers-stars.component.html',
  styleUrls: ['../controls/controls.component.css',
    '../selector-layers/selector-layers.component.css',
    './selector-layers-stars.component.css']
})
export class SelectorLayersStarsComponent implements AfterViewInit {

  public magnitude: number;

  public showNames: boolean;

  public enabled: boolean;

  public checkProperNames = true;

  private readonly initialMagnitude: number;

  constructor(private layersEventService: LayersEventService) {
    this.initialMagnitude = 6;
    this.magnitude = this.initialMagnitude;
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

  private subscribeLayerLoadedEvent(): void {
    this.layersEventService.broadcastLayerLoaded$.subscribe(
      (layer: string) => {
        if (layer.startsWith(Layers.STARS + '-')) {
          this.fireStarsLabelsVisibilityChangeEvent();
        }
      }
    );
  }

}
