import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LineSegments } from 'three';
import { ApparentTrajectoryFactoryService } from '#layer-solar-system/services/factories/apparent-trajectory-factory.service';
import { CoreModule } from '#core/core.module';
import { LayerSolarSystemModule } from '#layer-solar-system/layer-solar-system.module';


describe('ApparentTrajectoryFactoryService', () => {

  const sun = 'Sun';
  let factory: ApparentTrajectoryFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        LayerSolarSystemModule
      ]
    });
    factory = TestBed.inject(ApparentTrajectoryFactoryService);
  });

  describe('buildApparentTrajectory should', () => {

    const expectedRejectMessage = 'All args must be defined and segmentsCount greater than 1';

    const unexpectedPromise = (): void => fail('This promise should have been rejected!');

    describe('reject the promise', () => {

      it('if the name arg is falsy', fakeAsync(() => {
        factory.buildApparentTrajectory(undefined, 10)
          .then(
            (_: any) => unexpectedPromise(),
            (msg: any) => expect(msg).toEqual(expectedRejectMessage)
          );
      }));

      it('if the segmentsCount arg is falsy', fakeAsync(() => {
        factory.buildApparentTrajectory(sun, undefined)
          .then(
            (_: any) => unexpectedPromise(),
            (msg: any) => expect(msg).toEqual(expectedRejectMessage)
          );
      }));

      it('if the segmentsCount arg is lower than 2', fakeAsync(() => {
        factory.buildApparentTrajectory(sun, 1)
          .then(
            (_: any) => unexpectedPromise(),
            (msg: any) => expect(msg).toEqual(expectedRejectMessage)
          );
      }));

    });

    it('return expected value for valid args', fakeAsync(() => {
      factory.buildApparentTrajectory(sun, 2)
        .then(
          (line: LineSegments) => {
            expect(line).toBeDefined();
          });
      tick();
    }));

  });

});
