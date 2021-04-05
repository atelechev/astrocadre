import { MathUtils, Vector3 } from 'three';

/**
 * Transforms the specified values into a Vector3 object from ThreeJs.
 *
 * @param ra the right ascention
 * @param decl the declination
 * @param radius the radius
 * @returns Vector3 the transformed value.
 */
export const toVector3 = (ra: number, decl: number, radius: number): Vector3 => {
  const theta = MathUtils.degToRad(90 - decl);
  const phi = MathUtils.degToRad(ra);
  const sinTheta = Math.sin(theta);
  const x = radius * sinTheta * Math.cos(phi);
  const y = radius * sinTheta * Math.sin(phi);
  const z = radius * Math.cos(theta);
  return new Vector3(x, y, z);
};
