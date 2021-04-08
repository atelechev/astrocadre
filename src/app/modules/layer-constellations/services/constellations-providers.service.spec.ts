import { TestBed } from '@angular/core/testing';
import { CoreModule } from '#core/core.module';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { ConstellationsProvidersService } from '#layer-constellations/services/constellations-providers.service';


describe('ConstellationsProvidersService', () => {

  const constellationsLayer = mockedLayers.subLayers[2];
  let service: ConstellationsProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule
      ],
      providers: [ConstellationsProvidersService]
    });
    service = TestBed.inject(ConstellationsProvidersService);
  });

  it('should return a defined object for the "constellations" layer', () => {
    expect(service.getRenderableLayer(constellationsLayer)).toBeDefined();
  });

  it('should return a defined object for the "constellation-boundaries" layer', () => {
    expect(service.getRenderableLayer(constellationsLayer.subLayers[0])).toBeDefined();
  });

  it('should return a defined object for the "constellation-lines" layer', () => {
    expect(service.getRenderableLayer(constellationsLayer.subLayers[1])).toBeDefined();
  });

  it('should return a defined object for the "constellation-names" layer', () => {
    expect(service.getRenderableLayer(constellationsLayer.subLayers[2])).toBeDefined();
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
