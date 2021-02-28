import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConstellationLinesLayer } from '#layers/constellation-lines-layer';
import { LinesFactory } from '#layers/geometry/lines-factory';
import { LayerFactory } from '#layers/layer-factory';
import { TreeNode } from '#core/tree-node';
import { StaticDataService } from '#core/static-data-service';
import { Layers } from '#core/layers';

@Injectable()
export class ConstellationLinesLayerFactory implements LayerFactory<ConstellationLinesLayer> {

  constructor(private dataService: StaticDataService,
    private linesFactory: LinesFactory) {

  }

  public newLayer(tree: TreeNode): Observable<ConstellationLinesLayer> {
    return this.dataService.getConstellationLines().pipe(
      map((rawSegments: number[][]) => {
        const lines = this.linesFactory.createObject3D(Layers.CONSTELLATION_LINES, rawSegments);
        return new ConstellationLinesLayer(tree, lines);
      })
    );
  }

}
