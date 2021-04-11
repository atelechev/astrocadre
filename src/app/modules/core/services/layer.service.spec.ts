import { TestBed } from '@angular/core/testing';
import { LayerService } from '#core/services/layer.service';
import { ThemeService } from '#core/services/theme.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { SearchService } from '#core/services/search.service';
import { AggregateLayer } from '#core/models/layers/aggregate-layer';


describe('LayerService', () => {

  const code = 'stars';
  let service: LayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LayerService,
        SearchService,
        ThemeService
      ]
    });
    service = TestBed.inject(LayerService);
  });

  const registerMockedLayer = (): void => {
    const mockedLayer = new AggregateLayer(mockedLayers.subLayers[1]);
    service.registerLayer(mockedLayer);
  };

  describe('getRenderableLayer should return', () => {

    describe('undefined', () => {

      it('if the arg is undefined', () => {
        expect(service.getRenderableLayer(undefined)).toBeUndefined();
      });

      it('if the layer was not found', () => {
        expect(service.getRenderableLayer('no-layer')).toBeUndefined();
      });

    });

    it('expected layer for existing code', () => {
      registerMockedLayer();

      const layer = service.getRenderableLayer(code);
      expect(layer).toBeDefined();
      expect(layer.code).toEqual(code);
    });

  });

  describe('getModel should return', () => {

    it('undefined if the arg is falsy', () => {
      expect(service.getModel(undefined)).toBeUndefined();
    });

    it('undefined if the layer was not found', () => {
      expect(service.getModel('stars-mag8.0')).toBeUndefined();
    });

    it('expected object if the layer model was found', () => {
      registerMockedLayer();

      const model = service.getModel(code);
      expect(model).toBeDefined();
      expect(model.code).toEqual(code);
    });

  });

});

