import { Injectable } from '@angular/core';
import { CameraService } from 'src/app/modules/core/services/camera.service';
import { MathUtils } from 'three';

/**
 * Provides a method to bind mouse event listeners to a DOM element.
 */
@Injectable()
export class MouseEventsHandler {

  private _mousePressed: boolean;

  private readonly _mouseSensivity = 0.05;

  constructor(private readonly _cameraService: CameraService) {

  }

  /**
   * Binds mouse event listeners to the specified HTML element.
   *
   * @param element the HTML element to bind mouse listeners to.
   */
  public initMouseListenersOn(element: HTMLElement): void {
    this.addMouseEventListener(element, 'mousedown', this.mousePressedFunction(true));
    this.addMouseEventListener(element, 'mouseup', this.mousePressedFunction(false));
    this.addMouseEventListener(element, 'mouseleave', this.mousePressedFunction(false));
    this.addMouseEventListener(element, 'mousemove', (event: MouseEvent) => {
      if (this._mousePressed && event.button === 0) {
        const deltaY = MathUtils.degToRad(event.movementX * this._mouseSensivity);
        const deltaX = MathUtils.degToRad(event.movementY * this._mouseSensivity);
        this._cameraService.rotate({ rx: deltaX, ry: deltaY, rz: 0 });
      }
    });
    this.addMouseEventListener(element, 'dblclick', (_: MouseEvent) => {
      this._cameraService.alignNSAxis();
    });
  }

  private mousePressedFunction(pressed: boolean): (MouseEvent) => void {
    return (_: MouseEvent) => {
      this._mousePressed = pressed;
    };
  }

  private addMouseEventListener(element: HTMLElement, eventKey: string, funct: (MouseEvent) => void): void {
    element.addEventListener(eventKey, funct);
  }

}
