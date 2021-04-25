import { TestBed } from '@angular/core/testing';
import { CoreModule } from '#core/core.module';
import { ConstellationsLayerFactoryService } from '#layer-constellations/services/factories/constellations-layer-factory.service';


describe('ConstellationsLayerFactoryService', () => {

  const code = 'constellations';
  const model = {
    code,
    label: 'Constellations',
    loadFromUrl: true,
    objects: [{
      boundaries: [
        [177.5, -24.5, 162.5, -24.5],
        [170.0, 73.5, 170.0, 66.5],
        [165.0, 25.5, 161.25, 25.5]
      ],
      lines: [
        [72.46, 6.95, 72.65, 8.9],
        [72.8, 5.6, 72.46, 6.95],
        [73.56, 2.45, 72.8, 5.6],
        [74.64, 1.72, 73.56, 2.45]
      ],
      names: [
        {
          type: 'constellation',
          code,
          ra: 8.532,
          dec: 38.906,
          names: ['Andromeda']
        }
      ]
    }]
  };
  let factory: ConstellationsLayerFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [
        ConstellationsLayerFactoryService
      ]
    });
    factory = TestBed.inject(ConstellationsLayerFactoryService);
  });

  it('buildRenderableLayer should return expected value', () => {
    const layer = factory.buildRenderableLayer(model);
    expect(layer).toBeDefined();
    expect(layer.code).toEqual(model.code);
    expect(layer.objects.length).toEqual(2);
    expect(layer.texts.length).toEqual(1);
    expect(layer.searchables.length).toEqual(1);
  });

});
