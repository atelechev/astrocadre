import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LayerSolarSystemModule } from '#layer-solar-system/layer-solar-system.module';
import { SolarSystemLayerFactoryService } from '#layer-solar-system/services/factories/solar-system-layer-factory.service';


describe('SolarSystemLayerFactoryService', () => {

  const model = {
    code: 'solar-system',
    label: 'Solar system',
    loadFromUrl: false,
    objects: []
  };

  let factory: SolarSystemLayerFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LayerSolarSystemModule]
    });
    factory = TestBed.inject(SolarSystemLayerFactoryService);
  });

  it('buildRenderableLayer should return expected value', fakeAsync(() => {
    const layer = factory.buildRenderableLayer(model);
    tick();
    expect(layer).toBeDefined();
    expect(layer.code).toEqual(model.code);
    expect(layer.objects.length).toEqual(18);
    expect(layer.texts.length).toEqual(9);
    expect(layer.searchables.length).toEqual(9);
  }));

});
