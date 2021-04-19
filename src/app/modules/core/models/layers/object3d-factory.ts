import { BufferGeometry } from 'three';
import { Object3D, Vector3 } from 'three';
import { VirtualSphereRadiusService } from '#core/services/virtual-sphere-radius.service';

/**
 * Base class for factories producing Three's Object3D instances.
 */
export abstract class Object3DFactory<T extends Object3D> {

  constructor(private readonly _virtualSphereService: VirtualSphereRadiusService) {

  }

  protected get virtualSphereService(): VirtualSphereRadiusService {
    return this._virtualSphereService;
  }

  /**
   * Creates and returns an Object3D for the specified layer, from
   * the provided source segments data.
   *
   * @param layer the layer to create the object for.
   * @param segments the source segments data. The format depends on which type of
   *                  object the implementor is supposed to create.
   * @returns T the created object.
   */
  public createObject3D(layer: string, segments: number[][]): T {
    if (!segments) {
      throw new Error('segments arg must be defined');
    }
    const geometry = new BufferGeometry();
    const radius = this._virtualSphereService.getRadiusFor(layer);
    let pointPairs = new Array<Vector3>();
    segments.forEach(segment => {
      const vertices = this.segmentToVertices(segment, radius);
      pointPairs = pointPairs.concat(vertices);
    });
    geometry.setFromPoints(pointPairs);
    return this.toTargetObject3D(geometry);
  }

  /**
   * For the specified source segment, produces an array of Vector3 objects located
   * at the specified radius from the center point of the world sphere.
   *
   * @param segment the source segment data.
   * @param radius the radius of the sphere at which the object is located.
   */
  protected abstract segmentToVertices(segment: number[], radius: number): Vector3[];

  /**
   * Converts the specified geometry to an Object3D.
   *
   * @param geometry the geometry to convert.
   */
  protected abstract toTargetObject3D(geometry: BufferGeometry): T;

}
