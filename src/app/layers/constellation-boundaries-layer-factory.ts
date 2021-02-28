import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxialCurvesFactory } from '#layers/geometry/axial-curves-factory';
import { LayerFactory } from '#layers/layer-factory';
import { Layers } from '#core/layers';
import { StaticDataService } from '#core/static-data-service';
import { TreeNode } from '#core/tree-node';
import { ConstellationBoundariesLayer } from '#layers/constellation-boundaries-layer';

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
