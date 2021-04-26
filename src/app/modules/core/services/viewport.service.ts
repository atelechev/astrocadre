import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dimension } from '#core/models/screen/dimension';
import { ScreenCoordinate } from '#core/models/screen/screen-coordinate';
import { ViewportEvent } from '#core/models/event/viewport-event';
import { ViewportSizeChangeEvent } from '#core/models/event/viewport-size-change-event';
import { ViewportViewChangeEvent } from '#core/models/event/viewport-view-change-event';

/**
 * Holds the value corresponding to the current size of the viewport and provides
 * methods related with the viewport.
 */
@Injectable({ providedIn: 'root' })
export class ViewportService {

  private readonly _events: BehaviorSubject<ViewportEvent<any>>;

  private readonly _maxSettableSize = 16384;

  private readonly _defaultHeight: number;

  private readonly _defaultWidth: number;

  private _height: number;

  private _width: number;

  constructor() {
    this._events = new BehaviorSubject<ViewportEvent<any>>(ViewportEvent.INITIAL);
    this._defaultHeight = window.screen.height;
    this._defaultWidth = window.screen.width;
    this.size = {
      height: this._defaultHeight,
      width: this._defaultWidth
    };
  }

  /**
   * Returns the default height of the viewport.
   *
   * The default height is the full available height of the current window.
   */
  public get defaultHeight(): number {
    return this._defaultHeight;
  }

  /**
   * Returns the default width of the viewport.
   *
   * The default width is the full available width of the current window.
   */
  public get defaultWidth(): number {
    return this._defaultWidth;
  }

  /**
   * Returns the current size of the viewport.
   */
  public get size(): Dimension {
    return {
      height: this._height,
      width: this._width
    };
  }

  /**
   * Sets the current size of the viewport.
   *
   * If a value in the dimension is not defined or is out of allowed bounds, uses the default value
   * for the respective property.
   *
   * If the new value is different from the previous, triggers a viewportSizeChanged event.
   *
   */
  public set size(size: Dimension) {
    const previousHeight = this._height;
    const previousWidth = this._width;
    this._height = this.isSizeInRange(size?.height) ? Math.floor(size.height) : this._defaultHeight;
    this._width = this.isSizeInRange(size?.width) ? Math.floor(size.width) : this._defaultWidth;
    if (this._height !== previousHeight || this._width !== previousWidth) {
      this.fireViewportSizeChanged(this.size);
    }
  }

  /**
   * Returns the current height of the viewport.
   */
  public get height(): number {
    return this._height;
  }

  /**
   * Sets the height of the viewport to the specified value.
   *
   * Triggers a viewportSizeChanged event if the new height is different from the previous.
   */
  public set height(h: number) {
    this.size = {
      height: h,
      width: this._width
    };
  }

  /**
   * Returns the current width of the viewport.
   */
  public get width(): number {
    return this._width;
  }

  /**
   * Sets the width of the viewport to the specified value.
   *
   * Triggers a viewportSizeChanged event if the new width is different from the previous.
   */
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

  /**
   * Returns the Observable allowing to trace the viewport events.
   */
  public get events(): Observable<ViewportEvent<any>> {
    return this._events;
  }

  /**
   * Triggers the viewport view change event.
   *
   * @param change the string denoting the type of the change.
   */
  public fireViewportViewChanged(change: string) {
    this._events.next(new ViewportViewChangeEvent(change));
  }

  private fireViewportSizeChanged(size: Dimension) {
    this._events.next(new ViewportSizeChangeEvent(size));
  }

  private isSizeInRange(value: number): boolean {
    return value && value > 0 && value < this._maxSettableSize;
  }

}
