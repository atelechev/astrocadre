import { ElementRef, Injectable } from '@angular/core';
import { RenderableText } from '../core/layer/label/renderable-text';
import { Object3D, Camera, Frustum, Matrix4, Vector3 } from 'three';
import { Constants } from '../core/constants';
import { WorldOriginCameraService } from './world-origin-camera.service';
import { ViewportDimensionService } from './viewport-dimension.service';
import { ScreenCoordinate } from '../core/viewport/screen-coordinate';

@Injectable()
export class LabelsVisibilityManager {

  private readonly halfWidth: number;

  private readonly halfHeight: number;

  private camera: Camera;

  constructor(private dimensionService: ViewportDimensionService,
              cameraService: WorldOriginCameraService) {
    this.halfWidth = this.dimensionService.getWidth() / 2;
    this.halfHeight = this.dimensionService.getHeight() / 2;
    this.camera = cameraService.getCamera();
  }

  public hideLabelsByLayer(layer: string, labelsDomRoot: HTMLElement): void {
    const labelClassPrefix = 'label_' + layer;
    const allChildren = labelsDomRoot.children;
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

  public showVisibleLabels(layer: string, labels: Map<string, RenderableText>, labelsDomRoot: any): void {
    this.hideLabelsByLayer(layer, labelsDomRoot);
    this.camera.updateMatrix();
    this.camera.updateMatrixWorld(true);
    const frustum = this.initFrustum();
    labels.forEach(
      (renderable: RenderableText, code: string) => {
        if (!this.isPointBehind(frustum, renderable.position)) {
          const onScreenCoordinate = this.getOnscreenPosition(renderable.position);
          if (this.dimensionService.isInBounds(onScreenCoordinate)) {
            this.setLabelPositionAndShow(renderable, onScreenCoordinate);
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

  private getOnscreenPosition(point: Vector3): ScreenCoordinate {
    const onScreen = point.clone();
    onScreen.project(this.camera);
    const scrX = (onScreen.x * this.halfWidth) + this.halfWidth;
    const scrY = -(onScreen.y * this.halfHeight) + this.halfHeight;
    return { x: scrX, y: scrY };
  }

  private setLabelPositionAndShow(renderable: RenderableText, onScreen: ScreenCoordinate): void {
    const style = renderable.getHtmlElement().style;
    style.top = Math.floor(onScreen.y + renderable.getOffsetY()) + 'px';
    style.left = Math.floor(onScreen.x + renderable.getOffsetX()) + 'px';
    style.display = 'initial';
  }

}
