import { SupportedLayers } from 'src/app/modules2/core/models/supported-layers';
import { WorldConstants } from 'src/app/modules2/core/models/world-constants';
import { BufferGeometry } from 'three';
import { Object3D, Vector3 } from 'three';

/**
 * Base class for factories producing Three's Object3D instances.
 */
export abstract class Object3DFactory<T extends Object3D> {

  public createObject3D(layer: string, segments: number[][]): T {
    const geometry = new BufferGeometry();
    const radius = WorldConstants.worldRadiusForLayer(layer);
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
