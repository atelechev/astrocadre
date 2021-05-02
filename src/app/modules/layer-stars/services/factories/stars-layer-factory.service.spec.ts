import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { StarsLayerFactoryService } from '#layer-stars/services/factories/stars-layer-factory.service';
import { Stars } from '#layer-stars/models/stars';
import { CoreModule } from '#core/core.module';
import { StaticDataService } from '#core/services/static-data.service';
import { StarsProvidersService } from '#layer-stars/services/stars-providers.service';


describe('StarsLayerFactoryService', () => {

  const objects = [
    [37.95, 89.26, 2.0, 'Polaris', 'ALP UMI']
  ];
  const code = 'stars-mag2.0';
  let factory: LayerFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [
        StarsLayerFactoryService,
        StarsProvidersService
      ]
    });
    const dataService = TestBed.inject(StaticDataService);
    spyOn(dataService, 'getDataJson').and.returnValue(of(objects));
    factory = TestBed.inject(StarsLayerFactoryService);
  });

  it('buildRenderableLayer should return expected value', (done: DoneFn) => {
    TestBed.inject(StarsProvidersService).getRenderableLayer(code)
      .then(
        (layer: Stars) => {
          expect(layer).toBeDefined();
          expect(layer.code).toEqual(code);
          expect(layer.magnitudeClass).toEqual(2);
          expect(layer.objects.length).toEqual(1);
          expect(layer.texts.length).toEqual(1);
          expect(layer.searchables.length).toEqual(1);
          done();
        }
      );
  });

});
