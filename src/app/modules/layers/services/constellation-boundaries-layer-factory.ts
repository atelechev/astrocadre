import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Layers } from '#core/models/layers';
import { TreeNode } from '#core/models/tree-node';
import { StaticDataService } from '#core/services/static-data.service';
import { AxialCurvesFactory } from '#layers/services/axial-curves-factory';
import { LayerFactory } from '#layers/services/layer-factory';
import { ConstellationBoundariesLayer } from '#layers/models/constellation-boundaries-layer';

@Injectable()
export class ConstellationBoundariesLayerFactory implements LayerFactory<ConstellationBoundariesLayer> {

  constructor(private dataService: StaticDataService,
    private objectsFactory: AxialCurvesFactory) {

  }

  public newLayer(tree: TreeNode): Observable<ConstellationBoundariesLayer> {
    return this.dataService.getConstellationBoundaries().pipe(
      map((rawBoundaries: number[][]) => {
        const boundaries = this.objectsFactory.createObject3D(Layers.CONSTELLATION_BOUNDARIES, rawBoundaries);
        return new ConstellationBoundariesLayer(tree, boundaries);
      })
    );
  }

}
