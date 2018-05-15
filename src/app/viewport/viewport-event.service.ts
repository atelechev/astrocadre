import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AxialRotation } from '../core/axial-rotation';
import { SkyCoordinate } from '../core/sky-coordinate';


@Injectable()
export class ViewportEventService {

  private requestAxialRotation = new Subject<AxialRotation>();

  private requestCenterView = new Subject<SkyCoordinate>();

  private requestFov = new Subject<number>();

  private requestAxisAlignment = new Subject<null>();

  private broadcastViewportChanged = new Subject<null>();

  public readonly requestAxialRotation$ = this.requestAxialRotation.asObservable();

  public readonly requestCenterView$ = this.requestCenterView.asObservable();

  public readonly requestFov$ = this.requestFov.asObservable();

  public readonly requestAxisAlignment$ = this.requestAxisAlignment.asObservable();

  public readonly broadcastViewportChanged$ = this.broadcastViewportChanged.asObservable();

  public axialRotationRequested(axialRotation: AxialRotation): void {
    this.requestAxialRotation.next(axialRotation);
  }

  public centerViewRequested(viewCenter: SkyCoordinate): void {
    this.requestCenterView.next(viewCenter);
  }

  public fovRequested(fov: number): void {
    this.requestFov.next(fov);
  }

  public axisAlignmentRequested(): void {
    this.requestAxisAlignment.next();
  }

  public viewportChanged(): void {
    this.broadcastViewportChanged.next();
  }

}
