import { Vector3 } from 'three';


export class WorldConstants {

  /**
   * The radius of the 3D world sky sphere, in Three coordinate units.
   */
  public static readonly WORLD_RADIUS: number = 2;

  /**
   * The coordinate of the North pole in the 3D world.
   */
  public static readonly NORTH = new Vector3(0, 0, WorldConstants.WORLD_RADIUS);

  /**
   * The coordinate of the South pole in the 3D world.
   */
  public static readonly SOUTH = new Vector3(0, 0, -WorldConstants.WORLD_RADIUS);

}
