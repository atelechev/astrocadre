import { TestBed } from '@angular/core/testing';
import { CoreModule } from '#core/core.module';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { LayerSkyGridModule } from '#layer-sky-grid/layer-sky-grid.module';
import { SkyGridProvidersService } from '#layer-sky-grid/services/sky-grid-providers.service';


describe('SkyGridProvidersService', () => {

  let service: SkyGridProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        LayerSkyGridModule
      ]
    });
    service = TestBed.inject(SkyGridProvidersService);
  });

  describe('getRenderableLayer should return', () => {

    it('a defined object for the "sky-grid" layer', () => {
      expect(service.getRenderableLayer(mockedLayers.subLayers[0])).toBeDefined();
    });

    describe('undefined', () => {

      it('if the arg is falsy', () => {
        expect(service.getRenderableLayer(undefined)).toBeUndefined();
      });

      it('if the arg was not matched', () => {
        expect(service.getRenderableLayer(mockedLayers.subLayers[1])).toBeUndefined();
      });

    });

  });

  describe('getUiControlsComponentType should return undefined', () => {

    it('for a falsy arg', () => {
      expect(service.getUiControlsComponentType(undefined)).toBeUndefined();
    });

    it('for the "sky-grid" layer arg', () => {
      expect(service.getUiControlsComponentType(mockedLayers.subLayers[0])).toBeUndefined();
    });

  });

});
