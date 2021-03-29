
export class DraggableElement {

  private _mousePressed: boolean;

  private _positionTop: number;

  private _positionLeft: number;

  constructor(private readonly _element: HTMLElement) {
    this._mousePressed = false;
    this._element.style.position = 'absolute';
  }

  public enableListeners(): void {
    this._element.addEventListener('mousedown', this.mouseDownHandler);
    this._element.addEventListener('mousemove', this.mouseMoveHandler);
    this._element.addEventListener('mouseup', this.mouseUpHandler);
    this._element.addEventListener('mouseleave', this.mouseUpHandler);
  }

  public disableListeners(): void {
    this._element.removeEventListener('mousedown', this.mouseDownHandler);
    this._element.removeEventListener('mousemove', this.mouseMoveHandler);
    this._element.removeEventListener('mouseup', this.mouseUpHandler);
    this._element.removeEventListener('mouseleave', this.mouseUpHandler);
  }

  private mouseUpHandler = (): void => {
    this._mousePressed = false;
  };

  private mouseDownHandler = (): void => {
    this._positionTop = this._element.offsetTop;
    this._positionLeft = this._element.offsetLeft;
    this._mousePressed = true;
  };

  private mouseMoveHandler = (event: any): void => {
    if (this._mousePressed) {
      this._positionLeft = this._positionLeft + event.movementX;
      this._positionTop = this._positionTop + event.movementY;
      this._element.style.top = this._positionTop + 'px';
      this._element.style.left = this._positionLeft + 'px';
    }
  };

}
