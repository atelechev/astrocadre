import { TestBed } from '@angular/core/testing';
import { TextOffsetPolicies } from '#core/models/layers/factories/text/text-offsets-policies';
import { RenderableText } from '#core/models/layers/renderable-text';
import { Stars } from '#core/models/layers/stars';
import { EventsService } from '#core/services/events.service';
import { LayerService } from '#core/services/layer.service';
import { SceneService } from '#core/services/scene.service';
import { TestContext } from '#core/test-utils/test-context.spec';
import { toVector3 } from '#core/utils/vector-utils';

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

  beforeEach(() => {
    const ctx = new TestContext().configure();
    layers = ctx.layerService;
    layers.registerLayer(starsModel);
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

  describe('showTexts should', () => {

    it('have no effect if the arg is falsy', () => {
      expect(service.allTextsCount).toEqual(0);
      service.showTexts(undefined);
      expect(service.allTextsCount).toEqual(0);
    });

    it('should add the texts', () => {
      const text = new RenderableText('any', 'labels', toVector3(0, 0, 0), 'any', TextOffsetPolicies.CENTERED);
      expect(service.allTextsCount).toEqual(0);
      service.showTexts([text]);
      expect(service.allTextsCount).toEqual(1);
    });

  });

  describe('hideTexts should', () => {

    it('have no effect if the arg is falsy', () => {
      expect(service.allTextsCount).toEqual(0);
      service.hideTexts(undefined);
      expect(service.allTextsCount).toEqual(0);
    });

    it('should hide the texts', () => {
      const text = new RenderableText('any', 'labels', toVector3(0, 0, 0), 'any', TextOffsetPolicies.CENTERED);
      service.showTexts([text]);
      expect(service.allTextsCount).toEqual(1);
      service.hideTexts([text]);
      expect(service.allTextsCount).toEqual(0);
    });

  });

  it('should add all the objects and texts from a layer when it is shown', () => {
    const layer = layers.getRenderableLayer('stars-mag2.0') as Stars;
    expect(layer.objects.length).toEqual(1);
    expect(layer.texts.length).toEqual(1);
    expect(service.shownObjectsCount).toEqual(1);
    expect(service.allTextsCount).toEqual(0); // FIXME should be 1 ?
  });

  it('should remove all the objects and texts from a layer when it is hidden', () => {
    const layer = layers.getRenderableLayer('stars-mag2.0') as Stars;
    const events = TestBed.inject(EventsService);
    events.fireLayerHidden(layer);
    expect(layer.objects.length).toEqual(1);
    expect(layer.texts.length).toEqual(1);
    expect(service.shownObjectsCount).toEqual(0);
    expect(service.allTextsCount).toEqual(0);
  });

});
