import { Injectable } from '@angular/core';
import { Dimension } from 'src/app/modules2/core/models/dimension';
import { RenderableLayer } from 'src/app/modules2/core/models/layers/renderable-layer';
import { RenderableText } from 'src/app/modules2/core/models/layers/renderable-text';
import { ScreenCoordinate } from 'src/app/modules2/core/models/screen-coordinate';
import { Theme } from 'src/app/modules2/core/models/theme';
import { CameraService } from 'src/app/modules2/core/services/camera.service';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { ViewportService } from 'src/app/modules2/core/services/viewport.service';
import {
  Camera,
  Frustum,
  Matrix4,
  Object3D,
  Scene,
  Vector3,
  WebGLRenderer
  } from 'three';
import { Color } from 'three';

@Injectable()
export class SceneService {

  private readonly _scene: Scene;

  private readonly _frustum: Frustum;

  private readonly _renderer: WebGLRenderer;

  private _viewportRootElement: HTMLDivElement;

  private readonly _allObjects: Set<Object3D>;

  private readonly _allTextElements: Set<RenderableText>;

  private _halfWidth: number;

  private _halfHeight: number;

  constructor(
    private readonly _eventsService: EventsService,
    private readonly _cameraService: CameraService,
    private readonly _viewportService: ViewportService
  ) {
    this._frustum = new Frustum();
    this._allObjects = new Set<Object3D>();
    this._allTextElements = new Set<RenderableText>();
    this._viewportRootElement = undefined;
    this._scene = new Scene();
    this._renderer = new WebGLRenderer();
    this.subscribeViewportChange();
    this.subscribeThemeLoaded();
    this.subscribeLayerShown();
    this.subscribeTextsShown();
    this.subscribeLayerHidden();
    this.subscribeTextsHidden();
  }

  public set viewportRootElement(viewportRoot: HTMLDivElement) {
    this._viewportRootElement = viewportRoot;
    if (this._viewportRootElement) {
      const canvas = this._renderer.domElement;
      this._viewportRootElement.appendChild(canvas);
      this.render();
    }
  }

  private addObjects(objects: Object3D[]): void {
    objects?.forEach(object => this.addObject(object));
  }

  private addObject(object: Object3D): void {
    if (!this.existsObject(object)) {
      this._scene.add(object);
      this._allObjects.add(object);
    }
  }

  private removeObjects(objects: Object3D[]): void {
    objects?.forEach(object => this.removeObject(object));
  }

  private removeObject(object: Object3D): void {
    if (this.existsObject(object)) {
      this._scene.remove(object);
      this._allObjects.delete(object);
    }
  }

  private existsObject(object: Object3D): boolean {
    return !!object && this._allObjects.has(object);
  }

  private addTextElements(texts: Array<RenderableText>): void {
    if (!this._viewportRootElement) {
      return;
    }
    texts?.forEach((text: RenderableText) => this.addTextElement(text));
  }

  private addTextElement(text: RenderableText): void {
    if (!this.existsTextElement(text)) {
      this._viewportRootElement.appendChild(text.htmlElement);
      this._allTextElements.add(text);
    }
  }

  private removeTextElements(texts: Array<RenderableText>): void {
    if (!this._viewportRootElement) {
      return;
    }
    texts?.forEach(
      (elt: RenderableText) => this.removeTextElement(elt)
    );
  }

  private removeTextElement(text: RenderableText): void {
    if (this.existsTextElement(text)) {
      this._viewportRootElement.removeChild(text.htmlElement);
      this._allTextElements.delete(text);
    }
  }

  private existsTextElement(text: RenderableText): boolean {
    return !!text && this._allTextElements.has(text);
  }

  private render(): void {
    const animate = () => {
      requestAnimationFrame(animate);
      this._renderer.render(this._scene, this._cameraService.camera);
    };
    animate();
  }

