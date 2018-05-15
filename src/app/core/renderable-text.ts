import { Vector3, Points, BufferGeometry } from 'three';
import { Theme } from './theme';

export class RenderableText {

  private worldPosition: Points;

  private htmlElement: HTMLElement;

  constructor(private readonly parentLayer: string,
              position: Vector3,
              text: string) {
    this.worldPosition = this.toPoints(position);
    this.htmlElement = this.initHtmlElement(parentLayer, text);
  }

  private toPoints(position: Vector3): Points {
    const geometry = new BufferGeometry();
    geometry.setFromPoints([ position ]);
    const point = new Points(geometry);
    point.visible = true; // TODO disable
    point.updateMatrixWorld(true);
    return point;
  }

  private initHtmlElement(parentLayer: string, text: string): HTMLElement {
    const element = document.createElement('div');
    element.className = 'label_' + parentLayer;
    element.textContent = text;
    return element;
  }

  public getWorldPosition(): Points {
    return this.worldPosition;
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
  }

  public setVisible(visible: boolean): void {
    const displayVisibility = visible ? 'initial' : 'none';
    this.htmlElement.style.display = displayVisibility;
  }

}
