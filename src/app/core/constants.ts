import { Vector3 } from 'three';

export class Constants {

  public static readonly VIEW_WIDTH: number = 700;

  public static readonly VIEW_HEIGHT: number = 700;

  public static readonly WORLD_RADIUS: number = 2;

  public static readonly STAR_MAGNITUDES: number[] = [ 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6 ];

  public static readonly NORTH = new Vector3(0, 0, Constants.WORLD_RADIUS);

  public static readonly SOUTH = new Vector3(0, 0, -Constants.WORLD_RADIUS);

}
