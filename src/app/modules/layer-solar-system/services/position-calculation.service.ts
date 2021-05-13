import { Injectable } from '@angular/core';
import AstronomicalObject from 'astronomy-bundle/astronomicalObject/AstronomicalObject';
import { EquatorialSphericalCoordinates } from 'astronomy-bundle/coordinates/types/CoordinateTypes';
import { createTimeOfInterest } from 'astronomy-bundle/time';
import TimeOfInterest from 'astronomy-bundle/time/TimeOfInterest';
import { SolarSystemObject } from '#layer-solar-system/model/solar-system-object';
import { SOLAR_SYSTEM_OBJECTS } from '#layer-solar-system/model/solar-system-objects';


type AstroObjectProducer = (toi?: TimeOfInterest) => AstronomicalObject;

/**
 * Provides a function to caculate the position of a Solar system object
 * at a specific time.
 */
@Injectable()
export class PositionCalculationService {

  private readonly _astroObjectProducers: Map<string, AstroObjectProducer>;

  constructor() {
    this._astroObjectProducers = this.buildProducersMap();
  }

  /**
   * Returns the ra/dec coordinates of the specified Solar system body,
   * at the given time.
   *
   * @param body the name of the Solar system body.
   * @param time the time for which the position should be calculated.
   * @returns Promise<Array<number>> when reolved, an array of 2 numbers: [ ra, dec ].
   */
  public calculatePosition(body: string, time: Date): Promise<Array<number>> {
    const provider = this._astroObjectProducers.get(body);
    if (!provider) {
      return Promise.reject(`Astronomical object not supported: ${body}`);
    }
    const toi = createTimeOfInterest.fromDate(time);
    return provider(toi).getApparentGeocentricEquatorialSphericalCoordinates()
      .then(
        (esCoords: EquatorialSphericalCoordinates) => [esCoords.rightAscension, esCoords.declination]
      );
  }

  private buildProducersMap(): Map<string, AstroObjectProducer> {
    const producers = new Map<string, AstroObjectProducer>();
    SOLAR_SYSTEM_OBJECTS.forEach(
      (object: SolarSystemObject) => producers.set(object.name.toLowerCase(), object.bundleCreator)
    );
    return producers;
  }

}
