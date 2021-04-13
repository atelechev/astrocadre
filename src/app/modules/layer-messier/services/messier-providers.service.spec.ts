import { TestBed } from '@angular/core/testing';
import { LayerMessierModule } from 'src/app/modules/layer-messier/layer-messier.module';
import { MessierProvidersService } from 'src/app/modules/layer-messier/services/messier-providers.service';
import { CoreModule } from '#core/core.module';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';


describe('MessierProvidersService', () => {

  let service: MessierProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        LayerMessierModule
      ]
    });
    service = TestBed.inject(MessierProvidersService);
  });

  describe('getRenderableLayer should return', () => {

    it('a defined object for the "messier" layer', () => {
      expect(service.getRenderableLayer(mockedLayers.subLayers[3])).toBeDefined();
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

    it('for the "messier" layer arg', () => {
      expect(service.getUiControlsComponentType(mockedLayers.subLayers[0])).toBeUndefined();
    });

  });

});