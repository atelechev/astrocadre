import { Vector3, Math as ThreeMath } from 'three';


export class VectorUtil {

  public static toVector3(ra: number, decl: number, radius: number): Vector3 {
    const theta = ThreeMath.degToRad(90 - decl);
    const phi = ThreeMath.degToRad(ra);
    const sinTheta = Math.sin(theta);
    const x = radius * sinTheta * Math.cos(phi);
    const y = radius * sinTheta * Math.sin(phi);
    const z = radius * Math.cos(theta);
    return new Vector3(x, y, z);
  }

}
