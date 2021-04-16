import { TestBed } from '@angular/core/testing';
import { LayerMessierModule } from '#layer-messier/layer-messier.module';
import { LayerProvidersRegistryService } from '#controls/services/layer-providers-registry.service';
import { LayerSkyGridModule } from '#layer-sky-grid/layer-sky-grid.module';
import { LayerStarsModule } from '#layer-stars/layer-stars.module';
import { LayerConstellationsModule } from '#layer-constellations/layer-constellations.module';


describe('LayerProvidersRegistryService', () => {

  let registry: LayerProvidersRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LayerConstellationsModule,
        LayerSkyGridModule,
        LayerStarsModule,
        LayerMessierModule
      ],
      providers: [
        LayerProvidersRegistryService
      ]
    });
    registry = TestBed.inject(LayerProvidersRegistryService);
  });

  it('layerProviders should return expected data', () => {
    const providers = registry.layerProviders;
    expect(providers).toBeDefined();
    expect(providers.length).toEqual(4);
  });

});
