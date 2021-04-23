import { Injectable } from '@angular/core';
import AstronomicalObject from 'astronomy-bundle/astronomicalObject/AstronomicalObject';
import { EquatorialSphericalCoordinates } from 'astronomy-bundle/coordinates/coordinateTypes';
import { createTimeOfInterest } from 'astronomy-bundle/time';
import TimeOfInterest from 'astronomy-bundle/time/TimeOfInterest';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LineSegments } from 'three';
import { AxialCurvesFactoryService } from '#core/services/factories/axial-curves-factory.service';

type AstroObjectProducer = (toi: TimeOfInterest) => AstronomicalObject;

export type NextStepProducer = (startDate: Date, stepIndex: number) => Date;

const nextDayProducer: NextStepProducer = (startDate: Date, stepIndex: number): Date => {
  const nextDate = new Date();
  nextDate.setDate(startDate.getDate() + stepIndex);
  return nextDate;
};

@Injectable()
export class ApparentTrajectoryFactoryService {

  constructor(
    private readonly _curvesFactory: AxialCurvesFactoryService
  ) {

  }

  public buildApparentTrajectory(
    layerCode: string,
    cbp: AstroObjectProducer,
    segmentsCount: number,
    nextStepProducer?: NextStepProducer
  ): Promise<LineSegments> {
    if (!layerCode || !cbp || !segmentsCount || segmentsCount < 2) {
      return Promise.reject('All args must be defined and segmentsCount greater than 1');
    }
    return forkJoin(
      this.buildTimesOfInterest(segmentsCount, nextStepProducer)
        .map(
          (toi: TimeOfInterest) => cbp(toi).getApparentGeocentricEquatorialSphericalCoordinates()
        )
    ).pipe(
      map(
        (coords: Array<EquatorialSphericalCoordinates>) => this.coordsToLineSegments(layerCode, coords)
      )
    ).toPromise();
  }

  private buildTimesOfInterest(
    segmentsCount: number,
    nextStepProducer: NextStepProducer = nextDayProducer
  ): Array<TimeOfInterest> {
    const startDate = new Date();
    return Array(segmentsCount).fill(0).map(
      (_: any, day: number) => {
        const nextDate = nextStepProducer(startDate, day);
        return createTimeOfInterest.fromDate(nextDate);
      }
    );
  }

  private coordsToLineSegments(
    layerCode: string,
    coords: Array<EquatorialSphericalCoordinates>
  ): LineSegments {
    const coordsSegments = new Array<Array<number>>();
    for (let i = 1; i < coords.length; i++) {
      coordsSegments.push(this.toCoordsSegment(coords[i - 1], coords[i]));
    }
    coordsSegments.push(this.toCoordsSegment(coords[coords.length - 1], coords[0]));
    const plane = this._curvesFactory.createObject3D(layerCode, coordsSegments);
    plane.computeLineDistances();
    return plane;
  }

  private toCoordsSegment(
    coord1: EquatorialSphericalCoordinates,
    coord2: EquatorialSphericalCoordinates
  ): Array<number> {
    return [
      coord1.rightAscension,
      coord1.declination,
      coord2.rightAscension,
      coord2.declination
    ];
  }

}
