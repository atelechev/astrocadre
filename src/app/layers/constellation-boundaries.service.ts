import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Http } from '@angular/Http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ConstellationBoundary } from './model/constellation-boundary';


@Injectable()
export class ConstellationBoundaryService {

  constructor(private http: Http) {

  }

  public getConstellationBoundaries(): Observable<ConstellationBoundary[]> {
    const url = '/assets/constellation_boundaries.json';
    return this.http.get(url)
               .map(this.toConstellationBoundaries)
               .catch(this.handleError);
  }

  private toConstellationBoundaries(res: Response): ConstellationBoundary[] {
    return res.json();
  }

  private handleError(res: Response | any): Observable<any> {
    if (res instanceof Response) {
      const body = res.json() || '';
      return Observable.throw(res);
    }
    return Observable.throw('Failed to retrieve ConstellationBoundaries JSON.');
  }

}
