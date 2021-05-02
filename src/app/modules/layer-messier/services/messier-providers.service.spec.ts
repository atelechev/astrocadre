import { TestBed } from '@angular/core/testing';
import { MessierProvidersService } from '#layer-messier/services/messier-providers.service';
import { LayerMessierModule } from '#layer-messier/layer-messier.module';
import { SelectorMessierNamesComponent } from '#layer-messier/components/selector-messier-names/selector-messier-names.component';
import { CoreModule } from '#core/core.module';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { Messier } from '#layer-messier/models/messier';


describe('MessierProvidersService', () => {

  let service: MessierProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        LayerMessierModule
      ]
    });
    service = TestBed.inject(MessierProvidersService);
  });


  it('getRenderableLayer should return expected layer', (done: DoneFn) => {
    service.getRenderableLayer().then(
      (layer: RenderableLayer) => {
        expect(layer).toBeDefined();
        expect(layer.code).toEqual(Messier.CODE);
        done();
      }
    );
  });

  it('getUiControlsComponentType should return expected value for the "messier" layer arg', () => {
    expect(service.getUiControlsComponentType()).toEqual(SelectorMessierNamesComponent);
  });

});
