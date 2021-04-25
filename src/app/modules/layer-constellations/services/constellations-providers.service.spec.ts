import { TestBed } from '@angular/core/testing';
import { CoreModule } from '#core/core.module';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { ConstellationsProvidersService } from '#layer-constellations/services/constellations-providers.service';
import { Layer } from '#core/models/layers/layer';
import { LayerConstellationsControlsComponent } from '#layer-constellations/components/layer-constellations-controls/layer-constellations-controls.component';
import { ConstellationsLayerFactoryService } from '#layer-constellations/services/factories/constellations-layer-factory.service';


describe('ConstellationsProvidersService', () => {

  const constellationsLayer: Layer = {
    code: 'constellations',
    label: 'Constellations',
    loadFromUrl: true,
    objects: [{
      boundaries: [[177.5, -24.5, 162.5, -24.5]],
      lines: [[72.46, 6.95, 72.65, 8.9]],
      names: [
        {
          type: 'constellation',
          code: 'AND',
          ra: 8.532,
          dec: 38.906,
          names: ['Andromeda']
        }
      ]
    }]
  };
  let service: ConstellationsProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule
      ],
      providers: [
        ConstellationsLayerFactoryService,
        ConstellationsProvidersService
      ]
    });
    service = TestBed.inject(ConstellationsProvidersService);
  });


  describe('getRenderableLayer should return', () => {

    it('a defined object for the "constellations" layer', () => {
      expect(service.getRenderableLayer(constellationsLayer)).toBeDefined();
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

    it('expected value for the "constellations" layer arg', () => {
      expect(service.getUiControlsComponentType(constellationsLayer)).toEqual(LayerConstellationsControlsComponent);
    });

    it('undefined for a falsy arg', () => {
      expect(service.getUiControlsComponentType(undefined)).toBeUndefined();
    });

  });

});
