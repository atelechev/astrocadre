import { TestBed } from '@angular/core/testing';
import { skip } from 'rxjs/operators';
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
import { MockedGridLayerFactory } from '#core/test-utils/mocked-grid-layer-factory.spec';
import { AggregateLayerFactoryService } from '#core/services/factories/aggregate-layer-factory.service';
import { LayerEvent } from '#core/models/event/layer-event';
import { LayerShownEvent } from '#core/models/event/layer-shown-event';
import { LayerHiddenEvent } from '#core/models/event/layer-hidden-event';
import { Layer } from '#core/models/layers/layer';


describe('LayerService', () => {

  const model: Layer = {
    code: Stars.CODE,
    label: 'Stars',
    loadFromUrl: false,
    objects: [],
    subLayers: [
      {
        code: 'stars-mag2.0',
        label: 'Magnitude < 2.0',
        loadFromUrl: true,
        objects: []
      }
    ]
  };

  const stars = Stars.CODE;
  const starsMag2 = 'stars-mag2.0';
  const skyGrid = SkyGrid.CODE;
  let service: LayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AggregateLayerFactoryService,
        LayerService,
        MockedGridLayerFactory,
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

  const loadMockedGridLayer = (): void => {
    const layer = TestBed.inject(MockedGridLayerFactory).buildRenderableLayer();
    service.registerLayer(layer);
  };

  const loadHierarchicalLayers = (): void => {
    const factory = TestBed.inject(AggregateLayerFactoryService);
    const parentLayer = factory.buildRenderableLayer(model);
    service.registerLayer(parentLayer);
    const childLayer = factory.buildRenderableLayer(model.subLayers[0]);
    service.registerLayer(childLayer);
  };

  const assertLayersShown = (expectedShown: Array<string>): void => {
    expectedShown.forEach(
      (code: string) => expect(service.isShown(code)).toBeTrue()
    );
  };

  const assertLayersHidden = (expectedHidden: Array<string>): void => {
    expectedHidden.forEach(
      (code: string) => expect(service.isShown(code)).toBeFalse()
    );
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

      const layer = service.getRenderableLayer(stars);
      expect(layer).toBeDefined();
      expect(layer.code).toEqual(stars);
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

      const layer = service.getModel(stars);
      expect(layer).toBeDefined();
      expect(layer.code).toEqual(stars);
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

  describe('isShown should return', () => {

    describe('false', () => {

      it('if the arg is falsy', () => {
        expect(service.isShown(undefined)).toBeFalse();
      });

      it('if the layer is not shown', () => {
        expect(service.isShown('stars-mag12.0')).toBeFalse();
      });

    });

    it('true if the layer is expected to be shown', () => {
      loadMockedGridLayer();
      service.setVisible(skyGrid, true);
      expect(service.isShown(skyGrid)).toBeTrue();
    });

  });

  describe('events should', () => {

    const assertEventPropagated = (expectedKey: string, done: DoneFn): void => {
      service.events
        .pipe(skip(1))
        .subscribe(
          (event: LayerEvent<any>) => {
            expect(event.key).toEqual(expectedKey);
            expect(event.data.code).toEqual(skyGrid);
            done();
          }
        );
    };

    it('be defined when the service is initialized and emit the expected initial event', (done: DoneFn) => {
      expect(service.events).toBeDefined();
      service.events
        .subscribe(
          (event: LayerEvent<any>) => {
            expect(event).toEqual(LayerEvent.INITIAL);
            done();
          }
        );
    });

    describe('propagate an event', () => {

      it('when a layer is shown', (done: DoneFn) => {
        loadMockedGridLayer();
        assertEventPropagated(LayerShownEvent.KEY, done);
        service.setVisible(skyGrid, true);
      });

      it('when a layer is hidden', (done: DoneFn) => {
        loadMockedGridLayer();
        assertEventPropagated(LayerHiddenEvent.KEY, done);
        service.setVisible(skyGrid, false);
      });

    });

  });

  describe('setVisible should', () => {

    it('have no effect if the arg is falsy', () => {
      service.setVisible(undefined, true);
      expect(service.isShown(undefined)).toBeFalse();
    });

    it('show the layer and its sub-layers if the 2nd arg is true', () => {
      loadHierarchicalLayers();

      service.setVisible(stars, true);
      assertLayersShown([stars, starsMag2]);
    });

    it('hide the layer and its sub-layers if the 2nd arg is false', () => {
      loadHierarchicalLayers();

      service.setVisible(stars, false);
      assertLayersHidden([stars, starsMag2]);
    });

  });

});

