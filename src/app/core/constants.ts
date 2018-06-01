import { Vector3 } from 'three';
import { Layers } from './layers';

/**
 * Contains constant values that might be used anywhere across the entire application.
 */
export class Constants {

  /**
   * The width of the main view in pixels.
   */
  public static readonly VIEW_WIDTH: number = 700;

  /**
   * The height of the main view in pixels.
   */
  public static readonly VIEW_HEIGHT: number = 700;

  /**
   * The radius of the 3D world sky sphere, in Three coordinate units.
   */
  public static readonly WORLD_RADIUS: number = 2;

  /**
   * The coordinate of the North pole in the 3D world.
   */
  public static readonly NORTH = new Vector3(0, 0, Constants.WORLD_RADIUS);

  /**
   * The coordinate of the South pole in the 3D world.
   */
  public static readonly SOUTH = new Vector3(0, 0, -Constants.WORLD_RADIUS);


  private static readonly LAYER_RADIUS_OFFSETS = Constants.initLayerRadiusOffsets();

  private static initLayerRadiusOffsets(): Map<string, number> {
    const offsets = new Map<string, number>();
    offsets.set(Layers.STARS, 0.04);
    offsets.set(Layers.CONSTELLATION_LINES, 0.02);
    offsets.set(Layers.CONSTELLATION_BOUNDARIES, 0.01);
    return offsets;
  }

  /**
   * Returns the world radius offset to apply for the specified layer.
   *
   * @param layer the name of the latyer to retrieve world radius offset for.
   */
  public static getWorldRadiusForLayer(layer: string): number {
    const offset = this.LAYER_RADIUS_OFFSETS.get(layer);
    return this.WORLD_RADIUS - (offset ? offset : 0);
  }

}
