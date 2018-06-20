import { Injectable } from '@angular/core';
import { ConstellationBoundariesLayer } from './constellation-boundaries-layer';
import { LayerFactory } from './layer-factory';
import { TreeNode } from '../core/tree-node';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxialCurvesFactory } from './geometry/axial-curves-factory';
import { StaticDataService } from '../core/static-data-service';
import { Layers } from '../core/layers';

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
