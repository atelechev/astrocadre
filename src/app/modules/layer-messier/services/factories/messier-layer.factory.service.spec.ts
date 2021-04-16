import { TestBed } from '@angular/core/testing';
import { MessierLayerFactoryService } from '#layer-messier/services/factories/messier-layer.factory.service';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { PointsFactoryService } from '#core/services/factories/points-factory.service';


describe('MessierLayerFactoryService', () => {

  const model = {
    code: 'messier',
    label: 'Messier objects',
    loadFromUrl: true,
    objects: [
      {
        type: 'nebula-supernova',
        code: 'M1',
        ra: 83.63308,
        dec: 22.01450,
        names: ['Crab Nebula'],
        mag: 8.4,
        size: [7.0, 5.0]
      },
      {
        type: 'cluster-open',
        code: 'M6',
        ra: 265.0833,
        dec: -32.2533,
        names: ['Butterfly Cluster'],
        mag: 4.2,
        size: [20.0, 20.0, 90]
      },
      {
        type: 'galaxy-spiral',
        code: 'M31',
        ra: 10.684708,
        dec: 41.26875,
        names: ['Andromeda Galaxy'],
        mag: 3.4,
        size: [199.53, 70.79, 35]
      },
      {
        type: 'asterism',
        code: 'M73',
        ra: 314.7500,
        dec: -12.633,
        names: [],
        mag: 9.0,
        size: []
      }
    ]
  };
  let factory: LayerFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PointsFactoryService,
        MessierLayerFactoryService
      ]
    });
    factory = TestBed.inject(MessierLayerFactoryService);
  });

  it('buildRenderableLayer should return expected value', () => {
    const layer = factory.buildRenderableLayer(model);
    expect(layer).toBeDefined();
    expect(layer.code).toEqual(model.code);
    expect(layer.objects.length).toEqual(4);
    expect(layer.texts.length).toEqual(4);
    expect(layer.searchables.length).toEqual(4);
  });

});
