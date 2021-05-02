import { TestBed } from '@angular/core/testing';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { SkyGridLayerFactoryService } from '#layer-sky-grid/services/factories/sky-grid-layer-factory.service';
import { CoreModule } from '#core/core.module';
import { SkyGrid } from '#layer-sky-grid/models/sky-grid';


describe('SkyGridLayerFactoryService', () => {

  const code = SkyGrid.CODE;
  let factory: LayerFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [
        SkyGridLayerFactoryService
      ]
    });
    factory = TestBed.inject(SkyGridLayerFactoryService);
  });

  it('buildRenderableLayer should return expected value', (done: DoneFn) => {
    factory.buildRenderableLayer()
      .then((layer: SkyGrid) => {
        expect(layer).toBeDefined();
        expect(layer.code).toEqual(code);
        expect(layer.objects.length).toEqual(4);
        expect(layer.texts.length).toEqual(0);
        expect(layer.searchables.length).toEqual(0);
        done();
      });
  });

});
