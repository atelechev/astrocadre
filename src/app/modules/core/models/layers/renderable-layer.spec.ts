import { fakeAsync } from '@angular/core/testing';
import { Layer } from '#core/models/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { EventsService } from '#core/services/events.service';
import { MaterialsService } from '#core/services/materials.service';
import { TestContext } from '#core/test-utils/test-context.spec';


class TestRenderableLayer extends RenderableLayer {

  constructor(
    model: Layer,
    materialsService: MaterialsService,
    eventsService: EventsService
  ) {
    super(model, materialsService, eventsService);
  }

  protected applyTheme(): void {
    // nothing
  }

}

describe('RenderableLayer', () => {

  let layer: RenderableLayer;
  const model: Layer = {
    code: 'tested-layer',
    label: 'Tested',
    loadFromUrl: false,
    objects: []
  };

  beforeEach(fakeAsync(() => {
    const ctx = new TestContext().configure();
    layer = new TestRenderableLayer(model, ctx.materialsService, ctx.eventsService);
  }));

  it('model should return expected value', () => {
    expect(layer.model).toEqual(model);
  });

  it('objects should return an empty array', () => {
    expect(layer.objects).toEqual([]);
  });

  it('texts should return an empty array', () => {
    expect(layer.texts).toEqual([]);
  });

  it('searchables should return an empty array', () => {
    expect(layer.searchables).toEqual([]);
  });

  describe('areTextsShown should return', () => {

    it('true by default', () => {
      expect(layer.areTextsShown).toBeTrue();
    });

    it('false if hideTexts() was called', () => {
      expect(layer.areTextsShown).toBeTrue();
      layer.hideTexts();
      expect(layer.areTextsShown).toBeFalse();
    });

    it('true if showTexts() was called', () => {
      layer.hideTexts();
      expect(layer.areTextsShown).toBeFalse();
      layer.showTexts();
      expect(layer.areTextsShown).toBeTrue();
    });

  });

});
