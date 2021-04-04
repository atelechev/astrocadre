import { Vector3 } from 'three';
import { TextOffsetPolicy } from '#core/models/layers/factories/text/text-offset-policy';
import { TextOffsets } from '#core/models/layers/factories/text/text-offsets';
import { TextStyle } from '#core/models/theme/text-style';

/**
 * Wraps data about text that can be rendered in the view.
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

  public get htmlElement(): HTMLElement {
    return this._htmlElement;
  }

  public get position(): Vector3 {
    return this._position;
  }

  public get offsetX(): number {
    return this._offsets.offsetX;
  }

  public get offsetY(): number {
    return this._offsets.offsetY;
  }

  public get text(): string {
    return this._text;
  }

  public setVisible(visible: boolean): void {
    const displayVisibility = visible ? 'initial' : 'none';
    this._htmlElement.style.display = displayVisibility;
  }

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

  private newLabel(text: string): HTMLElement {
    const element = document.createElement('div');
    element.textContent = text;
    element.style.position = 'absolute';
    element.style.zIndex = '100';
    return element;
  }

}
