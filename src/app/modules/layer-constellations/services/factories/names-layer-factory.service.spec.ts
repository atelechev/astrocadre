import { TestBed } from '@angular/core/testing';
import { NamesLayerFactoryService } from '#layer-constellations/services/factories/names-layer-factory.service';
import { LayerFactory } from '#core/models/layers/factories/layer-factory';


describe('NamesLayerFactoryService', () => {

  const model = {
    code: 'constellation-names',
    label: 'Names',
    loadFromUrl: true,
    objects: [
      { type: 'constellation', code: 'AND', ra: 8.532, dec: 38.906, names: ['Andromeda', 'Andromeda'] }
    ]
  };
  let factory: LayerFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NamesLayerFactoryService
      ]
    });
    factory = TestBed.inject(NamesLayerFactoryService);
  });

  it('buildRenderableLayer should return expected value', () => {
    const layer = factory.buildRenderableLayer(model);
    expect(layer).toBeDefined();
    expect(layer.code).toEqual(model.code);
    expect(layer.objects.length).toEqual(0);
    expect(layer.texts.length).toEqual(1);
    expect(layer.searchables.length).toEqual(1);
  });

});
