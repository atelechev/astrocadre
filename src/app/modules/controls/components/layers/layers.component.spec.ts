import { TestBed } from '@angular/core/testing';
import { Layer } from '#core/models/layers/layer';
import { LayersComponent } from '#controls/components/layers/layers.component';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { CoreModule } from '#core/core.module';
import { ControlsModule } from '#controls/controls.module';
import { LayerService } from '#core/services/layer.service';
import { SkyGrid } from '#layer-sky-grid/models/sky-grid';
import { Stars } from '#layer-stars/models/stars';
import { Constellations } from '#layer-constellations/models/constellations';
import { Messier } from '#layer-messier/models/messier';
import { SolarSystem } from '#layer-solar-system/model/solar-system';


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

    const expected = [
      SkyGrid.CODE,
      Stars.CODE,
      Constellations.CODE,
      Messier.CODE,
      SolarSystem.CODE
    ];
    expect(layers.length).toEqual(expected.length);

    const codes = layers.map((layer: Layer) => layer.code);
    expect(codes).toEqual(expected);
  });

});
