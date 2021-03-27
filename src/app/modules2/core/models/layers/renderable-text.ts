import { HtmlElementFactory } from 'src/app/modules2/core/models/layers/factories/text/html-element-factory';
import { TextOffsetPolicy } from 'src/app/modules2/core/models/layers/factories/text/text-offset-policy';
import { TextOffsets } from 'src/app/modules2/core/models/layers/factories/text/text-offsets';
import { TextStyle } from 'src/app/modules2/core/models/text-style';
import { Vector3 } from 'three';

/**
 * Wraps data about text that can be rendered in the view.
 */
export class RenderableText {

  private readonly _htmlElement: HTMLElement;

  private _offsets: TextOffsets;

  constructor(
    parentLayer: string,
    private readonly _styleKey: string,
    private readonly _position: Vector3,
    private readonly _text: string,
    private readonly _offsetPolicy: TextOffsetPolicy
  ) {
    this._htmlElement = HtmlElementFactory.newLabel(parentLayer, _styleKey, _text);
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

  public applyStyles(styles: Map<string, TextStyle>): void {
    const labelStyle = styles.get(this._styleKey);
    this.applyStyle(labelStyle);
    this._offsets = this._offsetPolicy.calculateOffsets(this._text, this._htmlElement);
  }

  public setVisible(visible: boolean): void {
    const displayVisibility = visible ? 'initial' : 'none';
    this._htmlElement.style.display = displayVisibility;
  }

  private applyStyle(style: TextStyle): void {
    const elementStyle = this.htmlElement.style;
    Object.keys(style)
      .forEach(
        (cssProperty: string) => elementStyle[cssProperty] = style[cssProperty]
      );
  }

}
