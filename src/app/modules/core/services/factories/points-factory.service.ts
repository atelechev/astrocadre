import { Injectable } from '@angular/core';
import { BufferGeometry, Points, Vector3 } from 'three';
import { Object3DFactory } from '#core/models/layers/object3d-factory';
import { toVector3 } from '#core/utils/vector-utils';
import { VirtualSphereRadiusService } from '#core/services/virtual-sphere-radius.service';

/**
 * Factory object allowing to transform source coordinates data into 3D points data.
 */
@Injectable({ providedIn: 'root' })
export class PointsFactoryService extends Object3DFactory<Points> {

  constructor(virtualSphereService: VirtualSphereRadiusService) {
    super(virtualSphereService);
  }

  /**
   * Returns a Vector3 object corresponding to specified coordinates, at the
   * distance defined for the specified layer.
   *
   * @param layer the layer to which the point belongs.
   * @param ra the right ascension coordinate.
   * @param dec the declination coordinate.
   * @returns Vector3 the point.
   */
  public buildPoint(layer: string, ra: number, dec: number): Vector3 {
    return toVector3(
      ra,
      dec,
      this.virtualSphereService.getRadiusFor(layer)
    );
  }

  protected segmentToVertices(segment: number[], radius: number): Vector3[] {
    if (!segment || segment.length < 2) {
      throw new Error(`invalid point definition: \'${segment}\'`);
    }
    const p0 = toVector3(segment[0], segment[1], radius);
    return [p0];
  }

  protected toTargetObject3D(geometry: BufferGeometry): Points {
    return new Points(geometry);
  }

}
