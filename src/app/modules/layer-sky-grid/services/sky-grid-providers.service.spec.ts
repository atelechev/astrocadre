import { TestBed } from '@angular/core/testing';
import { CoreModule } from '#core/core.module';
import { LayerSkyGridModule } from '#layer-sky-grid/layer-sky-grid.module';
import { SkyGridProvidersService } from '#layer-sky-grid/services/sky-grid-providers.service';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { SkyGrid } from '#layer-sky-grid/models/sky-grid';


describe('SkyGridProvidersService', () => {

  let service: SkyGridProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        LayerSkyGridModule
      ]
    });
    service = TestBed.inject(SkyGridProvidersService);
  });

  it('getRenderableLayer should return expected layer', (done: DoneFn) => {
    service.getRenderableLayer().then(
      (layer: RenderableLayer) => {
        expect(layer).toBeDefined();
        expect(layer.code).toEqual(SkyGrid.CODE);
        done();
      }
    );
  });

  it('getUiControlsComponentType should return undefined', () => {
    expect(service.getUiControlsComponentType()).toBeUndefined();
  });

});
