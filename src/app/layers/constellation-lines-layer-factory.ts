import { LayerFactory } from './layer-factory';
import { ConstellationLinesLayer } from './constellation-lines-layer';
import { LayersTreeNode } from '../core/layer/layers-tree-node';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { StaticDataService } from '../core/static-data-service';
import { LinesFactory } from './geometry/lines-factory';
import { Layers } from '../core/layers';

@Injectable()
export class ConstellationLinesLayerFactory implements LayerFactory<ConstellationLinesLayer> {

  constructor(private dataService: StaticDataService,
              private linesFactory: LinesFactory) {

  }

  public newLayer(tree: LayersTreeNode): Observable<ConstellationLinesLayer> {
    return this.dataService.getConstellationLines().pipe(
      map((rawSegments: number[][]) => {
          const lines = this.linesFactory.createObject3D(Layers.CONSTELLATION_LINES, rawSegments);
          return new ConstellationLinesLayer(tree, lines);
      })
    );
  }

}
