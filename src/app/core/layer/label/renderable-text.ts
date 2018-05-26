import { Vector3 } from 'three';
import { Theme } from '../../theme/theme';
import { TextOffsetPolicy } from './text-offset-policy';
import { TextStyleAssigner } from './text-style-assigner';

export class RenderableText {

  private htmlElement: HTMLElement;

  // half width of the rendered text
  private widthOffset: number;

  // half height of the rendered text
  private heightOffset: number;

  constructor(private readonly parentLayer: string,
              private readonly styleKey: string,
              public readonly position: Vector3,
              private text: string,
              private offsetPolicy: TextOffsetPolicy) {
    this.htmlElement = this.initHtmlElement(parentLayer, text);
    this.widthOffset = 0;
    this.heightOffset = 0;
  }

  private updateOffsets(): void {
    const offsets = this.offsetPolicy.calculateOffsets(this.text, this.htmlElement);
    this.widthOffset = offsets.offsetWidth;
    this.heightOffset = offsets.offsetHeight;
  }

  private initHtmlElement(parentLayer: string, text: string): HTMLElement {
    const element = document.createElement('div');
    element.className = `label_${parentLayer}_${this.styleKey}`;
    element.textContent = text;
    element.style.position = 'absolute';
    element.style.zIndex = '100';
    return element;
  }

  public getHtmlElement(): HTMLElement {
    return this.htmlElement;
  }

  public useTheme(theme: Theme): void {
    const labelStyle = theme.getTextStyleForLayer(this.parentLayer, this.styleKey);
    TextStyleAssigner.applyStyleOn(labelStyle, this.htmlElement);
    this.updateOffsets();
  }

  public setVisible(visible: boolean): void {
    const displayVisibility = visible ? 'initial' : 'none';
    this.htmlElement.style.display = displayVisibility;
  }

  public getWidthOffset(): number {
    return this.widthOffset;
  }

  public getHeightOffset(): number {
    return this.heightOffset;
  }

}
