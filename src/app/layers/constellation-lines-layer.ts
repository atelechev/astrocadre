import { RenderableLayer } from '../core/renderable-layer';
import { Object3D, LineSegments } from 'three';
import { MergedLines } from './geometry/merged-lines';
import { Layers } from '../core/layers';
import { Theme } from '../core/theme';

export class ConstellationLinesLayer extends RenderableLayer {

  private mergedLines: LineSegments;

  private objects: Object3D[];

  constructor(rawSegments: number[][]) {
    super();
    this.mergedLines = <LineSegments> new MergedLines(rawSegments, 1.98).toObject3D(); // TODO
    this.objects = [ this.mergedLines ];
  }

  public getObjects(): Object3D[] {
    return this.objects;
  }

  public getName(): string {
    return 'constellation lines';
  }

  public useTheme(theme: Theme): void {
    const materials = theme.getMaterialsForLayer(Layers.constellation_lines);
    const material = materials.get('line-common');
    this.mergedLines.material = material;
    material.needsUpdate = true;
  }

}
