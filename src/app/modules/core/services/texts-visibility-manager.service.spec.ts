import { skip } from 'rxjs/operators';
import { RenderableText } from '#core/models/layers/renderable-text';
import { LayerService } from '#core/services/layer.service';
import { TextsVisibilityManagerService } from '#core/services/texts-visibility-manager.service';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { Layer } from '#core/models/layer';
import { TestContext } from '#core/test-utils/test-context.spec';


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

  describe('textsShown should', () => {

    it('be defined when the service is initialized', () => {
      expect(manager.textsShown).toBeDefined();
    });

    it('propagate an event when the texts of a layer are shown', (done: DoneFn) => {
      loadStarsLayer();
      manager.textsShown
        .pipe(skip(1))
        .subscribe(
          (texts: Array<RenderableText>) => {
            expect(texts).toBeDefined();
            expect(texts.length).toEqual(1);
            done();
          }
        );
      manager.showTexts(starsMag2);
    });

  });

  describe('textsHidden should', () => {

    it('be defined when the service is initialized', () => {
      expect(manager.textsHidden).toBeDefined();
    });

    it('propagate an event when the texts of a layer are hidden', (done: DoneFn) => {
      loadStarsLayer();
      manager.textsHidden
        .pipe(skip(1))
        .subscribe(
          (texts: Array<RenderableText>) => {
            expect(texts).toBeDefined();
            expect(texts.length).toEqual(1);
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
