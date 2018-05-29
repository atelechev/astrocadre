import { ElementRef } from '@angular/core';
import { RenderableText } from '../core/layer/label/renderable-text';
import { Object3D, Camera, Frustum, Matrix4, Vector3 } from 'three';
import { Constants } from '../core/constants';

export class LabelsVisibilityManager {

  private readonly halfWidth: number;

  private readonly halfHeight: number;

  constructor(private skyViewViewport: ElementRef,
              private camera: Camera) {
    this.halfWidth = Constants.VIEW_WIDTH / 2;
    this.halfHeight = Constants.VIEW_HEIGHT / 2;
  }

  public hideLabelsByLayer(layer: string): void {
    const labelClassPrefix = 'label_' + layer;
    const allChildren = <HTMLCollection> this.skyViewViewport.nativeElement.children;
    const length = allChildren.length;
    for (let i = 0; i < length; i++) {
      const child = <HTMLElement> allChildren.item(i);
      if (child) {
        const cssClass = child.getAttribute('class');
        if (cssClass && cssClass.startsWith(labelClassPrefix)) {
          this.hideLabel(child.style);
        }
      }
    }
  }

  private hideLabel(style: CSSStyleDeclaration): void {
    style.display = 'none';
    style.top = '';
    style.left = '';
  }

  public showVisibleLabels(layer: string, labels: Map<string, RenderableText>): void {
    this.hideLabelsByLayer(layer);
    this.camera.updateMatrix();
    this.camera.updateMatrixWorld(true);
    const frustum = this.initFrustum();
    labels.forEach(
      (renderable: RenderableText, code: string) => {
        if (!this.isPointBehind(frustum, renderable.position)) {
          const onScreenPosition = this.getOnscreenPosition(renderable.position);
          if (this.isPointOnScreen(onScreenPosition)) {
            this.setLabelPositionAndShow(renderable, onScreenPosition);
          }
        }
      }
    );
  }

  private initFrustum(): Frustum {
    const frustum = new Frustum();
    frustum.setFromMatrix(new Matrix4().multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse));
    return frustum;
  }

  private isPointBehind(frustum: Frustum, point: Vector3): boolean {
    if (!point) {
      return true;
    }
    return !frustum.containsPoint(point);
  }

  private getOnscreenPosition(point: Vector3): Vector3 {
    const onScreen = point.clone();
    onScreen.project(this.camera);
    onScreen.x = (onScreen.x * this.halfWidth) + this.halfWidth;
    onScreen.y = -(onScreen.y * this.halfHeight) + this.halfHeight;
    onScreen.z = 0;
    return onScreen;
  }

  private isPointOnScreen(position: Vector3): boolean {
    return position &&
           position.x >= 0 && position.y >= 0 &&
           position.x < Constants.VIEW_WIDTH &&
           position.y < Constants.VIEW_HEIGHT;
  }

  private setLabelPositionAndShow(renderable: RenderableText, position: Vector3): void {
    const style = renderable.getHtmlElement().style;
    style.top = Math.floor(position.y + renderable.getOffsetY()) + 'px';
    style.left = Math.floor(position.x + renderable.getOffsetX()) + 'px';
    style.display = 'initial';
  }

}
