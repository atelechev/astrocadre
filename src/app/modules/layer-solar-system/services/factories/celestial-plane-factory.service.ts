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
    const year = new Date().getFullYear();
    return Array(segmentsCount).fill(0).map(
      (_: any, day: number) => createTimeOfInterest.fromYearOfDay(year, day)
    );
  }

  private coordsToLineSegments(
    layerCode: string,
    coords: Array<EquatorialSphericalCoordinates>
  ): LineSegments {
    const coordsSegments = new Array<Array<number>>();
    for (let i = 1; i < coords.length; i++) {
      const iPrev = i - 1;
      coordsSegments.push([
        coords[iPrev].rightAscension,
        coords[iPrev].declination,
        coords[i].rightAscension,
        coords[i].declination
      ]);
    }
    const iLast = coords.length - 1;
    coordsSegments.push([
      coords[iLast].rightAscension,
      coords[iLast].declination,
      coords[0].rightAscension,
      coords[0].declination
    ]);
    const plane = this._curvesFactory.createObject3D(layerCode, coordsSegments);
    plane.computeLineDistances();
    return plane;
  }

}
