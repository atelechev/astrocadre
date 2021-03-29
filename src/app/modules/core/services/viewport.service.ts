import { Injectable } from '@angular/core';
import { Dimension } from '#core/models/dimension';
import { ScreenCoordinate } from '#core/models/screen-coordinate';
import { EventsService } from '#core/services/events.service';


@Injectable()
export class ViewportService {

  private readonly _maxSettableSize = 16384;

  private readonly _defaultHeight: number;

  private readonly _defaultWidth: number;

  private _height: number;

  private _width: number;

  constructor(private readonly _eventsService: EventsService) {
    this._defaultHeight = window.screen.height;
    this._defaultWidth = window.screen.width;
    this.size = {
      height: this._defaultHeight,
      width: this._defaultWidth
    };
  }

  public get defaultHeight(): number {
    return this._defaultHeight;
  }

  public get defaultWidth(): number {
    return this._defaultWidth;
  }

  public get size(): Dimension {
    return {
      height: this._height,
      width: this._width
    };
  }

  public set size(size: Dimension) {
    const previousHeight = this._height;
    const previousWidth = this._width;
    this._height = this.isSizeInRange(size?.height) ? Math.floor(size.height) : this._defaultHeight;
    this._width = this.isSizeInRange(size?.width) ? Math.floor(size.width) : this._defaultWidth;
    if (this._height !== previousHeight || this._width !== previousWidth) {
      this._eventsService.fireViewportChanged(this.size);
    }
  }

  public get height(): number {
    return this._height;
  }

  public set height(h: number) {
    this.size = {
      height: h,
      width: this._width
    };
  }

  public get width(): number {
    return this._width;
  }

  public set width(w: number) {
    this.size = {
      height: this._height,
      width: w
    };
  }

  /**
   * Returns the aspect ratio calculated from the current width and height values.
   *
   * @returns number the width/height aspect.
   */
  public get aspectRatio(): number {
    return this._width / this._height;
  }

  /**
   * Returns true if the specified coordinate is within the bounds of the current viewport.
   *
   * @param coordinate the coordinate to test.
   */
  public isInBounds(coordinate: ScreenCoordinate): boolean {
    return !!coordinate &&
      coordinate.x >= 0 &&
      coordinate.y >= 0 &&
      coordinate.x < this._width &&
      coordinate.y < this._height;
  }

  private isSizeInRange(value: number): boolean {
    return value && value > 0 && value < this._maxSettableSize;
  }

}
