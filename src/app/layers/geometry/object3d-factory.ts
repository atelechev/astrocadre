import { BufferGeometry } from 'three';
import { Vector3, Object3D } from 'three';
import { ensureArgDefined, ensureArgArrayDefinedNotEmpty } from '../../core/layer/arg-validation-utils';

/**
 * Base class for factories producing Three's Object3D instances.
 */
export abstract class Object3DFactory<T extends Object3D> {

  constructor(private segments: number[][],
              protected radius: number) {
    ensureArgArrayDefinedNotEmpty(segments, 'segments');
    ensureArgDefined(radius, 'radius');
  }

  protected abstract segmentToVertices(segment: number[]): Vector3[];

  protected abstract toTargetObject3D(geometry: BufferGeometry): T;

  public createObject3D(): T {
    const geometry = new BufferGeometry();
    let pointPairs = new Array<Vector3>();
    this.segments.forEach(segment => {
      const vertices = this.segmentToVertices(segment);
      pointPairs = pointPairs.concat(vertices);
    });
    geometry.setFromPoints(pointPairs);
    return this.toTargetObject3D(geometry);
  }

}
