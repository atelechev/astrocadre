import { BufferGeometry } from 'three';
import { Object3D, Vector3 } from 'three';
import { ensureArgArrayDefinedNotEmpty } from '#core/utils/arg-validation-utils';
import { Constants } from '#core/models/constants';

/**
 * Base class for factories producing Three's Object3D instances.
 */
export abstract class Object3DFactory<T extends Object3D> {

  public createObject3D(layer: string, segments: number[][]): T {
    ensureArgArrayDefinedNotEmpty(segments, 'segments');

    const geometry = new BufferGeometry();
    const radius = Constants.getWorldRadiusForLayer(layer);
    let pointPairs = new Array<Vector3>();
    segments.forEach(segment => {
      const vertices = this.segmentToVertices(segment, radius);
      pointPairs = pointPairs.concat(vertices);
    });
    geometry.setFromPoints(pointPairs);
    return this.toTargetObject3D(geometry);
  }

  protected abstract segmentToVertices(segment: number[], radius: number): Vector3[];

  protected abstract toTargetObject3D(geometry: BufferGeometry): T;

}
