
export class DraggableElement {

  private mousePressed: boolean;

  private positionTop: number;

  private positionLeft: number;

  constructor(private element: HTMLElement) {
    this.mousePressed = false;
    this.element.style.position = 'absolute';
  }

  public enableListeners(): void {
    this.element.addEventListener('mousedown', this.mouseDownHandler);
    this.element.addEventListener('mousemove', this.mouseMoveHandler);
    this.element.addEventListener('mouseup', this.mouseUpHandler);
    this.element.addEventListener('mouseleave', this.mouseUpHandler);
  }

  public disableListeners(): void {
    this.element.removeEventListener('mousedown', this.mouseDownHandler);
    this.element.removeEventListener('mousemove', this.mouseMoveHandler);
    this.element.removeEventListener('mouseup', this.mouseUpHandler);
    this.element.removeEventListener('mouseleave', this.mouseUpHandler);
  }

  private mouseUpHandler = (): void => {
    this.mousePressed = false;
  };

  private mouseDownHandler = (): void => {
    this.positionTop = this.element.offsetTop;
    this.positionLeft = this.element.offsetLeft;
    this.mousePressed = true;
  };

  private mouseMoveHandler = (event: any): void => {
    if (this.mousePressed) {
      this.positionLeft = this.positionLeft + event.movementX;
      this.positionTop = this.positionTop + event.movementY;
      this.element.style.top = this.positionTop + 'px';
      this.element.style.left = this.positionLeft + 'px';
    }
  };

}
