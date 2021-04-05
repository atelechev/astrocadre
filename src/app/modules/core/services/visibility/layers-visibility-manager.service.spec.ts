import { TestBed } from '@angular/core/testing';
import { skip } from 'rxjs/operators';
import { LayerService } from '#core/services/layer.service';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { registerMockStarsLayers } from '#core/test-utils/utils.spec';
import { LayerEvent } from '#core/models/event/layer-event';
import { LayerShownEvent } from '#core/models/event/layer-shown-event';
import { LayerHiddenEvent } from '#core/models/event/layer-hidden-event';
import { LayersFactoryService } from '#core/services/layers-factory.service';
import { SearchService } from '#core/services/search.service';
import { ThemeService } from '#core/services/theme.service';


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
        LayersFactoryService,
        LayersVisibilityManagerService,
        SearchService,
        ThemeService
      ]
    });
    layerService = TestBed.inject(LayerService);
    manager = TestBed.inject(LayersVisibilityManagerService);
  });

  const loadSkyGridLayer = (): void => {
    layerService.registerLayer(mockedLayers.subLayers[0]);
  };

  const loadStarsLayers = (): void => {
    registerMockStarsLayers(layerService);
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
      loadSkyGridLayer();
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
        loadSkyGridLayer();
        assertEventPropagated(LayerShownEvent.KEY, done);
        manager.showLayer(skyGrid);
      });

      it('when a layer is hidden', (done: DoneFn) => {
        loadSkyGridLayer();
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
      loadStarsLayers();

      manager.showLayer(stars);
      assertLayersShown([stars, starsMag2, 'stars-mag2.5', 'stars-mag3.0']);
    });

  });

  describe('hideLayer should', () => {

    it('have no effect if the arg is falsy', () => {
      manager.hideLayer(undefined);
      expect(manager.isShown(undefined)).toBeFalse();
    });

    it('hide the layer and its sub-layers', () => {
      loadStarsLayers();

      manager.hideLayer(stars);
      assertLayersHidden([stars, starsMag2, 'stars-mag2.5', 'stars-mag3.0']);
    });

  });

});
