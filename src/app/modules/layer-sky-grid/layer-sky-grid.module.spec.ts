import { TestBed } from '@angular/core/testing';
import { CoreModule } from '#core/core.module';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { LayerSkyGridModule } from '#layer-sky-grid/layer-sky-grid.module';


describe('LayerSkyGridModule', () => {

  let module: LayerSkyGridModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        LayerSkyGridModule
      ]
    });
    module = TestBed.inject(LayerSkyGridModule);
  });

  it('should return a defined object for the "sky-grid" layer', () => {
    expect(module.getLayerFactory(mockedLayers.subLayers[0])).toBeDefined();
  });

  describe('should return undefined', () => {

    it('if the arg is falsy', () => {
      expect(module.getLayerFactory(undefined)).toBeUndefined();
    });

    it('if the arg was not matched', () => {
      expect(module.getLayerFactory(mockedLayers.subLayers[1])).toBeUndefined();
    });

  });

});
