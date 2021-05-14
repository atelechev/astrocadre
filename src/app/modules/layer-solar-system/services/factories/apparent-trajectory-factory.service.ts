import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { LineSegments } from 'three';
import { AxialCurvesFactoryService } from '#core/services/factories/axial-curves-factory.service';
import { PositionCalculationService } from '#layer-solar-system/services/position-calculation.service';
import { TimeService } from '#layer-solar-system/services/time.service';
import { SolarSystem } from '#layer-solar-system/model/solar-system';

/**
 * Produces a Date that corresponds to the specified step after the specified
 * intial date.
 *
 * Briefly, if the step is of one day and we need to produce the date at index 1
 * from today, this function should produce tomorrow's date.
 */
export type NextStepProducer = (startDate: Date, stepIndex: number) => Date;

const nextDayProducer: NextStepProducer = (startDate: Date, stepIndex: number): Date => {
  const nextDate = new Date();
  nextDate.setDate(startDate.getDate() + stepIndex);
  return nextDate;
};

type Coordinates = Array<Array<number>>;

/**
 * Provides a method to calculate the apparent trajectory of a Solar system object.
 */
@Injectable()
export class ApparentTrajectoryFactoryService {

  constructor(
    private readonly _timeService: TimeService,
    private readonly _positionCalculator: PositionCalculationService,
    private readonly _curvesFactory: AxialCurvesFactoryService
  ) {

  }

  /**
   * Builds a Object3D that corresponds to the apparent trajectory of the specified
   * Solar system object.
   *
   * @param name the name of the Solar system object to build the trajectory for.
   * @param segmentsCount the number of segments in the trajectory to build.
   * @param nextStepProducer produces the moment in time at a given step after a specific initial moment.
   * @returns Promise<LineSegments> when resolved, the trajectory.
   */
  public buildApparentTrajectory(
    name: string,
    segmentsCount: number,
    nextStepProducer?: NextStepProducer
  ): Promise<LineSegments> {
    if (!name || !segmentsCount || segmentsCount < 2) {
      return Promise.reject('All args must be defined and segmentsCount greater than 1');
    }
    return forkJoin(
      this.buildDatesOfNextSteps(segmentsCount, nextStepProducer)
        .map(
          (date: Date) => this._positionCalculator.calculatePosition(name.toLowerCase(), date)
        )
    ).pipe(
      map(
        (coords: Coordinates) => this.coordsToLineSegments(SolarSystem.CODE, coords)
      )
    ).toPromise();
  }

  private buildDatesOfNextSteps(
    segmentsCount: number,
    nextStepProducer: NextStepProducer = nextDayProducer
  ): Array<Date> {
    const startDate = this._timeService.selectedTime;
    return Array(segmentsCount).fill(0).map(
      (_: any, day: number) => nextStepProducer(startDate, day)
    );
  }

  private coordsToLineSegments(layerCode: string, coords: Coordinates): LineSegments {
    const coordsSegments = new Array<Array<number>>();
    for (let i = 1; i < coords.length; i++) {
      coordsSegments.push(this.toCoordsSegment(coords[i - 1], coords[i]));
    }
    coordsSegments.push(this.toCoordsSegment(coords[coords.length - 1], coords[0]));
    const plane = this._curvesFactory.createObject3D(layerCode, coordsSegments);
    plane.computeLineDistances();
    return plane;
  }

  private toCoordsSegment(coord1: Array<number>, coord2: Array<number>): Array<number> {
    return [
      coord1[0],
      coord1[1],
      coord2[0],
      coord2[1]
    ];
  }

}