  private subscribeViewportChange(): void {
    this._eventsService
      .viewportChanged
      .subscribe(
        (size: Dimension) => {
          const useSize = size || this._viewportService.size;
          this.updateCanvasSize(useSize);
          this._halfWidth = useSize.width / 2;
          this._halfHeight = useSize.height / 2;
          this.showVisibleLabels();
        }
      );
  }

  private updateCanvasSize(size: Dimension): void {
    if (size) {
      this._renderer.setSize(size.width, size.height);
    }
  }

  private subscribeThemeLoaded(): void {
    this._eventsService
      .themeChanged
      .subscribe(
        (theme: Theme) => this.updateSceneBackground(theme)
      );
  }

  private subscribeLayerShown(): void {
    this._eventsService
      .layerShown
      .subscribe(
        (layer: RenderableLayer) => {
          this.addObjects(layer?.objects);
          this.showTexts(layer?.texts);
        }
      );
  }

  private subscribeTextsShown(): void {
    this._eventsService
      .textsShown
      .subscribe(
        (layer: RenderableLayer) => {
          this.showTexts(layer?.texts);
        }
      );
  }

  private showTexts(texts: Array<RenderableText>): void {
    if (texts) {
      this.addTextElements(texts);
      this.showVisibleLabels();
    }
  }

  private subscribeLayerHidden(): void {
    this._eventsService
      .layerHidden
      .subscribe(
        (layer: RenderableLayer) => {
          this.removeObjects(layer?.objects);
          this.hideTexts(layer?.texts);
        }
      );
  }

  private subscribeTextsHidden(): void {
    this._eventsService
      .textsHidden
      .subscribe(
        (layer: RenderableLayer) => {
          this.hideTexts(layer?.texts);
        }
      );
  }

  private hideTexts(texts: Array<RenderableText>): void {
    if (texts) {
      this.removeTextElements(texts);
      this.showVisibleLabels();
    }
  }

  private updateSceneBackground(theme: Theme): void {
    if (theme) {
      this._scene.background = new Color(theme.background.color);
    }
  }

  private hideAllLabels(): void {
    this._allTextElements
      .forEach(
        (text: RenderableText) => {
          const style = text.htmlElement.style;
          style.display = 'none';
          style.top = '';
          style.left = '';
        }
      );
  }

  private get camera(): Camera {
    return this._cameraService.camera;
  }

  private showVisibleLabels(): void {
    this.hideAllLabels();
    this.camera.updateMatrix();
    this.camera.updateMatrixWorld(true);
    this.updateFrustum();
    this._allTextElements
      .forEach(
        (text: RenderableText) => {
          if (!this.isPointBehind(text.position)) {
            const onScreenCoordinate = this.getOnscreenPosition(text.position);
            if (this._viewportService.isInBounds(onScreenCoordinate)) {
              this.setTextPositionAndShow(text, onScreenCoordinate);
            }
          }
        }
      );
  }

  private isPointBehind(point: Vector3): boolean {
    if (!point) {
      return true;
    }
    return !this._frustum.containsPoint(point);
  }

  private getOnscreenPosition(point: Vector3): ScreenCoordinate {
    const onScreen = point.clone();
    onScreen.project(this.camera);
    const scrX = (onScreen.x * this._halfWidth) + this._halfWidth;
    const scrY = -(onScreen.y * this._halfHeight) + this._halfHeight;
    return { x: scrX, y: scrY };
  }

  private setTextPositionAndShow(renderable: RenderableText, onScreen: ScreenCoordinate): void {
    const style = renderable.htmlElement.style;
    style.top = Math.floor(onScreen.y + renderable.offsetY) + 'px';
    style.left = Math.floor(onScreen.x + renderable.offsetX) + 'px';
    style.display = 'initial';
  }

  private updateFrustum(): void {
    const matrix = new Matrix4().multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
    this._frustum.setFromProjectionMatrix(matrix);
  }

}
