import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/Http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { AbstractService } from '../core/abstract-service';
import { Constants } from '../core/constants';


@Injectable()
export class StarsService extends AbstractService {

  constructor(http: Http) {
    super(http);
  }

  public getConstellationBoundaries(): Observable<number[][]> {
    const url = '/assets/constellation_boundaries.json';
    return this.execGetRequestForUrl(url);
  }

  public getConstellationLines(): Observable<number[][]> {
    const url = '/assets/constellation_lines.json';
    return this.execGetRequestForUrl(url);
  }

  private getStars(magnitudeClass: number): Observable<StarsByMagnitude> {
    const url = `/assets/stars_mag${magnitudeClass.toFixed(1)}.json`;
    return this.execGetRequestForUrl(url).map(
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
