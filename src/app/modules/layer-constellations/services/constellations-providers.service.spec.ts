import { TestBed } from '@angular/core/testing';
import { CoreModule } from '#core/core.module';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { ConstellationsProvidersService } from '#layer-constellations/services/constellations-providers.service';
import { BoundariesLayerFactoryService } from '#layer-constellations/services/factories/boundaries-layer-factory.service';
import { LinesLayerFactoryService } from '#layer-constellations/services/factories/lines-layer-factory.service';
import { NamesLayerFactoryService } from '#layer-constellations/services/factories/names-layer-factory.service';
import { Layer } from '#core/models/layers/layer';


describe('ConstellationsProvidersService', () => {

  const constellationsLayer = mockedLayers.subLayers[2];
  let service: ConstellationsProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule
      ],
      providers: [
        BoundariesLayerFactoryService,
        LinesLayerFactoryService,
        NamesLayerFactoryService,
        ConstellationsProvidersService
      ]
    });
    service = TestBed.inject(ConstellationsProvidersService);
  });


  describe('getRenderableLayer should return', () => {

    it('a defined object for the "constellations" layer', () => {
      expect(service.getRenderableLayer(constellationsLayer)).toBeDefined();
    });

    it('a defined object for the "constellation-boundaries" layer', () => {
      expect(service.getRenderableLayer(constellationsLayer.subLayers[0])).toBeDefined();
    });

    it('a defined object for the "constellation-lines" layer', () => {
      expect(service.getRenderableLayer(constellationsLayer.subLayers[1])).toBeDefined();
    });

    it('a defined object for the "constellation-names" layer', () => {
      expect(service.getRenderableLayer(constellationsLayer.subLayers[2])).toBeDefined();
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

  describe('getUiControlsComponentType should return undefined', () => {

    it('for a falsy arg', () => {
      expect(service.getUiControlsComponentType(undefined)).toBeUndefined();
    });

    it('for the "constellations" layer and its sub-layers', () => {
      expect(service.getUiControlsComponentType(constellationsLayer)).toBeUndefined();

      constellationsLayer.subLayers.forEach(
        (subLayer: Layer) => expect(service.getUiControlsComponentType(subLayer)).toBeUndefined()
      );
    });

  });

});
