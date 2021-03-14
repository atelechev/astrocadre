import { Component, ViewChild } from '@angular/core';
import { ViewportService } from 'src/app/modules2/core/services/viewport.service';

@Component({
  selector: 'ac-controls-resize',
  templateUrl: './resize-controls.component.html',
  styleUrls: [
    '../controls-common.css',
    './resize-controls.component.css'
  ]
})
export class ResizeControlsComponent {

  @ViewChild('viewportWidthInput')
  private _viewportWidthInput: any;

  @ViewChild('viewportHeightInput')
  private _viewportHeightInput: any;

  constructor(private readonly _viewportService: ViewportService) {
  }

  public get width(): number {
    return this._viewportService.width;
  }

  public get height(): number {
    return this._viewportService.height;
  }

  public resizeViewport(): void {
    const newSize = {
      height: this._viewportHeightInput.nativeElement.value || 0,
      width: this._viewportWidthInput.nativeElement.value || 0
    };
    this._viewportService.size = newSize;
  }

}
