import { fakeAsync, tick } from '@angular/core/testing';
import { Stars } from '#core/models/layers/stars';
import { LayerService } from '#core/services/layer.service';
import { SceneService } from '#core/services/scene.service';
import { TestContext } from '#core/test-utils/test-context.spec';
import { LayersVisibilityManagerService } from '#core/services/layers-visibility-manager.service';

const starsModel = {
  code: 'stars-mag2.0',
  label: 'Magnitude < 2.0',
  loadFromUrl: true,
  description: 'Stars of magnitude less or equal to 2.0',
  objects: [
    [37.95, 89.26, 2.0, 'Polaris', 'ALP UMI']
  ]
};

describe('SceneService', () => {

  let service: SceneService;
  let layers: LayerService;
  let visibilityManager: LayersVisibilityManagerService;

  beforeEach(() => {
    const ctx = new TestContext().configure();
    layers = ctx.layerService;
    layers.registerLayer(starsModel);
    visibilityManager = ctx.getService(LayersVisibilityManagerService);
    visibilityManager.showLayer(starsModel.code);
    service = ctx.sceneService;
    service.setViewportRootElement(document.createElement('div'));
  });

  it('allObjectsCount should return expected value', () => {
    expect(service.allObjectsCount).toEqual(1);
  });

  it('shownObjectsCount should return expected value', () => {
    expect(service.shownObjectsCount).toEqual(1);
  });

  it('allTextsCount should return expected value', () => {
    expect(service.allTextsCount).toEqual(0); // FIXME should be 1 ?
  });

  it('should add all the objects and texts from a layer when it is shown', () => {
    const layer = layers.getRenderableLayer('stars-mag2.0') as Stars;
    expect(layer.objects.length).toEqual(1);
    expect(layer.texts.length).toEqual(1);
    expect(service.shownObjectsCount).toEqual(1);
    expect(service.allTextsCount).toEqual(0); // FIXME should be 1 ?
  });

  it('should remove all the objects and texts from a layer when it is hidden', fakeAsync(() => {
    const layer = layers.getRenderableLayer('stars-mag2.0') as Stars;
    visibilityManager.hideLayer(layer.code);
    tick();

    expect(layer.objects.length).toEqual(1);
    expect(layer.texts.length).toEqual(1);
    expect(service.shownObjectsCount).toEqual(0);
    expect(service.allTextsCount).toEqual(0);
  }));

});
