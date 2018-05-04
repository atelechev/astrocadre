import { RenderableLayer } from '../core/renderable-layer';
import { Object3D, LineSegments } from 'three';
import { MergedAxialCurves } from './geometry/merged-axial-curves';
import { Layers } from '../core/layers';
import { Theme } from '../core/theme';

export class ConstellationBoundariesLayer extends RenderableLayer {

  private mergedCurves: LineSegments;

  private objects: Object3D[];

  constructor(rawSegments: number[][]) {
    super();
    this.mergedCurves = new MergedAxialCurves(rawSegments, 1.98).toObject3D();
    this.objects = [ this.mergedCurves ];
  }

  public getObjects(): Object3D[] {
    return this.objects;
  }

  public getName(): string {
    return 'constellation boundaries';
  }

  public useTheme(theme: Theme): void {
    const materials = theme.getMaterialsForLayer(Layers.constellation_boundaries);
    const lineCommon = materials.get('line-common');
    this.mergedCurves.material = lineCommon;
    lineCommon.needsUpdate = true;
  }

}
