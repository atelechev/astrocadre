import { Vector3 } from 'three';
import { HtmlElementFactory } from '#core/models/html-element-factory';
import { TextOffsetPolicy, TextOffsets } from '#core/models/text-offset-policy';
import { Theme } from '#core/models/theme';
import { applyStyleOn } from '#core/utils/text-utils';
import { ensureArgDefined } from '#core/utils/arg-validation-utils';

/**
 * Wraps data about text that can be rendered in the view.
 */
export class RenderableText {

  private htmlElement: HTMLElement;

  private offsets: TextOffsets;

  constructor(private readonly parentLayer: string,
    private readonly styleKey: string,
    public readonly position: Vector3,
    private text: string,
    private offsetPolicy: TextOffsetPolicy) {
    ensureArgDefined(position, 'position');
    ensureArgDefined(offsetPolicy, 'offsetPolicy');
    this.htmlElement = HtmlElementFactory.newLabel(parentLayer, styleKey, text);
    this.offsets = TextOffsets.ZERO_OFFSETS;
  }

  public getHtmlElement(): HTMLElement {
    return this.htmlElement;
  }

  public useTheme(theme: Theme): void {
    const labelStyle = theme.getTextStyleForLayer(this.parentLayer, this.styleKey);
    applyStyleOn(labelStyle, this.htmlElement);
    this.offsets = this.offsetPolicy.calculateOffsets(this.text, this.htmlElement);
  }

  public setVisible(visible: boolean): void {
    const displayVisibility = visible ? 'initial' : 'none';
    this.htmlElement.style.display = displayVisibility;
  }

  public getOffsetX(): number {
    return this.offsets.offsetX;
  }

  public getOffsetY(): number {
    return this.offsets.offsetY;
  }

}
