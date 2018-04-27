import { Vector3, Math as ThreeMath } from 'three';


export class VectorUtil {

  public static toVector3(ra: number, decl: number, radius: number): Vector3 {
    const zCoord = radius * decl / 90;
    const radiusAtDecl = Math.sqrt(radius * radius - zCoord * zCoord);
    return new Vector3(
      -radiusAtDecl * Math.sin(ThreeMath.degToRad(ra)), // negative X to mirror for internal view
      radiusAtDecl * Math.cos(ThreeMath.degToRad(ra)),
      zCoord
    );
  }

}
