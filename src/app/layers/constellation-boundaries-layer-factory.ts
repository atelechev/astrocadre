import { Injectable } from '@angular/core';
import { ConstellationBoundariesLayer } from './constellation-boundaries-layer';
import { LayerFactory } from './layer-factory';
import { LayersTreeNode } from '../core/layer/layers-tree-node';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AxialCurvesFactory } from './geometry/axial-curves-factory';
import { StaticDataService } from '../core/static-data-service';
import { Layers } from '../core/layers';

@Injectable()
export class ConstellationBoundariesLayerFactory implements LayerFactory<ConstellationBoundariesLayer> {

  constructor(private dataService: StaticDataService,
              private objectsFactory: AxialCurvesFactory) {

  }

  public newLayer(tree: LayersTreeNode): Observable<ConstellationBoundariesLayer> {
    return this.dataService.getConstellationBoundaries().map(
      (rawBoundaries: number[][]) => {
        const boundaries = this.objectsFactory.createObject3D(Layers.CONSTELLATION_BOUNDARIES, rawBoundaries);
        return new ConstellationBoundariesLayer(tree, boundaries);
      }
    );
  }

}
