import { Injectable } from '@angular/core';
import AstronomicalObject from 'astronomy-bundle/astronomicalObject/AstronomicalObject';
import { EquatorialSphericalCoordinates } from 'astronomy-bundle/coordinates/coordinateTypes';
import { createTimeOfInterest } from 'astronomy-bundle/time';
import TimeOfInterest from 'astronomy-bundle/time/TimeOfInterest';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LineSegments } from 'three';
import { AxialCurvesFactoryService } from '#core/services/factories/axial-curves-factory.service';

export type CelestialBodyProducer = (toi: TimeOfInterest) => AstronomicalObject;

@Injectable()
export class CelestialPlaneFactoryService {

  constructor(
    private readonly _curvesFactory: AxialCurvesFactoryService
  ) {

  }

  public buildCelestialPlane(
    layerCode: string,
    cbp: CelestialBodyProducer,
    segmentsCount: number
  ): Observable<LineSegments> {
    return forkJoin(
      this.buildTimesOfInterest(segmentsCount).map(
        (toi: TimeOfInterest) => cbp(toi).getApparentGeocentricEquatorialSphericalCoordinates()
      )
    ).pipe(
      map(
        (coords: Array<EquatorialSphericalCoordinates>) => this.coordsToLineSegments(layerCode, coords)
      )
    );
  }

  private buildTimesOfInterest(segmentsCount: number): Array<TimeOfInterest> {
    const startDate = new Date();
    return Array(segmentsCount).fill(0).map(
      (_: any, day: number) => {
        const nextDate = new Date();
        nextDate.setDate(startDate.getDate() + day);
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
