import { TestBed } from '@angular/core/testing';
import { skip } from 'rxjs/operators';
import { LayerService } from '#core/services/layer.service';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { LayerEvent } from '#core/models/event/layer-event';
import { LayerShownEvent } from '#core/models/event/layer-shown-event';
import { LayerHiddenEvent } from '#core/models/event/layer-hidden-event';
import { SearchService } from '#core/services/search.service';
import { ThemeService } from '#core/services/theme.service';
import { MockedGridLayerFactory } from '#core/test-utils/mocked-grid-layer-factory.spec';
import { Layer } from '#core/models/layers/layer';
import { AggregateLayerFactory } from '#core/models/layers/factories/aggregate-layer-factory';

const model: Layer = {
  code: 'stars',
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

describe('LayersVisibilityManagerService', () => {

  const stars = 'stars';
  const starsMag2 = 'stars-mag2.0';
  const skyGrid = 'sky-grid';
  let manager: LayersVisibilityManagerService;
  let layerService: LayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LayerService,
        LayersVisibilityManagerService,
        SearchService,
        ThemeService
      ]
    });
    layerService = TestBed.inject(LayerService);
    manager = TestBed.inject(LayersVisibilityManagerService);
  });

  const loadMockedGridLayer = (): void => {
    const layer = new MockedGridLayerFactory().buildRenderableLayer();
    layerService.registerLayer(layer);
  };

  const loadHierarchicalLayers = (): void => {
    const parentLayer = new AggregateLayerFactory().buildRenderableLayer(model);
    layerService.registerLayer(parentLayer);
    const childLayer = new AggregateLayerFactory().buildRenderableLayer(model.subLayers[0]);
    layerService.registerLayer(childLayer);
  };

  const assertLayersShown = (expectedShown: Array<string>): void => {
    expectedShown.forEach(
      (code: string) => expect(manager.isShown(code)).toBeTrue()
    );
  };

  const assertLayersHidden = (expectedHidden: Array<string>): void => {
    expectedHidden.forEach(
      (code: string) => expect(manager.isShown(code)).toBeFalse()
    );
  };

  describe('isShown should return', () => {

    describe('false', () => {

      it('if the arg is falsy', () => {
        expect(manager.isShown(undefined)).toBeFalse();
      });

      it('if the layer is not shown', () => {
        expect(manager.isShown('stars-mag12.0')).toBeFalse();
      });

    });

    it('true if the layer is expected to be shown', () => {
      loadMockedGridLayer();
      manager.showLayer(skyGrid);
      expect(manager.isShown(skyGrid)).toBeTrue();
    });

  });

  describe('events should', () => {

    const assertEventPropagated = (expectedKey: string, done: DoneFn): void => {
      manager.events
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
      expect(manager.events).toBeDefined();
      manager.events
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
        manager.showLayer(skyGrid);
      });

      it('when a layer is hidden', (done: DoneFn) => {
        loadMockedGridLayer();
        assertEventPropagated(LayerHiddenEvent.KEY, done);
        manager.hideLayer(skyGrid);
      });

    });

  });

  describe('showLayer should', () => {

    it('have no effect if the arg is falsy', () => {
      manager.showLayer(undefined);
      expect(manager.isShown(undefined)).toBeFalse();
    });

    it('show the layer and its sub-layers', () => {
      loadHierarchicalLayers();

      manager.showLayer(stars);
      assertLayersShown([stars, starsMag2]);
    });

  });

  describe('hideLayer should', () => {

    it('have no effect if the arg is falsy', () => {
      manager.hideLayer(undefined);
      expect(manager.isShown(undefined)).toBeFalse();
    });

    it('hide the layer and its sub-layers', () => {
      loadHierarchicalLayers();

      manager.hideLayer(stars);
      assertLayersHidden([stars, starsMag2]);
    });

  });

});
