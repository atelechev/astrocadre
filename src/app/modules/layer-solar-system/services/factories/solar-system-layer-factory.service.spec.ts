import { fakeAsync, TestBed } from '@angular/core/testing';
import { LayerSolarSystemModule } from '#layer-solar-system/layer-solar-system.module';
import { SolarSystemLayerFactoryService } from '#layer-solar-system/services/factories/solar-system-layer-factory.service';
import { SolarSystem } from '#layer-solar-system/model/solar-system';
import { SolarSystemProvidersService } from '#layer-solar-system/services/solar-system-providers.service';


describe('SolarSystemLayerFactoryService', () => {

  let factory: SolarSystemLayerFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LayerSolarSystemModule]
    });
    factory = TestBed.inject(SolarSystemLayerFactoryService);
  });

  it('buildRenderableLayer should return expected value', fakeAsync(() => {
    TestBed.inject(SolarSystemProvidersService).getRenderableLayer()
      .then(
        (layer: SolarSystem) => {
          expect(layer).toBeDefined();
          expect(layer.code).toEqual(SolarSystem.CODE);
          expect(layer.objects.length).toEqual(18);
          expect(layer.texts.length).toEqual(9);
          expect(layer.searchables.length).toEqual(9);
        }
      );
  }));

});
