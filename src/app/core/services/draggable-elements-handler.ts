import { Injectable } from '@angular/core';
import { DraggableElement } from '#core/models/draggable-element';

/**
 * Provides a possibility to make any DOM element draggable.
 */
@Injectable()
export class DraggableElementsHandler {

  private draggableElements: Map<HTMLElement, DraggableElement>;

  constructor() {
    this.draggableElements = new Map<HTMLElement, DraggableElement>();
  }

  /**
   * Makes the specified element draggable.
   *
   * @param element the element to make draggable.
   * @throws error if the element is already draggable.
   */
  public makeDraggable(element: HTMLElement): void {
    if (this.draggableElements.has(element)) {
      throw new Error('This HTMLElement is already draggable!');
    }
    const draggable = new DraggableElement(element);
    this.draggableElements.set(element, draggable);
    draggable.enableListeners();
  }

  /**
   * Disables dragging for the specified element.
   *
   * @param element the element to disable dragging for.
   */
  public disableDragging(element: HTMLElement): void {
    if (element) {
      const draggable = this.draggableElements.get(element);
      if (draggable) {
        draggable.disableListeners();
        this.draggableElements.delete(element);
      }
    }
  }

  /**
   * Returns true if the specified element is draggable.
   *
   * @param element the element to check.
   */
  public isDraggable(element: HTMLElement): boolean {
    return this.draggableElements.has(element);
  }

}
