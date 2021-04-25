import { TestBed } from '@angular/core/testing';
import { CoreModule } from '#core/core.module';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { SolarSystemProvidersService } from '#layer-solar-system/services/solar-system-providers.service';
import { LayerSolarSystemModule } from '#layer-solar-system/layer-solar-system.module';
import { SelectorSolarSystemObjectsComponent } from '#layer-solar-system/components/selector-solar-system-objects/selector-solar-system-objects.component';
import { SolarSystem } from '#layer-solar-system/model/solar-system';


describe('SolarSystemProvidersService', () => {

  const solarSystemLayer = {
    code: SolarSystem.CODE,
    label: 'Solar system',
    loadFromUrl: false,
    objects: []
  };
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

  describe('getRenderableLayer should return', () => {

    it('a defined object for the "solar-system" layer', () => {
      expect(service.getRenderableLayer(solarSystemLayer)).toBeDefined();
    });

    describe('undefined', () => {

      it('if the arg is falsy', () => {
        expect(service.getRenderableLayer(undefined)).toBeUndefined();
      });

      it('if the arg was not matched', () => {
        expect(service.getRenderableLayer(mockedLayers.subLayers[0])).toBeUndefined();
      });

    });

  });

  describe('getUiControlsComponentType should return', () => {

    describe('undefined', () => {

      it('for a falsy arg', () => {
        expect(service.getUiControlsComponentType(undefined)).toBeUndefined();
      });

      it('for an unsupported layer arg', () => {
        expect(service.getUiControlsComponentType(mockedLayers.subLayers[0])).toBeUndefined();
      });

    });

    it('expected value for the "solar-system" layer arg', () => {
      expect(service.getUiControlsComponentType(solarSystemLayer)).toEqual(SelectorSolarSystemObjectsComponent);
    });

  });

});
