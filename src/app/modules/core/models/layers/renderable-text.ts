import { Vector3 } from 'three';
import { TextOffsetPolicy } from '#core/models/layers/text/text-offset-policy';
import { TextOffsets } from '#core/models/layers/text/text-offsets';
import { TextStyle } from '#core/models/theme/text-style';
import { ScreenCoordinate } from '#core/models/screen/screen-coordinate';

/**
 * Wraps the data about a text that can be rendered in the view.
 */
export class RenderableText {

  private readonly _htmlElement: HTMLElement;

  private _offsets: TextOffsets;

  constructor(
    private readonly _position: Vector3,
    private readonly _text: string,
    private readonly _offsetPolicy: TextOffsetPolicy
  ) {
    this._htmlElement = this.newLabel(_text);
    this._offsets = TextOffsets.ZERO_OFFSETS;
  }

  /**
   * Returns the HTML element reference of the element wrapping the text.
   */
  public get htmlElement(): HTMLElement {
    return this._htmlElement;
  }

  /**
   * Returns the position where this text element should be rendered in the 3D coordinates space.
   *
   * Generally, this position corresponds to the coordinates of the related 3D object.
   */
  public get position(): Vector3 {
    return this._position;
  }

  /**
   * Returns the offset on the horizontal dimension, by which the text element should be
   * moved relatively to the related 3D object. The value is expected to be in pixels.
   */
  public get offsetX(): number {
    return this._offsets.offsetX;
  }

  /**
   * Returns the offset on the vertical dimension, by which the text element should be
   * moved relatively to the related 3D object. The value is expected to be in pixels.
   */
  public get offsetY(): number {
    return this._offsets.offsetY;
  }

  /**
   * Returns the text to be shown in the view.
   */
  public get text(): string {
    return this._text;
  }

  /**
   * Sets this object to be visible or hidden.
   *
   * @param visible true to show, false to hide the text.
   */
  public setVisible(visible: boolean): void {
    const displayVisibility = visible ? 'initial' : 'none';
    this._htmlElement.style.display = displayVisibility;
  }

  /**
   * Applies the specified style to this text.
   *
   * @param style the style to apply.
   */
  public applyStyle(style: TextStyle): void {
    if (!style) {
      return;
    }
    const elementStyle = this.htmlElement.style;
    Object.keys(style)
      .forEach(
        (cssProperty: string) => elementStyle[cssProperty] = style[cssProperty]
      );
    this._offsets = this._offsetPolicy.calculateOffsets(this._text, this._htmlElement);
  }

  /**
   * Sets the on-screen position of this element to the specified coordinates
   * and makes this element visible.
   *
   * @param onScreen the coordinate to show this element at.
   */
  public setPositionAndShow(onScreen: ScreenCoordinate): void {
    const style = this._htmlElement.style;
    style.top = Math.floor(onScreen.y + this.offsetY) + 'px';
    style.left = Math.floor(onScreen.x + this.offsetX) + 'px';
    style.display = 'initial';
  }

  private newLabel(text: string): HTMLElement {
    const element = document.createElement('div');
    element.textContent = text;
    element.style.position = 'absolute';
    element.style.zIndex = '100';
    return element;
  }

}
