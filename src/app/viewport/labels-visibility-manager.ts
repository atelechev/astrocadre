import { Injectable } from '@angular/core';
import { RenderableText } from '../core/layer/label/renderable-text';
import { Camera, Frustum, Matrix4, Vector3 } from 'three';
import { WorldOriginCameraService } from './world-origin-camera.service';
import { ViewportDimensionService } from '../core/viewport/viewport-dimension.service';
import { ScreenCoordinate } from '../core/viewport/screen-coordinate';

/**
 * Provides methods to text/labels onscreen visibility.
 *
 */
@Injectable()
export class LabelsVisibilityManager {

  private halfWidth: number;

  private halfHeight: number;

  private readonly camera: Camera;

  private readonly frustum: Frustum;

  constructor(private dimensionService: ViewportDimensionService,
              cameraService: WorldOriginCameraService) {
    this.updateHalfDimensions();
    this.frustum = new Frustum();
    this.camera = cameraService.getCamera();
    this.subscribeViewportDimensionChangeEvent();
  }

  private subscribeViewportDimensionChangeEvent(): void {
    this.dimensionService.broadcastDimensionChanged$.subscribe(
      () => this.updateHalfDimensions()
    );
  }

  private updateHalfDimensions(): void {
    this.halfWidth = this.dimensionService.getWidth() / 2;
    this.halfHeight = this.dimensionService.getHeight() / 2;
  }

  /**
   * Hides all the labels existing for the specified layer.
   *
   * @param layer the layer name.
   * @param labelsDomRoot the DOM node containing labels.
   */
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

  /**
   * Shows olnly the labels that correspond to the objects of the specified layer currently
   * visible on the screen.
   *
   * @param layer the layer to show labels for.
   * @param labels the map of all available labels.
   * @param labelsDomRoot the DOM node containing labels.
   */
  public showVisibleLabels(layer: string, labels: Map<string, RenderableText>, labelsDomRoot: any): void {
    this.hideLabelsByLayer(layer, labelsDomRoot);
    this.camera.updateMatrix();
    this.camera.updateMatrixWorld(true);
    this.updateFrustum();
    labels.forEach(
      (renderable: RenderableText, code: string) => {
        if (!this.isPointBehind(renderable.position)) {
          const onScreenCoordinate = this.getOnscreenPosition(renderable.position);
          if (this.dimensionService.isInBounds(onScreenCoordinate)) {
            this.setLabelPositionAndShow(renderable, onScreenCoordinate);
          }
        }
      }
    );
  }

  private updateFrustum(): void {
    const matrix = new Matrix4().multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
    this.frustum.setFromMatrix(matrix);
  }

  private isPointBehind(point: Vector3): boolean {
    if (!point) {
      return true;
    }
    return !this.frustum.containsPoint(point);
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
