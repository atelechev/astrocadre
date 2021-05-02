import { fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CoreModule } from '#core/core.module';
import { ConstellationsLayerFactoryService } from '#layer-constellations/services/factories/constellations-layer-factory.service';
import { Constellations } from '#layer-constellations/models/constellations';
import { StaticDataService } from '#core/services/static-data.service';


describe('ConstellationsLayerFactoryService', () => {

  const rawData = [{
    boundaries: [
      [177.5, -24.5, 162.5, -24.5],
      [170.0, 73.5, 170.0, 66.5],
      [165.0, 25.5, 161.25, 25.5]
    ],
    lines: [
      [72.46, 6.95, 72.65, 8.9],
      [72.8, 5.6, 72.46, 6.95],
      [73.56, 2.45, 72.8, 5.6],
      [74.64, 1.72, 73.56, 2.45]
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
  let factory: ConstellationsLayerFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [
        ConstellationsLayerFactoryService
      ]
    });
    factory = TestBed.inject(ConstellationsLayerFactoryService);
  });

  it('buildRenderableLayer should return expected value', (done: DoneFn) => {
    const dataService = TestBed.inject(StaticDataService);
    spyOn(dataService, 'getDataJson').and.returnValue(of(rawData));

    factory.buildRenderableLayer()
      .then((layer: Constellations) => {
        expect(layer).toBeDefined();
        expect(layer.code).toEqual(Constellations.CODE);
        expect(layer.objects.length).toEqual(2);
        expect(layer.texts.length).toEqual(1);
        expect(layer.searchables.length).toEqual(1);
        done();
      });
  });

});
