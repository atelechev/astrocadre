import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AxialRotation } from '../core/axial-rotation';
import { SkyCoordinate } from '../core/sky-coordinate';


@Injectable()
export class ViewportEventService {

  private requestAxialRotation = new Subject<AxialRotation>();

  private requestCenterView = new Subject<SkyCoordinate>();

  private requestFov = new Subject<number>();

  public readonly requestAxialRotation$ = this.requestAxialRotation.asObservable();

  public readonly requestCenterView$ = this.requestCenterView.asObservable();

  public readonly requestFov$ = this.requestFov.asObservable();

  public axialRotationRequested(axialRotation: AxialRotation): void {
    this.requestAxialRotation.next(axialRotation);
  }

  public centerViewRequested(viewCenter: SkyCoordinate): void {
    this.requestCenterView.next(viewCenter);
  }

  public fovRequested(fov: number): void {
    this.requestFov.next(fov);
  }

}
