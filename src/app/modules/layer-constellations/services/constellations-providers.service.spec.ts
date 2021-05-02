import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CoreModule } from '#core/core.module';
import { ConstellationsProvidersService } from '#layer-constellations/services/constellations-providers.service';
import { LayerConstellationsControlsComponent } from '#layer-constellations/components/layer-constellations-controls/layer-constellations-controls.component';
import { ConstellationsLayerFactoryService } from '#layer-constellations/services/factories/constellations-layer-factory.service';
import { Constellations } from '#layer-constellations/models/constellations';
import { StaticDataService } from '#core/services/static-data.service';


describe('ConstellationsProvidersService', () => {

  const rawData = [{
    boundaries: [
      [177.5, -24.5, 162.5, -24.5]
    ],
    lines: [
      [72.46, 6.95, 72.65, 8.9]
    ],
    names: [
      {
        type: 'constellation',
        code: 'AND',
        ra: 8.532,
        dec: 38.906,
        names: ['Andromeda']
      }
    ]
  }];
  let service: ConstellationsProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule
      ],
      providers: [
        ConstellationsLayerFactoryService,
        ConstellationsProvidersService
      ]
    });
    service = TestBed.inject(ConstellationsProvidersService);
    const dataService = TestBed.inject(StaticDataService);
    spyOn(dataService, 'getDataJson').and.returnValue(of(rawData));
  });


  it('getRenderableLayer should return a resolved promise', (done: DoneFn) => {
    service.getRenderableLayer().then(
      (layer: Constellations) => {
        expect(layer).toBeDefined();
        expect(layer.code).toEqual(Constellations.CODE);
        done();
      }
    );
  });

  it('getUiControlsComponentType should return expected value for the "constellations" layer arg', () => {
    expect(service.getUiControlsComponentType()).toEqual(LayerConstellationsControlsComponent);
  });

});
