import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Http } from '@angular/Http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';


@Injectable()
export class StarsService {

  constructor(private http: Http) {

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

  public getStars(magnitudeClass: number): Observable<number[][]> {
    const url = `/assets/stars_mag${magnitudeClass.toFixed(1)}.json`;
    return this.execGetRequestForNumericResponse(url);
  }

  public getStarsByClasses(magClasses: number[]): Observable<number[][][]> {
    return Observable.forkJoin(magClasses.map(magClass => this.getStars(magClass)));
  }

  // TODO introduce shared generic error handling
  private handleError(res: Response | any): Observable<any> {
    if (res instanceof Response) {
      const body = res.json() || '';
      return Observable.throw(res);
    }
    return Observable.throw('Failed to retrieve data JSON from server.');
  }

}
