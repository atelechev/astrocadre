import { TestBed } from '@angular/core/testing';
import { CoreModule } from '#core/core.module';
import { LayerStarsModule } from '#layer-stars/layer-stars.module';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';


describe('LayerStarsModule', () => {

  const starsLayer = mockedLayers.subLayers[1];
  let module: LayerStarsModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        LayerStarsModule
      ]
    });
    module = TestBed.inject(LayerStarsModule);
  });

  it('should return a defined object for the "stars" layer', () => {
    expect(module.getLayerFactory(starsLayer)).toBeDefined();
  });

  it('should return a defined object for the "stars-mag2.0" layer', () => {
    expect(module.getLayerFactory(starsLayer.subLayers[0])).toBeDefined();
  });

  describe('should return undefined', () => {

    it('if the arg is falsy', () => {
      expect(module.getLayerFactory(undefined)).toBeUndefined();
    });

    it('if the arg was not matched', () => {
      expect(module.getLayerFactory(mockedLayers.subLayers[0])).toBeUndefined();
    });

  });

});
