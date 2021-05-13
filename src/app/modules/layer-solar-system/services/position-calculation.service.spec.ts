import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CoreModule } from '#core/core.module';
import { LayerSolarSystemModule } from '#layer-solar-system/layer-solar-system.module';
import { PositionCalculationService } from '#layer-solar-system/services/position-calculation.service';


describe('PositionCalculationService', () => {

  let service: PositionCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        LayerSolarSystemModule
      ]
    });
    service = TestBed.inject(PositionCalculationService);
  });

  describe('calculatePosition should return', () => {

    it('a rejected promise if the body arg is not supported', fakeAsync(() => {
      service.calculatePosition('pluto', new Date()).then(
        (_: any) => fail('Should have been rejected!'),
        (msg: string) => expect(msg).toEqual('Astronomical object not supported: pluto')
      );
      tick();
    }));

    it('expected coordinates for valid args', fakeAsync(() => {
      const time = new Date(2021, 5, 13, 22, 41, 0);
      const expectedCoords = [82.424518, 23.254692];
      service.calculatePosition('sun', time).then(
        (coords: Array<number>) => {
          expect(coords).toBeDefined();
          expect(coords.length).toEqual(2);
          expect(coords[0]).toBeCloseTo(expectedCoords[0], 6);
          expect(coords[1]).toBeCloseTo(expectedCoords[1], 6);
        }
      );
      tick();
    }));

  });

});
