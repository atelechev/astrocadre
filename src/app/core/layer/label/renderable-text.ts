import { Vector3 } from 'three';
import { Theme } from '../../theme/theme';
import { TextOffsetPolicy, TextOffsets } from './text-offset-policy';
import { TextStyleAssigner } from './text-style-assigner';
import { HtmlElementFactory } from './html-element-factory';
import { ArgValidator } from '../arg-validator';

export class RenderableText {

  private htmlElement: HTMLElement;

  private offsets: TextOffsets;

  constructor(private readonly parentLayer: string,
              private readonly styleKey: string,
              public readonly position: Vector3,
              private text: string,
              private offsetPolicy: TextOffsetPolicy) {
    ArgValidator.ensureArgDefined(position, 'position');
    ArgValidator.ensureArgDefined(offsetPolicy, 'offsetPolicy');
    this.htmlElement = HtmlElementFactory.newLabel(parentLayer, styleKey, text);
    this.offsets = TextOffsets.ZERO_OFFSETS;
  }

  public getHtmlElement(): HTMLElement {
    return this.htmlElement;
  }

  public useTheme(theme: Theme): void {
    const labelStyle = theme.getTextStyleForLayer(this.parentLayer, this.styleKey);
    TextStyleAssigner.applyStyleOn(labelStyle, this.htmlElement);
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
