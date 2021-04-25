import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { createMoon } from 'astronomy-bundle/moon';
import { LineSegments } from 'three';
import { ApparentTrajectoryFactoryService } from '#layer-solar-system/services/factories/apparent-trajectory-factory.service';
import { CoreModule } from '#core/core.module';
import { SolarSystem } from '#layer-solar-system/model/solar-system';


describe('ApparentTrajectoryFactoryService', () => {

  const solarSystem = SolarSystem.CODE;
  let factory: ApparentTrajectoryFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [
        ApparentTrajectoryFactoryService
      ]
    });
    factory = TestBed.inject(ApparentTrajectoryFactoryService);
  });

  describe('buildApparentTrajectory should', () => {

    const expectedRejectMessage = 'All args must be defined and segmentsCount greater than 1';

    const unexpectedPromise = (): void => fail('This promise should have been rejected!');

    describe('reject the promise', () => {

      it('if the layerCode arg is falsy', fakeAsync(() => {
        factory.buildApparentTrajectory(undefined, createMoon, 10)
          .then(
            (_: any) => unexpectedPromise(),
            (msg: any) => expect(msg).toEqual(expectedRejectMessage)
          );
      }));

      it('if the objectProducer arg is falsy', fakeAsync(() => {
        factory.buildApparentTrajectory(solarSystem, undefined, 10)
          .then(
            (_: any) => unexpectedPromise(),
            (msg: any) => expect(msg).toEqual(expectedRejectMessage)
          );
      }));

      it('if the segmentsCount arg is falsy', fakeAsync(() => {
        factory.buildApparentTrajectory(solarSystem, createMoon, undefined)
          .then(
            (_: any) => unexpectedPromise(),
            (msg: any) => expect(msg).toEqual(expectedRejectMessage)
          );
      }));

      it('if the segmentsCount arg is lower than 2', fakeAsync(() => {
        factory.buildApparentTrajectory(solarSystem, createMoon, 1)
          .then(
            (_: any) => unexpectedPromise(),
            (msg: any) => expect(msg).toEqual(expectedRejectMessage)
          );
      }));

    });

    it('return expected value for valid args', fakeAsync(() => {
      factory.buildApparentTrajectory(solarSystem, createMoon, 2)
        .then(
          (line: LineSegments) => {
            expect(line).toBeDefined();
          });
      tick();
    }));

  });

});
