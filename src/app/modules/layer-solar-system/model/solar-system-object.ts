import AstronomicalObject from 'astronomy-bundle/astronomicalObject/AstronomicalObject';
import TimeOfInterest from 'astronomy-bundle/time/TimeOfInterest';

/**
 * Wraps constants related with a supported object of the Solar system layer.
 */
export interface SolarSystemObject {
  /**
   * The name of the object.
   */
  name: string;
  /**
   * The number of steps to be included in the calculated apparent path of this object.
   */
  pathSteps: number;
  /**
   * The function that produces an instance of that object in the
   * Astronomy-bundle library.
   */
  bundleCreator: (toi?: TimeOfInterest) => AstronomicalObject;
};
