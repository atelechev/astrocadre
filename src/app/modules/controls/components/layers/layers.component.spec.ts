import { TestBed } from '@angular/core/testing';
import { Layer } from '#core/models/layers/layer';
import { LayersComponent } from '#controls/components/layers/layers.component';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { CoreModule } from '#core/core.module';
import { ControlsModule } from '#controls/controls.module';
import { LayerService } from '#core/services/layer.service';


describe('LayersComponent', () => {

  let component: LayersComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        ControlsModule
      ]
    });
    TestBed.inject(LayerService).rootLayer = mockedLayers;
    component = TestBed.createComponent(LayersComponent).componentInstance;
  });

  it('layers should return expected value', () => {
    const layers = component.layers;
    expect(layers).toBeDefined();

    const expected = ['sky-grid', 'stars', 'constellations', 'messier'];
    expect(layers.length).toEqual(expected.length);

    const codes = layers.map((layer: Layer) => layer.code);
    expect(codes).toEqual(expected);
  });

});
