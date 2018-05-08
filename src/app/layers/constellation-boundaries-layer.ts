import { RenderableLayer } from '../core/renderable-layer';
import { Object3D, LineSegments } from 'three';
import { MergedAxialCurves } from './geometry/merged-axial-curves';
import { Layers } from '../core/layers';
import { Theme } from '../core/theme';
import { Constants } from '../core/constants';

export class ConstellationBoundariesLayer extends RenderableLayer {

  private mergedCurves: LineSegments;

  private objects: Object3D[];

  constructor(rawSegments: number[][]) {
    super();
    this.mergedCurves = new MergedAxialCurves(rawSegments, Constants.WORLD_RADIUS - 0.02).toObject3D();
    this.objects = [ this.mergedCurves ];
  }

  public getObjects(): Object3D[] {
    return this.objects;
  }

  public getName(): string {
    return Layers.CONSTELLATION_BOUNDARIES;
  }

  public useTheme(theme: Theme): void {
    const materials = theme.getMaterialsForLayer(this.getName());
    const lineCommon = materials.get('line-common');
    this.mergedCurves.material = lineCommon;
    lineCommon.needsUpdate = true;
  }

}
