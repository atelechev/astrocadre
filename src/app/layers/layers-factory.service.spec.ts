
import {of as observableOf,  Observable } from 'rxjs';
import { LayersFactoryService } from './layers-factory.service';
import { TestBed } from '@angular/core/testing';
import { SkyGridLayerFactory } from './sky-grid-layer-factory';
import { RenderableLayerFactory } from './renderable-layer-factory';
import { ConstellationBoundariesLayerFactory } from './constellation-boundaries-layer-factory';
import { ConstellationLinesLayerFactory } from './constellation-lines-layer-factory';
import { ConstellationNamesLayerFactory } from './constellation-names-layer-factory';
import { StarsMagnitudeLayerFactory } from './stars-magnitude-layer-factory';
import { AxialCurvesFactory } from './geometry/axial-curves-factory';
import { LinesFactory } from './geometry/lines-factory';
import { PointsFactory } from './geometry/points-factory';
import { StaticDataService } from '../core/static-data-service';

import { ConstellationMetadata } from '../core/layer/constellation-metadata';
import { Layers } from '../core/layers';
import { LayersTreeNode } from '../core/layer/layers-tree-node';
import { SkyGridLayer } from './sky-grid-layer';
import { RenderableLayer } from '../core/layer/renderable-layer';
import { ConstellationBoundariesLayer } from './constellation-boundaries-layer';
import { ConstellationLinesLayer } from './constellation-lines-layer';
import { ConstellationNamesLayer } from './constellation-names-layer';
import { StarsMagnitudeLayer } from './stars-magnitude-layer';
import { newLayersTreeNode } from '../core/layer/layers-tree-node.spec';

class MockStaticData {
  public getConstellationBoundaries(): Observable<number[][]> {
    const data = [
      [ 305.0, -57.0, 305.0, -45.5 ],
      [ 90.0, -61.0, 82.5, -61.0 ],
      [ 350.0, -37.0, 345.0, -37.0 ]
    ];
    return observableOf(data);
  }

  public getConstellationLines(): Observable<number[][]> {
    const data = [
      [ 56.05, -64.8, 63.6, -62.47 ],
      [ 59.69, -61.4, 56.05, -64.8 ]
    ];
    return observableOf(data);
  }

  public getStarsByMagnitudeClass(magnitudeClass: number): Observable<any[][]> {
    const data = [
      [ 24.43, -57.24, 0.5, 'Achernar', 'ALP ERI' ],
      [ 37.95, 89.26, 2.0, 'Polaris', 'ALP UMI' ]
    ];
    return observableOf(data);
  }

  public getConstellationsMetadata(): Observable<ConstellationMetadata[]> {
    const data = [
      { type: 'constellation', code: 'AND', ra: 8.532, dec: 38.906, names: [ 'Andromeda', 'Andromeda' ] },
      { type: 'constellation', code: 'ANT', ra: 150.722, dec: -33.231, names: [ 'Antlia', 'Pump' ] }
    ];
    return observableOf(data);
  }

}

describe('LayersFactoryService', () => {

  let service: LayersFactoryService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      providers: [
        LayersFactoryService,
        RenderableLayerFactory,
        SkyGridLayerFactory,
        ConstellationBoundariesLayerFactory,
        ConstellationLinesLayerFactory,
        ConstellationNamesLayerFactory,
        StarsMagnitudeLayerFactory,
        AxialCurvesFactory,
        LinesFactory,
        PointsFactory,
        { provide: StaticDataService, useClass: MockStaticData }
      ] });
    service = TestBed.get(LayersFactoryService);
  });

  const layerNode = (code: string): LayersTreeNode => {
    return newLayersTreeNode(code, []);
  };

  it('#newRenderableLayer should throw expected error if arg is undefined', () => {
    expect(() => service.newRenderableLayer(undefined))
      .toThrow(new Error('layer arg must be defined, but was \'undefined\''));
  });

  it('#newRenderableLayer should throw expected error if layer name is unexpected', () => {
    expect(() => service.newRenderableLayer(layerNode('test')))
      .toThrow(new Error('Unsupported layer: test'));
  });

  const assertLayerRetrieved = (layerName: string, checkFunct: (l: RenderableLayer) => boolean): void => {
    const observedLayer = service.newRenderableLayer(layerNode(layerName));
    expect(observedLayer).toBeDefined();
    observedLayer.subscribe(
      (layer: RenderableLayer) => expect(checkFunct(layer)).toBeTruthy()
    );
  };

  it('#newRenderableLayer should return a defined instance of SkyGrid layer', () => {
    assertLayerRetrieved(Layers.SKY_GRID, (l) => l instanceof SkyGridLayer);
  });

  it('#newRenderableLayer should return a defined instance of Stars layer', () => {
    assertLayerRetrieved(Layers.STARS, (l) => l instanceof RenderableLayer);
  });

  it('#newRenderableLayer should return a defined instance of Constellations layer', () => {
    assertLayerRetrieved(Layers.CONSTELLATIONS, (l) => l instanceof RenderableLayer);
  });

  it('#newRenderableLayer should return a defined instance of ConstellationBoundaries layer', () => {
    assertLayerRetrieved(Layers.CONSTELLATION_BOUNDARIES, (l) => l instanceof ConstellationBoundariesLayer);
  });

  it('#newRenderableLayer should return a defined instance of ConstellationLines layer', () => {
    assertLayerRetrieved(Layers.CONSTELLATION_LINES, (l) => l instanceof ConstellationLinesLayer);
  });

  it('#newRenderableLayer should return a defined instance of ConstellationNames layer', () => {
    assertLayerRetrieved(Layers.CONSTELLATION_NAMES, (l) => l instanceof ConstellationNamesLayer);
  });

  it('#newRenderableLayer should return defined instances of StarsMagnitude layers', () => {
    [ 2.0, 2.5, 3.0 ].forEach(
      (magnitude: number) => {
        assertLayerRetrieved(`stars-mag${magnitude}`, (l) => l instanceof StarsMagnitudeLayer);
      }
    );
  });

});
