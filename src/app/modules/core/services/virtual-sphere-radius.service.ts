import { Injectable } from '@angular/core';
import { LayerService } from '#core/services/layer.service';

/**
 * Provides a method to calculate the radial distance
 * at which a given layer should be rendered in
 * the virtual sphere created in the viewport.
 *
 */
@Injectable()
export class VirtualSphereRadiusService {

  private readonly _maxRadius: number;

  constructor(private readonly _layerService: LayerService) {
    this._maxRadius = 2.0;
  }

  /**
   * Returns the max value of the virtual sphere radius.
   */
  public get maxRadius(): number {
    return this._maxRadius;
  }

  /**
   * Returns the radius at which the specified layer should
   * be rendered.
   *
   * If the specified layer does not exist, throws an error
   * with a corresponding message.
   *
   * @param code the code of the layer to retrieve the radius for.
   */
  public getRadiusFor(code: string): number {
    const layerIndex = this._layerService.getIndex(code);
    if (layerIndex < 0) {
      return this._maxRadius;
    }
    return this._maxRadius - (layerIndex / 100);
  }

}
