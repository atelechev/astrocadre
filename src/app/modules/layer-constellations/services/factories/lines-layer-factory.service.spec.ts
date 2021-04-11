import { TestBed } from '@angular/core/testing';
import { AxialCurvesFactoryService } from '#core/services/factories/axial-curves-factory.service';
import { LinesLayerFactoryService } from '#layer-constellations/services/factories/lines-layer-factory.service';
import { LayerFactory } from '#core/models/layers/layer-factory';


describe('LinesLayerFactoryService', () => {

  const model = {
    code: 'constellation-lines',
    label: 'Lines',
    loadFromUrl: false,
    objects: [
      [72.46, 6.95, 72.65, 8.9],
      [72.8, 5.6, 72.46, 6.95],
      [73.56, 2.45, 72.8, 5.6],
      [74.64, 1.72, 73.56, 2.45]
    ]
  };
  let factory: LayerFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AxialCurvesFactoryService,
        LinesLayerFactoryService
      ]
    });
    factory = TestBed.inject(LinesLayerFactoryService);
  });

  it('buildRenderableLayer should return expected value', () => {
    const layer = factory.buildRenderableLayer(model);
    expect(layer).toBeDefined();
    expect(layer.code).toEqual(model.code);
    expect(layer.objects.length).toEqual(1);
    expect(layer.texts.length).toEqual(0);
    expect(layer.searchables.length).toEqual(0);
  });

});
