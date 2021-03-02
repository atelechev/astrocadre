import { Component } from '@angular/core';
import { ViewportDimensionService } from '#core/services/viewport-dimension.service';

@Component({
  selector: `ac-controls-select-viewport-size`,
  templateUrl: './selector-viewport-size.component.html',
  styleUrls: ['../controls/controls.component.css', './selector-viewport-size.component.css']
})
export class SelectorViewportSizeComponent {

  public width: number;

  public height: number;

  public enabled: boolean;

  constructor(private viewportDimensionService: ViewportDimensionService) {
    this.width = viewportDimensionService.getWidth();
    this.height = viewportDimensionService.getHeight();
    this.enabled = false;
  }

  public fireResizeEvent(): void {
    const newDimension = { width: this.width, height: this.height };
    this.viewportDimensionService.setDimension(newDimension);
    this.enabled = false;
  }

  public dimensionChanged(): void {
    this.enabled = this.width !== this.viewportDimensionService.getWidth() ||
      this.height !== this.viewportDimensionService.getHeight();
  }

}
