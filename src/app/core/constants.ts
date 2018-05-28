import { Vector3 } from 'three';

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

}
