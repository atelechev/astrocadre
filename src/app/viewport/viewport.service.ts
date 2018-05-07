import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Vector3 } from 'three';


@Injectable()
export class ViewportService {

  private changeComplete = new Subject<Vector3>();

  private centerChangeRequested = new Subject<any>();

  private fovChangeRequested = new Subject<number>();

  public readonly changeComplete$ = this.changeComplete.asObservable();

  public readonly centerChangeRequested$ = this.centerChangeRequested.asObservable();

  public readonly fovChangeRequested$ = this.fovChangeRequested.asObservable();

  public viewportCenterChangedTo(coords: Vector3): void {
    this.changeComplete.next(coords);
  }

  public viewportCenterChangeRequested(changes: any): void {
    this.centerChangeRequested.next(changes);
  }

  public viewportFovChangeRequested(fov: number): void {
    this.fovChangeRequested.next(fov);
  }

}
