import { TestBed } from '@angular/core/testing';
import { skip } from 'rxjs/operators';
import { LayerService } from '#core/services/layer.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { LayerEvent } from '#core/models/event/layer-event';
import { TextsShownEvent } from '#core/models/event/texts-shown-event';
import { TextsHiddenEvent } from '#core/models/event/texts-hidden-event';
import { getSubRenderables, registerMockStarsLayers } from '#core/test-utils/utils.spec';
import { LayersFactoryService } from '#core/services/layers-factory.service';
import { SearchService } from '#core/services/search.service';
import { ThemeService } from '#core/services/theme.service';


describe('TextsVisibilityManagerService', () => {

  const stars = 'stars';
  const starsMag2 = 'stars-mag2.0';
  let manager: TextsVisibilityManagerService;
  let layerService: LayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LayerService,
        LayersFactoryService,
        SearchService,
        TextsVisibilityManagerService,
        ThemeService
      ]
    });
    layerService = TestBed.inject(LayerService);
    manager = TestBed.inject(TextsVisibilityManagerService);
  });

  const loadStarsLayer = (): void => {
    const model = {
      code: starsMag2,
      label: 'Magnitude < 2.0',
      loadFromUrl: true,
      description: 'Stars of magnitude less or equal to 2.0',
      objects: [
        [37.95, 89.26, 2.0, 'Polaris', 'ALP UMI']
      ]
    };
    layerService.registerLayer(model);
  };

  describe('events should', () => {

    const assertEventPropagated = (expectedKey: string, done: DoneFn): void => {
      manager.events
        .pipe(skip(1))
        .subscribe(
          (event: LayerEvent<any>) => {
            expect(event.key).toEqual(expectedKey);
            expect(event.data.texts.length).toEqual(1);
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

      it('when the texts of a layer are shown', (done: DoneFn) => {
        loadStarsLayer();
        assertEventPropagated(TextsShownEvent.KEY, done);
        manager.showTexts(starsMag2);
      });

      it('when the texts of a layer are hidden', (done: DoneFn) => {
        loadStarsLayer();
        assertEventPropagated(TextsHiddenEvent.KEY, done);
        manager.hideTexts(starsMag2);
      });

    });

  });

  it('showTexts should show the texts of the layer and its sub-layers', () => {
    registerMockStarsLayers(layerService);

    const renderable = layerService.getRenderableLayer(stars);
    expect(renderable).toBeDefined();
    manager.showTexts(stars);
    expect(renderable.areTextsShown).toBeTrue();
    getSubRenderables(stars, layerService)
      .forEach(
        (subLayer: RenderableLayer) =>
          expect(subLayer.areTextsShown).toBeTrue()
      );
  });

  it('hideTexts should hide the texts of the layer and its sub-layers', () => {
    registerMockStarsLayers(layerService);

    const renderable = layerService.getRenderableLayer(stars);
    expect(renderable).toBeDefined();
    manager.hideTexts(stars);
    expect(renderable.areTextsShown).toBeFalse();
    getSubRenderables(stars, layerService)
      .forEach(
        (subLayer: RenderableLayer) =>
          expect(subLayer.areTextsShown).toBeFalse()
      );
  });

});
