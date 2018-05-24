import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Constants } from '../core/constants';
import { WorldOriginCameraService } from './world-origin-camera.service';
// import { ExternalCameraService } from './external-camera.service';
import { RendererService } from './renderer.service';
import { SceneService } from './scene.service';
import { Theme } from '../core/theme/theme';
import { ThemeAware } from '../core/theme/theme-aware';
import { Object3D, Math as ThreeMath, Camera, Frustum, Matrix4, Vector3, Sphere } from 'three';
import { RenderableText } from '../core/renderable-text';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
    const camera = this.cameraService.getCamera();
    camera.updateMatrix();
    camera.updateMatrixWorld(true);
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
    const camera = this.cameraService.getCamera();
    frustum.setFromMatrix(new Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
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

  private setLabelPositionAndShow(renderable: RenderableText, position: Vector3): void {
    const style = renderable.getHtmlElement().style;
    style.top = Math.floor(position.y - renderable.getHeightOffset()) + 'px';
    style.left = Math.floor(position.x - renderable.getWidthOffset()) + 'px';
    style.display = 'initial';
  }

}
