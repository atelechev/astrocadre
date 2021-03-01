import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConstellationLinesLayer } from '#layers/models/constellation-lines-layer';
import { LinesFactory } from '#layers/services/lines-factory';
import { LayerFactory } from '#layers/services/layer-factory';
import { TreeNode } from '#core/models/tree-node';
import { StaticDataService } from '#core/services/static-data.service';
import { Layers } from '#core/models/layers';

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
