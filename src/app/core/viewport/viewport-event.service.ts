import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AxialRotation } from './axial-rotation';
import { SkyCoordinate } from './sky-coordinate';

/**
 * Used to exchange events and messages related with the main viewport area.
 */
@Injectable()
export class ViewportEventService {

  private requestAxialRotation = new Subject<AxialRotation>();

  private requestCenterView = new Subject<SkyCoordinate>();

  private requestFov = new Subject<number>();

  private requestAxisAlignment = new Subject<null>();

  private broadcastViewportChanged = new Subject<null>();

  /**
   * Observable to subscribe to when the camera is requested to rotate around its axes.
   */
  public readonly requestAxialRotation$ = this.requestAxialRotation.asObservable();

  /**
   * Observable to subscribe to when the camera is requested to center on a specific coordinate.
   */
  public readonly requestCenterView$ = this.requestCenterView.asObservable();

  /**
   * Observable to subscribe to when the camera is requested to change the field of view width angle.
   */
  public readonly requestFov$ = this.requestFov.asObservable();

  /**
   * Observable to subscribe to when the camera is requested to align with the South-North axis.
   */
  public readonly requestAxisAlignment$ = this.requestAxisAlignment.asObservable();

  /**
   * Observable to subscribe to intercept events fired when a viewport change is completed.
   */
  public readonly broadcastViewportChanged$ = this.broadcastViewportChanged.asObservable();

  /**
   * Broadcast an event to request the camera to rotate around its axes.
   *
   * @param axialRotation the rotation of the camera, in radians around each axis.
   */
  public axialRotationRequested(axialRotation: AxialRotation): void {
    this.requestAxialRotation.next(axialRotation);
  }

  /**
   * Broadcast an event to request the camera to center the view on the specified coordinate.
   *
   * @param viewCenter the coordinate to center on.
   */
  public centerViewRequested(viewCenter: SkyCoordinate): void {
    this.requestCenterView.next(viewCenter);
  }

  /**
   * Broadcast an event to request the camera to change the field of view width angle.
   *
   * @param fov the field of view to set, in degrees.
   */
  public fovRequested(fov: number): void {
    this.requestFov.next(fov);
  }

  /**
   * Broadcast an event to request the camera to align with the South-North axis.
   */
  public axisAlignmentRequested(): void {
    this.requestAxisAlignment.next();
  }

  /**
   * Broadcast an event denoting that a change of the viewport is completed.
   */
  public viewportChanged(): void {
    this.broadcastViewportChanged.next();
  }

}
