import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { ScreenCoordinate } from './screen-coordinate';

/**
 * Provides access to the dimensions of the current viewport.
 */
@Injectable()
export class ViewportDimensionService {

  private static readonly MAX_SIZE = 16384;

  private width: number;

  private height: number;

  constructor() {
    this.width = Constants.VIEW_WIDTH;
    this.height = Constants.VIEW_HEIGHT;
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
   * Setter for the width.
   *
   * @param w must not be less than 1 or greater than MAX_SIZE.
   */
  public setWidth(w: number): void {
    this.ensureSizeArgValid(w, 'width');
    this.width = w;
  }

  /**
   * Setter for the height.
   *
   * @param h must not be less than 1 or greater than MAX_SIZE.
   */
  public setHeight(h: number): void {
    this.ensureSizeArgValid(h, 'height');
    this.height = h;
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
