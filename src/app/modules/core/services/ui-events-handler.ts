import { Injectable } from '@angular/core';
import { MathUtils } from 'three';
import { CameraService } from '#core/services/camera.service';

/**
 * Provides a method to bind mouse event listeners to a DOM element.
 */
@Injectable({ providedIn: 'root' })
export class UiEventsHandler {

  private readonly _moveSensivity = 0.05;

  private _moveStart: boolean;

  private _touchOrigin: Touch;

  constructor(private readonly _cameraService: CameraService) {
    this._moveStart = false;
    this._touchOrigin = undefined;
  }

  /**
   * Binds mouse event listeners to the specified HTML element.
   *
   * @param element the HTML element to bind mouse listeners to.
   */
  public initMouseListenersOn(element: HTMLElement): void {
    this.registerMouseEvents(element);
    this.registerTouchEvents(element);
  }

  private registerMouseEvents(element: HTMLElement): void {
    element.addEventListener('mousedown', () => this._moveStart = true);
    element.addEventListener('mouseup', () => this._moveStart = false);
    element.addEventListener('mouseleave', () => this._moveStart = false);
    element.addEventListener('mousemove', (event: MouseEvent) => {
      if (this._moveStart && event.button === 0) {
        const deltaY = this.calculateDelta(event.movementX);
        const deltaX = this.calculateDelta(event.movementY);
        this.rotateCamera(deltaX, deltaY);
      }
    });
    element.addEventListener('dblclick', (_: MouseEvent) => {
      this._cameraService.alignNSAxis();
    });
  }

  private registerTouchEvents(element: HTMLElement): void {
    element.addEventListener('touchstart', (e: TouchEvent) => {
      this._moveStart = true;
      this._touchOrigin = e.touches[0];
    });
    element.addEventListener('touchend', () => this._moveStart = false);
    element.addEventListener('touchmove', (event: TouchEvent) => {
      if (this._moveStart && this._touchOrigin) {
        const touchPoint = event.touches[0];
        const deltaY = this.calculateDelta(touchPoint.clientX - this._touchOrigin.clientX);
        const deltaX = this.calculateDelta(touchPoint.clientY - this._touchOrigin.clientY);
        this.rotateCamera(deltaX, deltaY);
        this._touchOrigin = touchPoint;
      }
    });
  }

  private rotateCamera(radiansX: number, radiansY: number): void {
    this._cameraService.rotate({ rx: radiansX, ry: radiansY, rz: 0 });
  }

  private calculateDelta(movement: number): number {
    return MathUtils.degToRad(movement * this._moveSensivity);
  }

}
