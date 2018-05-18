import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/Http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { AbstractService } from '../core/abstract-service';
import { Constants } from '../core/constants';
import { ConstellationMetadata } from './constellation-metadata';


@Injectable()
export class StarsService extends AbstractService {

  constructor(http: Http) {
    super(http);
  }

  public getConstellationBoundaries(): Observable<number[][]> {
    const url = '/assets/constellation-boundaries.json';
    return this.execGetRequestForUrl(url);
  }

  public getConstellationLines(): Observable<number[][]> {
    const url = '/assets/constellation-lines.json';
    return this.execGetRequestForUrl(url);
  }

  public getStarsByMagnitudeClass(magnitudeClass: number): Observable<any[][]> {
    const url = `/assets/stars-mag${magnitudeClass.toFixed(1)}.json`;
    return this.execGetRequestForUrl(url);
  }

  public getConstellationMetadata(): Observable<ConstellationMetadata[]> {
    const url = '/assets/constellations.json';
    return this.execGetRequestForUrl(url);
  }

}
