import { TestBed } from '@angular/core/testing';
import { LayerService } from '#core/services/layer.service';
import { ThemeService } from '#core/services/theme.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { SearchService } from '#core/services/search.service';
import { AggregateLayer } from '#core/models/layers/aggregate-layer';
import { SkyGrid } from '#layer-sky-grid/models/sky-grid';
import { Stars } from '#layer-stars/models/stars';
import { Constellations } from '#layer-constellations/models/constellations';
import { Messier } from '#layer-messier/models/messier';
import { SolarSystem } from '#layer-solar-system/model/solar-system';


describe('LayerService', () => {

  const code = Stars.CODE;
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

  describe('getIndex should return', () => {

    it('expected indices for existing layers', () => {
      service.rootLayer = mockedLayers;

      expect(service.getIndex(SkyGrid.CODE)).toEqual(0);
      expect(service.getIndex(Stars.CODE)).toEqual(1);
      expect(service.getIndex('stars-mag2.0')).toEqual(2);
      expect(service.getIndex('stars-mag2.5')).toEqual(3);
      expect(service.getIndex('stars-mag3.0')).toEqual(4);
      expect(service.getIndex(Constellations.CODE)).toEqual(5);
      expect(service.getIndex(Messier.CODE)).toEqual(6);
      expect(service.getIndex(SolarSystem.CODE)).toEqual(7);
    });

    describe('-1', () => {

      it('for the root layer', () => {
        service.rootLayer = mockedLayers;

        expect(service.getIndex('root')).toEqual(-1);
      });

      it('if the arg is falsy', () => {
        service.rootLayer = mockedLayers;

        expect(service.getIndex(undefined)).toEqual(-1);
      });

      it('for an unsupported layer', () => {
        service.rootLayer = mockedLayers;

        expect(service.getIndex('tesla-roadster')).toEqual(-1);
      });

    });

  });

});

