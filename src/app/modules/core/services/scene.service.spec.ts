import { TestBed } from '@angular/core/testing';
import { Stars } from '#layer-stars/models/stars';
import { LayerService } from '#core/services/layer.service';
import { SceneService } from '#core/services/scene.service';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { ViewportService } from '#core/services/viewport.service';
import { CameraService } from '#core/services/camera.service';
import { ThemeService } from '#core/services/theme.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { LayersFactoryService } from '#core/services/layers-factory.service';
import { SearchService } from '#core/services/search.service';



describe('SceneService', () => {

  const starsMag2 = 'stars-mag2.0';
  const starsModel = {
    code: starsMag2,
    label: 'Magnitude < 2.0',
    loadFromUrl: true,
    description: 'Stars of magnitude less or equal to 2.0',
    objects: [
      [37.95, 89.26, 2.0, 'Polaris', 'ALP UMI']
    ]
  };
  let service: SceneService;
  let visibilityManager: LayersVisibilityManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CameraService,
        LayerService,
        LayersFactoryService,
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
    layers.registerLayer(starsModel);
    visibilityManager.showLayer(starsModel.code);
  });

  const getStarsLayer = (): Stars => (
    TestBed.inject(LayerService).getRenderableLayer(starsMag2) as Stars
  );

  it('allObjectsCount should return expected value', () => {
    expect(service.allObjectsCount).toEqual(1);
  });

  it('shownObjectsCount should return expected value', () => {
    expect(service.shownObjectsCount).toEqual(1);
  });

  it('allTextsCount should return expected value', () => {
    expect(service.allTextsCount).toEqual(1);
  });

  it('should add all the objects and texts from a layer when it is shown', () => {
    const layer = getStarsLayer();
    expect(visibilityManager.isShown(starsMag2)).toBeTrue();

    expect(layer.objects.length).toEqual(1);
    expect(layer.texts.length).toEqual(1);
    expect(service.shownObjectsCount).toEqual(1);
    expect(service.allTextsCount).toEqual(1);
  });

  it('should remove all the objects and texts from a layer when it is hidden', () => {
    const layer = getStarsLayer();
    expect(visibilityManager.isShown(starsMag2)).toBeTrue();
    expect(service.allTextsCount).toEqual(1);

    visibilityManager.hideLayer(starsMag2);

    expect(layer.objects.length).toEqual(1);
    expect(layer.texts.length).toEqual(1);
    expect(service.shownObjectsCount).toEqual(0);
    expect(service.allTextsCount).toEqual(0);
  });

});
