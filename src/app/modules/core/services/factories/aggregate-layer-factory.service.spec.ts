import { TestBed } from '@angular/core/testing';
import { Layer } from '#core/models/layers/layer';
import { AggregateLayerFactoryService } from '#core/services/factories/aggregate-layer-factory.service';


describe('AggregateLayerFactoryService', () => {

  let factory: AggregateLayerFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AggregateLayerFactoryService]
    });
    factory = TestBed.inject(AggregateLayerFactoryService);
  });

  describe('buildRenderableLayer should return', () => {

    it('undefined if the arg is falsy', () => {
      expect(factory.buildRenderableLayer(undefined)).toBeUndefined();
    });

    it('an instance of AggregateLayer if the arg is defined', () => {
      const model: Layer = {
        code: 'something',
        label: 'Something',
        loadFromUrl: false,
        objects: []
      };
      const layer = factory.buildRenderableLayer(model);
      expect(layer).toBeDefined();
      expect(layer.code).toEqual(model.code);
    });

  });

});
