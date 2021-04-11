import { TestBed } from '@angular/core/testing';
import { CoreModule } from '#core/core.module';
import { LayerStarsModule } from '#layer-stars/layer-stars.module';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { StarsProvidersService } from '#layer-stars/services/stars-providers.service';
import { Layer } from '#core/models/layers/layer';
import { LayerStarsControlsComponent } from '#layer-stars/components/layer-stars-controls/layer-stars-controls.component';


describe('StarsProvidersService', () => {

  const starsLayer = mockedLayers.subLayers[1];
  let service: StarsProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        LayerStarsModule
      ]
    });
    service = TestBed.inject(StarsProvidersService);
  });

  describe('getRenderableLayer should return', () => {

    it('a defined object for the "stars" layer', () => {
      expect(service.getRenderableLayer(starsLayer)).toBeDefined();
    });

    it('a defined object for the "stars-mag2.0" layer', () => {
      expect(service.getRenderableLayer(starsLayer.subLayers[0])).toBeDefined();
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

    it('expected value for the "stars" layer arg', () => {
      expect(service.getUiControlsComponentType(starsLayer)).toEqual(LayerStarsControlsComponent);
    });

    describe('undefined', () => {

      it('for a falsy arg', () => {
        expect(service.getUiControlsComponentType(undefined)).toBeUndefined();
      });

      it('for the the sub-layers of the "stars" layer', () => {
        starsLayer.subLayers.forEach(
          (subLayer: Layer) => expect(service.getUiControlsComponentType(subLayer)).toBeUndefined()
        );
      });

    });

  });

});
