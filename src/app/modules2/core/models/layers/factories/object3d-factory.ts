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
    const radius = this.getWorldRadiusForLayer(layer);
    let pointPairs = new Array<Vector3>();
    segments.forEach(segment => {
      const vertices = this.segmentToVertices(segment, radius);
      pointPairs = pointPairs.concat(vertices);
    });
    geometry.setFromPoints(pointPairs);
    return this.toTargetObject3D(geometry);
  }

  protected getWorldRadiusForLayer(layer: string): number {
    const offset = this.getLayerRadiusOffset(layer);
    return WorldConstants.WORLD_RADIUS - (offset ? offset : 0);
  }

  private getLayerRadiusOffset(layer: string): number {
    switch (layer) {
      case SupportedLayers.STARS: return 0.04;
      case SupportedLayers.CONSTELLATION_LINES: return 0.02;
      case SupportedLayers.CONSTELLATION_BOUNDARIES: return 0.01;
      default: return 0;
    }
  }

  protected abstract segmentToVertices(segment: number[], radius: number): Vector3[];

  protected abstract toTargetObject3D(geometry: BufferGeometry): T;

}
