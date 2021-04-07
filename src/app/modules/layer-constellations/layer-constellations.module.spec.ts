import { TestBed } from '@angular/core/testing';
import { CoreModule } from '#core/core.module';
import { LayerConstellationsModule } from '#layer-constellations/layer-constellations.module';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';


describe('LayerConstellationsModule', () => {

  const constellationsLayer = mockedLayers.subLayers[2];
  let module: LayerConstellationsModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        LayerConstellationsModule
      ]
    });
    module = TestBed.inject(LayerConstellationsModule);
  });

  it('should return a defined object for the "constellations" layer', () => {
    expect(module.getLayerFactory(constellationsLayer)).toBeDefined();
  });

  it('should return a defined object for the "constellation-boundaries" layer', () => {
    expect(module.getLayerFactory(constellationsLayer.subLayers[0])).toBeDefined();
  });

  it('should return a defined object for the "constellation-lines" layer', () => {
    expect(module.getLayerFactory(constellationsLayer.subLayers[1])).toBeDefined();
  });

  it('should return a defined object for the "constellation-names" layer', () => {
    expect(module.getLayerFactory(constellationsLayer.subLayers[2])).toBeDefined();
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
