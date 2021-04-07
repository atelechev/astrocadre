import { TestBed } from '@angular/core/testing';
import { LayerService } from '#core/services/layer.service';
import { SceneService } from '#core/services/scene.service';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { ViewportService } from '#core/services/viewport.service';
import { CameraService } from '#core/services/camera.service';
import { ThemeService } from '#core/services/theme.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { SearchService } from '#core/services/search.service';
import { MockedGridLayerFactory } from '#core/test-utils/mocked-grid-layer-factory.spec';
import { RenderableLayer } from '#core/models/layers/renderable-layer';



describe('SceneService', () => {

  const code = 'sky-grid';
  let service: SceneService;
  let visibilityManager: LayersVisibilityManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CameraService,
        LayerService,
        LayersVisibilityManagerService,
        SceneService,
        SearchService,
        TextsVisibilityManagerService,
        ThemeService,
        ViewportService
      ]
    });
    const layers = TestBed.inject(LayerService);
    visibilityManager = TestBed.inject(LayersVisibilityManagerService);
    service = TestBed.inject(SceneService);
    service.setViewportRootElement(document.createElement('div'));
    const layer = new MockedGridLayerFactory().buildRenderableLayer();
    layers.registerLayer(layer);
    visibilityManager.showLayer(layer.code);
  });

  const getMockedLayer = (): RenderableLayer => (
    TestBed.inject(LayerService).getRenderableLayer(code)
  );

  it('allObjectsCount should return expected value', () => {
    expect(service.allObjectsCount).toEqual(2);
  });

  it('shownObjectsCount should return expected value', () => {
    expect(service.shownObjectsCount).toEqual(2);
  });

  it('allTextsCount should return expected value', () => {
    expect(service.allTextsCount).toEqual(1);
  });

  it('should add all the objects and texts from a layer when it is shown', () => {
    const layer = getMockedLayer();
    expect(visibilityManager.isShown(code)).toBeTrue();

    expect(layer.objects.length).toEqual(2);
    expect(layer.texts.length).toEqual(1);
    expect(service.shownObjectsCount).toEqual(2);
    expect(service.allTextsCount).toEqual(1);
  });

  it('should remove all the objects and texts from a layer when it is hidden', () => {
    const layer = getMockedLayer();
    expect(visibilityManager.isShown(code)).toBeTrue();
    expect(service.allTextsCount).toEqual(1);

    visibilityManager.hideLayer(code);

    expect(layer.objects.length).toEqual(2);
    expect(layer.texts.length).toEqual(1);
    expect(service.shownObjectsCount).toEqual(0);
    expect(service.allTextsCount).toEqual(0);
  });

});
