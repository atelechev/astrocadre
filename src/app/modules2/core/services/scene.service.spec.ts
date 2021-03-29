import { fakeAsync, TestBed } from '@angular/core/testing';
import { TextOffsetPolicies } from 'src/app/modules2/core/models/layers/factories/text/text-offsets-policies';
import { RenderableText } from 'src/app/modules2/core/models/layers/renderable-text';
import { Stars } from 'src/app/modules2/core/models/layers/stars';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { LayerService } from 'src/app/modules2/core/services/layer.service';
import { SceneService } from 'src/app/modules2/core/services/scene.service';
import { TestContext } from 'src/app/modules2/core/test-utils/test-context.spec';
import { toVector3 } from 'src/app/modules2/core/utils/vector-utils';


describe('SceneService', () => {

  let service: SceneService;
  let layers: LayerService;

  beforeEach(fakeAsync(() => {
    const ctx = new TestContext().configure();
    layers = ctx.layerService;
    service = ctx.sceneService;
    service.setViewportRootElement(document.createElement('div'));
  }));

  /*
    The loaded mocked data contain:
    - 3D objects:
      - 4 objects: the generated sky-grid layer contains 2 for regular lines and 2 for reference lines.
      - 3 objects: at the coords origin, for the camera.
      - 1 object: star object for the stars-mag2.0 layer.
      - 2 more: ? TODO
    - texts:
      - 2 objects: the name of the loaded star (Polaris) and the constellation (Andromeda).
  */

  it('allObjectsCount should return expected value', () => {
    expect(service.allObjectsCount).toEqual(10);
  });

  it('shownObjectsCount should return expected value', () => {
    expect(service.shownObjectsCount).toEqual(10);
  });

  it('allTextsCount should return expected value', () => {
    expect(service.allTextsCount).toEqual(2);
  });

  describe('showTexts should', () => {

    it('have no effect if the arg is falsy', () => {
      expect(service.allTextsCount).toEqual(2);
      service.showTexts(undefined);
      expect(service.allTextsCount).toEqual(2);
    });

    it('should add the texts', () => {
      const text = new RenderableText('any', 'labels', toVector3(0, 0, 0), 'any', TextOffsetPolicies.CENTERED);
      expect(service.allTextsCount).toEqual(2);
      service.showTexts([text]);
      expect(service.allTextsCount).toEqual(3);
    });

  });

  describe('hideTexts should', () => {

    it('have no effect if the arg is falsy', () => {
      expect(service.allTextsCount).toEqual(2);
      service.hideTexts(undefined);
      expect(service.allTextsCount).toEqual(2);
    });

    it('should hide the texts', () => {
      const text = new RenderableText('any', 'labels', toVector3(0, 0, 0), 'any', TextOffsetPolicies.CENTERED);
      service.showTexts([text]);
      expect(service.allTextsCount).toEqual(3);
      service.hideTexts([text]);
      expect(service.allTextsCount).toEqual(2);
    });

  });

  it('should add all the objects and texts from a layer when it is shown', () => {
    const layer = layers.getRenderableLayer('stars-mag2.0') as Stars;
    expect(layer.objects.length).toEqual(1);
    expect(layer.texts.length).toEqual(1);
    expect(service.shownObjectsCount).toEqual(10);
    expect(service.allTextsCount).toEqual(2);
  });

  it('should remove all the objects and texts from a layer when it is hidden', () => {
    const layer = layers.getRenderableLayer('stars-mag2.0') as Stars;
    const events = TestBed.inject(EventsService);
    events.fireLayerHidden(layer);
    expect(layer.objects.length).toEqual(1);
    expect(layer.texts.length).toEqual(1);
    expect(service.shownObjectsCount).toEqual(9);
    expect(service.allTextsCount).toEqual(1);
  });

});
