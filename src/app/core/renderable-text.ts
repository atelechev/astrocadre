import { Vector3 } from 'three';
import { Theme } from './theme';

export class RenderableText {

  private static readonly MEASURE_CANVAS = document.createElement('canvas');

  private htmlElement: HTMLElement;

  // half width of the rendered text
  private widthOffset: number;

  // half height of the rendered text
  private heightOffset: number;

  constructor(private readonly parentLayer: string,
              public readonly position: Vector3,
              private text: string) {
    this.htmlElement = this.initHtmlElement(parentLayer, text);
    this.widthOffset = 0;
    this.heightOffset = 0;
  }

  private updateOffsets(): void {
    const context = RenderableText.MEASURE_CANVAS.getContext('2d');
    context.font = this.getFontStyleForMetrics();
    const textWidth = context.measureText(this.text).width;
    if (textWidth) {
      this.widthOffset = Math.ceil(textWidth) / 2;
    }
    const fontSize = this.htmlElement.style.fontSize;
    this.heightOffset = parseInt(fontSize.substring(0, fontSize.length - 2), 10) / 2;
  }

  private getFontStyleForMetrics(): string {
    const style = this.htmlElement.style;
    return `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  }

  private initHtmlElement(parentLayer: string, text: string): HTMLElement {
    const element = document.createElement('div');
    element.className = 'label_' + parentLayer;
    element.textContent = text;
    return element;
  }

  public getHtmlElement(): HTMLElement {
    return this.htmlElement;
  }

  public useTheme(theme: Theme): void {
    const labelStyle = theme.getTextStyleForLayer(this.parentLayer);
    const style = this.htmlElement.style;
    style.position = 'absolute';
    style.fontFamily = labelStyle.fontFamily;
    style.fontSize = labelStyle.fontSize;
    style.fontStyle = labelStyle.fontStyle;
    style.fontWeight = labelStyle.fontWeight;
    style.color = labelStyle.color;
    style.zIndex = '100';
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
