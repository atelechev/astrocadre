import { Component } from '@angular/core';
import { ViewportService } from 'src/app/modules2/core/services/viewport.service';

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
      height: this._height || 0,
      width: this._width || 0
    };
    this._viewportService.size = newSize;
  }

}
