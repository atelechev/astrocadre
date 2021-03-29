import { SupportedLayers } from '#core/models/supported-layers';

export class WorldConstants {

  /**
   * The radius of the 3D world sky sphere, in Three coordinate units.
   */
  public static readonly WORLD_RADIUS: number = 2;

  public static worldRadiusForLayer(layer: string): number {
    const offset = this.getLayerRadiusOffset(layer);
    return WorldConstants.WORLD_RADIUS - (offset ? offset : 0);
  }

  private static getLayerRadiusOffset(layer: string): number {
    switch (layer) {
      case SupportedLayers.STARS: return 0.04;
      case SupportedLayers.CONSTELLATION_LINES: return 0.02;
      case SupportedLayers.CONSTELLATION_BOUNDARIES: return 0.01;
      default: return 0;
    }
  }

}
