import { TestBed } from '@angular/core/testing';
import { AxialCurvesFactoryService } from '#core/services/factories/axial-curves-factory.service';
import { BoundariesLayerFactoryService } from '#layer-constellations/services/factories/boundaries-layer-factory.service';


describe('BoundariesLayerFactoryService', () => {

  const model = {
    code: 'constellation-boundaries',
    label: 'Boundaries',
    loadFromUrl: false,
    objects: [
      [177.5, -24.5, 162.5, -24.5],
      [170.0, 73.5, 170.0, 66.5],
      [165.0, 25.5, 161.25, 25.5]
    ]
  };
  let factory: BoundariesLayerFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AxialCurvesFactoryService,
        BoundariesLayerFactoryService
      ]
    });
    factory = TestBed.inject(BoundariesLayerFactoryService);
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
