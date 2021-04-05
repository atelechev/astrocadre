import { Component } from '@angular/core';
import { ViewportService } from '#core/services/viewport.service';

/**
 * Provides the UI for the viewport resizing functionality.
 */
@Component({
  selector: 'ac-controls-resize',
  templateUrl: './resize-controls.component.html'
})
export class ResizeControlsComponent {

  private _width: number;

  private _height: number;

  constructor(private readonly _viewportService: ViewportService) {
    this._width = this._viewportService.width;
    this._height = this._viewportService.height;
  }

  public get width(): number {
    return this._width;
  }

  public set width(w: number) {
    this._width = w;
  }

  public get height(): number {
    return this._height;
  }

  public set height(h: number) {
    this._height = h;
  }

  public resizeViewport(): void {
    const newSize = {
      height: this._height || this._viewportService.defaultHeight,
      width: this._width || this._viewportService.defaultWidth
    };
    this._viewportService.size = newSize;
  }

}
