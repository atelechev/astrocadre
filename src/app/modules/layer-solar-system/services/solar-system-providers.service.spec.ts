import { TestBed } from '@angular/core/testing';
import { CoreModule } from '#core/core.module';
import { SolarSystemProvidersService } from '#layer-solar-system/services/solar-system-providers.service';
import { LayerSolarSystemModule } from '#layer-solar-system/layer-solar-system.module';
import { SelectorSolarSystemObjectsComponent } from '#layer-solar-system/components/selector-solar-system-objects/selector-solar-system-objects.component';
import { SolarSystem } from '#layer-solar-system/model/solar-system';
import { RenderableLayer } from '#core/models/layers/renderable-layer';


describe('SolarSystemProvidersService', () => {

  let service: SolarSystemProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        LayerSolarSystemModule
      ]
    });
    service = TestBed.inject(SolarSystemProvidersService);
  });

  it('getRenderableLayer should return expected layer', (done: DoneFn) => {
    service.getRenderableLayer().then(
      (layer: RenderableLayer) => {
        expect(layer).toBeDefined();
        expect(layer.code).toEqual(SolarSystem.CODE);
        done();
      }
    );
  });

  it('getUiControlsComponentType should return expected value for the "solar-system" layer arg', () => {
    expect(service.getUiControlsComponentType()).toEqual(SelectorSolarSystemObjectsComponent);
  });

});
