import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MessierLayerFactoryService } from '#layer-messier/services/factories/messier-layer.factory.service';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { CoreModule } from '#core/core.module';
import { Messier } from '#layer-messier/models/messier';
import { MessierProvidersService } from '#layer-messier/services/messier-providers.service';
import { StaticDataService } from '#core/services/static-data.service';


describe('MessierLayerFactoryService', () => {

  const objects = [
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
  ];
  let factory: LayerFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [
        MessierProvidersService,
        MessierLayerFactoryService
      ]
    });
    factory = TestBed.inject(MessierLayerFactoryService);
  });

  it('buildRenderableLayer should return expected value', (done: DoneFn) => {
    const dataService = TestBed.inject(StaticDataService);
    spyOn(dataService, 'getDataJson').and.returnValue(of(objects));

    TestBed.inject(MessierProvidersService).getRenderableLayer()
      .then(
        (layer: Messier) => {
          expect(layer).toBeDefined();
          expect(layer.code).toEqual(Messier.CODE);
          expect(layer.objects.length).toEqual(4);
          expect(layer.texts.length).toEqual(4);
          expect(layer.searchables.length).toEqual(4);
          done();
        }
      );
  });

});
