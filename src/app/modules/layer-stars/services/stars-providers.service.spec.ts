import { TestBed } from '@angular/core/testing';
import { CoreModule } from '#core/core.module';
import { LayerStarsModule } from '#layer-stars/layer-stars.module';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { StarsProvidersService } from '#layer-stars/services/stars-providers.service';


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

  it('should return a defined object for the "stars" layer', () => {
    expect(service.getRenderableLayer(starsLayer)).toBeDefined();
  });

  it('should return a defined object for the "stars-mag2.0" layer', () => {
    expect(service.getRenderableLayer(starsLayer.subLayers[0])).toBeDefined();
  });

  describe('should return undefined', () => {

    it('if the arg is falsy', () => {
      expect(service.getRenderableLayer(undefined)).toBeUndefined();
    });

    it('if the arg was not matched', () => {
      expect(service.getRenderableLayer(mockedLayers.subLayers[0])).toBeUndefined();
    });

  });

});
