import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Constants } from '../core/constants';
import { WorldOriginCameraService } from './world-origin-camera.service';
// import { ExternalCameraService } from './external-camera.service';
import { RendererService } from './renderer.service';
import { SceneService } from './scene.service';
import { Theme } from '../core/theme';
import { ThemeAware } from '../core/theme-aware';
import { Object3D, Math as ThreeMath, Camera, Points, Frustum, Matrix4, Vector3 } from 'three';
import { RenderableText } from '../core/renderable-text';

@Component({
  selector: `app-sky-view-viewport`,
  templateUrl: './viewport.component.html',
  styleUrls: [ './viewport.component.css' ],
  providers: [
    SceneService,
    WorldOriginCameraService,
    // ExternalCameraService,
    RendererService
  ]
})
export class ViewportComponent implements AfterViewInit, ThemeAware {

  @ViewChild('skyViewViewport')
  private skyViewViewport: ElementRef;

  private viewportWidth: string;

  private viewportHeight: string;

  private readonly halfWidth: number;

  private readonly halfHeight: number;

  constructor(private rendererService: RendererService,
              private sceneService: SceneService,
              private cameraService: WorldOriginCameraService) {
    this.viewportWidth = this.getViewportWidth() + 'px';
    this.viewportHeight = this.getViewportHeight() + 'px';
    this.halfWidth = this.getViewportWidth() / 2;
    this.halfHeight = this.getViewportHeight() / 2;
    this.cameraService.initCoordsMarkerObject();
  }

  private appendCanvas(): void {
    const canvas = this.rendererService.getDomElement();
    this.skyViewViewport.nativeElement.appendChild(canvas);
  }

  public ngAfterViewInit(): void {
    this.appendCanvas();
    this.rendererService.render(this.sceneService.getScene(), this.cameraService.getCamera());
    this.cameraService.initMouseListeners(this.rendererService, this.sceneService);
  }

  public useTheme(theme: Theme): void {
    this.sceneService.updateForTheme(theme);
  }

  public addObjects(objects: Object3D[]): void {
    this.sceneService.addObjects(objects);
  }

  public addTextElements(htmlElements: HTMLElement[]): void {
    const nativeWrapper = this.skyViewViewport.nativeElement;
    htmlElements.forEach(htmlElement => {
      nativeWrapper.appendChild(htmlElement);
    });
  }

  public getViewportWidth(): number {
    return Constants.VIEW_WIDTH;
  }

  public getViewportHeight(): number {
    return Constants.VIEW_HEIGHT;
  }

  private hideLabelsByLayer(layer: string): void {
    const labelClass = 'label_' + layer;
    const allChildren = <HTMLCollection> this.skyViewViewport.nativeElement.children;
    const length = allChildren.length;
    for (let i = 0; i < length; i++) {
      const child = <HTMLElement> allChildren.item(i);
      if (child && child.getAttribute('class') === labelClass) {
        child.style.display = 'none';
      }
    }
  }

  public showVisibleLabels(layer: string, labels: Map<string, RenderableText>): void {
    this.hideLabelsByLayer(layer);
    const camera = this.cameraService.getCamera();
    camera.updateMatrix();
    camera.updateMatrixWorld(true);
    labels.forEach(
      (renderable: RenderableText, code: string) => {
        const center = renderable.getWorldPosition();
        if (!this.isPointBehind(center, code)) {
          const onScreenPosition = this.getOnscreenPosition(center);
          if (this.isPointOnScreen(onScreenPosition)) {
            this.setLabelPositionAndShow(renderable.getHtmlElement(), onScreenPosition);
          }
        }
      }
    );
  }

  private isPointBehind(point: Points, code: string): boolean {
    const frustrum = new Frustum();
    const camera = this.cameraService.getCamera();
    frustrum.setFromMatrix(new Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
    const res1 = frustrum.containsPoint(point.position);
    return !frustrum.containsPoint(point.geometry.boundingSphere.center);
  }

  private getOnscreenPosition(point: Points): Vector3 {
    const onScreen = point.geometry.boundingSphere.center.clone();
    onScreen.project(this.cameraService.getCamera());
    onScreen.x = (onScreen.x * this.halfWidth) + this.halfWidth;
    onScreen.y = - (onScreen.y * this.halfHeight) + this.halfHeight;
    onScreen.z = 0;
    return onScreen;
  }

  private isPointOnScreen(position: Vector3): boolean {
    return position &&
           position.x >= 0 && position.y >= 0 &&
           position.x < this.getViewportWidth() &&
           position.y < this.getViewportHeight();
  }

  private setLabelPositionAndShow(label: HTMLElement, position: Vector3): void {
    label.style.top = Math.floor(position.y) + 'px';
    label.style.left = Math.floor(position.x) + 'px';
    label.style.display = 'initial';
  }

}
