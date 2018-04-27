import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Http } from '@angular/Http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';
import { AbstractService } from '../core/abstract-service';
import { Constants } from '../core/constants';


@Injectable()
export class StarsService extends AbstractService {

  constructor(private http: Http) {
    super();
  }

  public getConstellationBoundaries(): Observable<number[][]> {
    const url = '/assets/constellation_boundaries.json';
    return this.execGetRequestForNumericResponse(url);
  }

  public getConstellationLines(): Observable<number[][]> {
    const url = '/assets/constellation_lines.json';
    return this.execGetRequestForNumericResponse(url);
  }

  private execGetRequestForNumericResponse(url: string): Observable<number[][]> {
    return this.http.get(url)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  private getStars(magnitudeClass: number): Observable<StarsByMagnitude> {
    const url = `/assets/stars_mag${magnitudeClass.toFixed(1)}.json`;
    return this.execGetRequestForNumericResponse(url).map(
      (stars: number[][]) => new StarsByMagnitude(magnitudeClass, stars)
    );
  }

  public getStarsByClasses(): Observable<Map<number, number[][]>> {
    const magClasses = Constants.STAR_MAGNITUDES; // TODO should be configured externally
    return Observable.forkJoin(magClasses.map(magClass => this.getStars(magClass)))
                     .map((starsByMagnitude: StarsByMagnitude[]) => {
                       const mapped = new Map<number, number[][]>();
                       starsByMagnitude.forEach(magClass => mapped.set(magClass.getMagnitude(), magClass.getStars()));
                       return mapped;
                     });
  }

}


class StarsByMagnitude {

  constructor(private magnitude: number, private stars: number[][]) {

  }

  public getMagnitude(): number {
    return this.magnitude;
  }

  public getStars(): number[][] {
    return this.stars;
  }

}
