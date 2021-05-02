import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LayerProvidersRegistryService } from '#controls/services/layer-providers-registry.service';
import { LayerConstellationsModule } from '#layer-constellations/layer-constellations.module';
import { LayerProvider } from '#core/models/layers/layer-provider';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { LayerAware } from '#core/models/layers/layer-aware';
import { ConstellationsProvidersService } from '#layer-constellations/services/constellations-providers.service';
import { SkyGridProvidersService } from '#layer-sky-grid/services/sky-grid-providers.service';
import { StarsProvidersService } from '#layer-stars/services/stars-providers.service';
import { MessierProvidersService } from '#layer-messier/services/messier-providers.service';
import { SolarSystemProvidersService } from '#layer-solar-system/services/solar-system-providers.service';
import { Constellations } from '#layer-constellations/models/constellations';
import { SkyGrid } from '#layer-sky-grid/models/sky-grid';
import { Stars } from '#layer-stars/models/stars';
import { Messier } from '#layer-messier/models/messier';
import { SolarSystem } from '#layer-solar-system/model/solar-system';

class MockProvider implements LayerProvider {

  constructor(private readonly _code: string) {

  }

  public get code(): string {
    return this._code;
  }

  public getRenderableLayer(): Promise<RenderableLayer> {
    return Promise.resolve(undefined);
  }

  public getUiControlsComponentType(): Type<LayerAware> {
    return undefined;
  }
}

describe('LayerProvidersRegistryService', () => {

  let registry: LayerProvidersRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LayerConstellationsModule
      ],
      providers: [
        LayerProvidersRegistryService,
        {
          provide: ConstellationsProvidersService,
          useValue: new MockProvider(Constellations.CODE)
        },
        {
          provide: SkyGridProvidersService,
          useValue: new MockProvider(SkyGrid.CODE)
        },
        {
          provide: StarsProvidersService,
          useValue: new MockProvider(Stars.CODE)
        },
        {
          provide: MessierProvidersService,
          useValue: new MockProvider(Messier.CODE)
        },
        {
          provide: SolarSystemProvidersService,
          useValue: new MockProvider(SolarSystem.CODE)
        }
      ]
    });
    registry = TestBed.inject(LayerProvidersRegistryService);
  });

  it('layerProviders should return expected data', () => {
    const providers = registry.layerProviders;
    expect(providers).toBeDefined();
    expect(providers.length).toEqual(5);
  });

  it('orderedCodes should return expected data', () => {
    const expected = [
      SkyGrid.CODE, Stars.CODE, Constellations.CODE, Messier.CODE, SolarSystem.CODE
    ];
    const orderedCodes = registry.orderedCodes;
    expect(orderedCodes).toBeDefined();
    expect(orderedCodes).toEqual(expected);
  });

});
