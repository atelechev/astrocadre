import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { ScreenCoordinate } from './screen-coordinate';
import { Dimension } from './dimension';
import { Subject } from 'rxjs/Subject';

/**
 * Provides access to the dimensions of the current viewport.
 */
@Injectable()
export class ViewportDimensionService {

  private static readonly MAX_SIZE = 16384;

  private broadcastDimensionChanged = new Subject<null>();

  private width: number;

  private height: number;

  /**
   * Observable to subscribe to intercept events fired when the viewport dimension changes.
   */
  public readonly broadcastDimensionChanged$ = this.broadcastDimensionChanged.asObservable();

  constructor() {
    this.setDimension({ width: Constants.VIEW_WIDTH, height: Constants.VIEW_HEIGHT });
  }

  /**
   * Returns the current width of the viewport.
   *
   * @returns number the width of the viewport
   */
  public getWidth(): number {
    return this.width;
  }

  /**
   * Returns the current height of the viewport.
   *
   * @returns number the height of the viewport
   */
  public getHeight(): number {
    return this.height;
  }

  private ensureSizeArgValid(size: number, axis: string): void {
    if (size < 1 || size > ViewportDimensionService.MAX_SIZE) {
      throw new Error(`${axis} must be in range [1, ${ViewportDimensionService.MAX_SIZE}]`);
    }
  }

  /**
   * Sets the width and the height from the specified dimension.
   *
   * @param dim the dimension to set.
   */
  public setDimension(dim: Dimension): void {
    if (dim && (dim.width !== this.width || dim.height !== this.height)) {
      this.ensureSizeArgValid(dim.width, 'dimension.width');
      this.ensureSizeArgValid(dim.height, 'dimension.height');
      this.width = Math.floor(dim.width);
      this.height = Math.floor(dim.height);
      this.broadcastDimensionChanged.next();
    }
  }

  /**
   * Returns true if the specified coordinate is within the bounds of the current viewport.
   *
   * @param coordinate the coordinate to test.
   */
  public isInBounds(coordinate: ScreenCoordinate): boolean {
    return coordinate.x >= 0 && coordinate.y >= 0 &&
           coordinate.x < this.width &&
           coordinate.y < this.height;
  }

  /**
   * Returns the aspect ratio calculated from the current width and height values.
   *
   * @returns number the width/height aspect.
   */
  public getAspect(): number {
    return this.width / this.height;
  }

}
