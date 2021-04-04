import { skip } from 'rxjs/operators';
import { LayerService } from '#core/services/layer.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { Layer } from '#core/models/layers/layer';
import { TestContext } from '#core/test-utils/test-context.spec';
import { LayerEvent } from '#core/models/event/layer-event';
import { TextsShownEvent } from '#core/models/event/texts-shown-event';
import { TextsHiddenEvent } from '#core/models/event/texts-hidden-event';


describe('TextsVisibilityManagerService', () => {

  const stars = 'stars';
  const starsMag2 = 'stars-mag2.0';
  let manager: TextsVisibilityManagerService;
  let layerService: LayerService;

  beforeEach(() => {
    const ctx = new TestContext().configure();
    layerService = ctx.layerService;
    manager = ctx.getService(TextsVisibilityManagerService);
  });

  const loadStarsLayers = (): void => {
    const starsLayerModel = mockedLayers.subLayers[1];
    layerService.registerLayer(starsLayerModel);
    layerService.registerLayer(starsLayerModel.subLayers[0]);
    layerService.registerLayer(starsLayerModel.subLayers[1]);
    layerService.registerLayer(starsLayerModel.subLayers[2]);
  };

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

  const getSubRenderables = (code: string): Array<RenderableLayer> =>
    layerService.getRenderableLayer(code)
      .subLayers
      .map((subLayer: Layer) => layerService.getRenderableLayer(subLayer.code));

  describe('events should', () => {

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

    it('propagate an event when the texts of a layer are shown', (done: DoneFn) => {
      loadStarsLayer();
      manager.events
        .pipe(skip(1))
        .subscribe(
          (event: LayerEvent<any>) => {
            expect(event.key).toEqual(TextsShownEvent.KEY);
            expect(event.data.texts.length).toEqual(1);
            done();
          }
        );
      manager.showTexts(starsMag2);
    });

    it('propagate an event when the texts of a layer are hidden', (done: DoneFn) => {
      loadStarsLayer();
      manager.events
        .pipe(skip(1))
        .subscribe(
          (event: LayerEvent<any>) => {
            expect(event.key).toEqual(TextsHiddenEvent.KEY);
            expect(event.data.texts.length).toEqual(1);
            done();
          }
        );
      manager.hideTexts(starsMag2);
    });

  });

  it('showTexts should show the texts of the layer and its sub-layers', () => {
    loadStarsLayers();

    const renderable = layerService.getRenderableLayer(stars);
    expect(renderable).toBeDefined();
    manager.showTexts(stars);
    expect(renderable.areTextsShown).toBeTrue();
    getSubRenderables(stars)
      .forEach(
        (subLayer: RenderableLayer) =>
          expect(subLayer.areTextsShown).toBeTrue()
      );
  });

  it('hideTexts should hide the texts of the layer and its sub-layers', () => {
    loadStarsLayers();

    const renderable = layerService.getRenderableLayer(stars);
    expect(renderable).toBeDefined();
    manager.hideTexts(stars);
    expect(renderable.areTextsShown).toBeFalse();
    getSubRenderables(stars)
      .forEach(
        (subLayer: RenderableLayer) =>
          expect(subLayer.areTextsShown).toBeFalse()
      );
  });

});
