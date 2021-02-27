import { ViewportEventService } from '../core/viewport/viewport-event.service';
import { MathUtils } from 'three';
import { Injectable } from '@angular/core';

/**
 * Provides a method to bind mouse event listeners to a DOM element.
 */
@Injectable()
export class MouseEventsHandler {

  private mousePressed: boolean;

  private mouseSensivity = 0.05;

  constructor(private viewportService: ViewportEventService) {

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
      if (this.mousePressed && event.button === 0) {
        const deltaY = MathUtils.degToRad(event.movementX * this.mouseSensivity);
        const deltaX = MathUtils.degToRad(event.movementY * this.mouseSensivity);
        this.viewportService.axialRotationRequested({ rx: deltaX, ry: deltaY, rz: 0 });
      }
    });
    this.addMouseEventListener(element, 'dblclick', (event: MouseEvent) => {
      this.viewportService.axisAlignmentRequested();
    });
  }

  private mousePressedFunction(pressed: boolean): (MouseEvent) => void {
    return (event: MouseEvent) => {
      this.mousePressed = pressed;
    };
  }

  private addMouseEventListener(element: HTMLElement, eventKey: string, funct: (MouseEvent) => void): void {
    element.addEventListener(eventKey, funct);
  }

}
