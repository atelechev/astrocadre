import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LayersComponent } from '#controls/components/layers/layers.component';
import { CoreModule } from '#core/core.module';
import { ControlsModule } from '#controls/controls.module';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { LayerProvider } from '#core/models/layers/layer-provider';
import { LayerProvidersRegistryService } from '#controls/services/layer-providers-registry.service';
import { LayerService } from '#core/services/layer.service';

class TestLayer extends RenderableLayer {

  constructor() {
    super('test', [], 'Test');
  }

  public applyTheme(): void {
    // nothing
  }

}

@Injectable()
class MockRegistry {

  public get layerProviders(): Array<LayerProvider> {
    return [];
  }

  public get orderedCodes(): Array<string> {
    return [];
  }

}

describe('LayersComponent', () => {

  let layer: RenderableLayer;
  let component: LayersComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        ControlsModule
      ],
      providers: [
        {
          provide: LayerProvidersRegistryService,
          useClass: MockRegistry
        }
      ]
    });
    layer = new TestLayer();
    TestBed.inject(LayerService).registerLayer(layer, 100);
    component = TestBed.createComponent(LayersComponent).componentInstance;
  });

  it('layers should return expected value', () => {
    const registry = TestBed.inject(LayerProvidersRegistryService);
    spyOnProperty(registry, 'orderedCodes').and.returnValue([layer.code]);

    const layers = component.layers;
    expect(layers).toBeDefined();

    const expected = [layer.code];
    expect(layers.length).toEqual(expected.length);

    const codes = layers.map((renderable: RenderableLayer) => renderable.code);
    expect(codes).toEqual(expected);
  });

});
