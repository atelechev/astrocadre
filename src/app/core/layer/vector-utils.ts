import { Vector3, MathUtils } from 'three';

export const toVector3 = (ra: number, decl: number, radius: number): Vector3 => {
  const theta = MathUtils.degToRad(90 - decl);
  const phi = MathUtils.degToRad(ra);
  const sinTheta = Math.sin(theta);
  const x = radius * sinTheta * Math.cos(phi);
  const y = radius * sinTheta * Math.sin(phi);
  const z = radius * Math.cos(theta);
  return new Vector3(x, y, z);
};

export const toRadians = (degrees: number): number => MathUtils.degToRad(degrees);
