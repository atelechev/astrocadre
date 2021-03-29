import { Injectable } from '@angular/core';
import { DraggableElement } from '#controls/models/draggable-element';

/**
 * Provides a possibility to make any DOM element draggable.
 */
@Injectable()
export class DraggableElementsHandler {

  private _draggableElements: Map<HTMLElement, DraggableElement>;

  constructor() {
    this._draggableElements = new Map<HTMLElement, DraggableElement>();
  }

  /**
   * Makes the specified element draggable.
   *
   * @param element the element to make draggable.
   * @throws error if the element is already draggable.
   */
  public makeDraggable(element: HTMLElement): void {
    if (this._draggableElements.has(element)) {
      throw new Error('This HTMLElement is already draggable!');
    }
    const draggable = new DraggableElement(element);
    this._draggableElements.set(element, draggable);
    draggable.enableListeners();
  }

  /**
   * Disables dragging for the specified element.
   *
   * @param element the element to disable dragging for.
   */
  public disableDragging(element: HTMLElement): void {
    if (element) {
      const draggable = this._draggableElements.get(element);
      if (draggable) {
        draggable.disableListeners();
        this._draggableElements.delete(element);
      }
    }
  }

  /**
   * Returns true if the specified element is draggable.
   *
   * @param element the element to check.
   */
  public isDraggable(element: HTMLElement): boolean {
    return this._draggableElements.has(element);
  }

}
