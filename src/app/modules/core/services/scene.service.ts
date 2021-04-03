import { Injectable } from '@angular/core';
import {
  Camera,
  Object3D,
  Scene,
  Vector3,
  WebGLRenderer
  } from 'three';
import { Color } from 'three';
import { Dimension } from '#core/models/dimension';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { RenderableText } from '#core/models/layers/renderable-text';
import { ScreenCoordinate } from '#core/models/screen-coordinate';
import { Theme } from '#core/models/theme';
import { CameraService } from '#core/services/camera.service';
import { ViewportService } from '#core/services/viewport.service';
import { ThemeService } from '#core/services/theme.service';
import { LayerService } from '#core/services/layer.service';

@Injectable()
export class SceneService {

  private readonly _scene: Scene;

  private readonly _renderer: WebGLRenderer;

  private _viewportRootElement: HTMLDivElement;

  private readonly _allObjects: Set<Object3D>;

  private readonly _allTextElements: Set<RenderableText>;

  private _halfWidth: number;

  private _halfHeight: number;

  constructor(
    private readonly _cameraService: CameraService,
    private readonly _viewportService: ViewportService,
    private readonly _themeService: ThemeService,
    private readonly _layerService: LayerService
  ) {
    this._allObjects = new Set<Object3D>();
    this._allTextElements = new Set<RenderableText>();
    this._viewportRootElement = undefined;
    this._scene = new Scene();
    this._renderer = new WebGLRenderer();
    this.subscribeViewportChanged();
    this.subscribeThemeChanged();
    this.subscribeLayerShown();
    this.subscribeLayerHidden();
    this.subscribeTextsShown();
    this.subscribeTextsHidden();
  }

  public get allObjectsCount(): number {
    return this._allObjects.size;
  }

  public get shownObjectsCount(): number {
    return this._scene.children.length;
  }

  public get allTextsCount(): number {
    return this._allTextElements.size;
  }

  public setViewportRootElement(viewportRoot: HTMLDivElement) {
    this._viewportRootElement = viewportRoot;
    if (this._viewportRootElement) {
      const canvas = this._renderer.domElement;
      this._viewportRootElement.appendChild(canvas);
    }
  }

  public render(): void {
    this._renderer.render(this._scene, this.camera);
  }

  private subscribeTextsShown(): void {
    this._layerService.textsShown
      .subscribe(
        (texts: Array<RenderableText>) => this.showTexts(texts)
      );
  }

  private subscribeTextsHidden(): void {
    this._layerService.textsHidden
      .subscribe(
        (texts: Array<RenderableText>) => this.hideTexts(texts)
      );
  }

  private showTexts(texts: Array<RenderableText>): void {
    if (texts) {
      this.addTextElements(texts);
      this.showVisibleLabels();
    }
  }

  private hideTexts(texts: Array<RenderableText>): void {
    if (texts) {
      this.removeTextElements(texts);
      this.showVisibleLabels();
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

  private subscribeViewportChanged(): void {
    this._viewportService
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

  private subscribeThemeChanged(): void {
    this._themeService
      .themeChanged
      .subscribe(
        (theme: Theme) => this.updateSceneBackground(theme)
      );
  }

  private subscribeLayerShown(): void {
    this._layerService
      .layerShown
      .subscribe(
        (layer: RenderableLayer) => {
          this.addObjects(layer?.objects);
          this.showTexts(layer?.texts);
        }
      );
  }

  private subscribeLayerHidden(): void {
    this._layerService
      .layerHidden
      .subscribe(
        (layer: RenderableLayer) => {
          this.removeObjects(layer?.objects);
          this.hideTexts(layer?.texts);
        }
      );
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
    this._cameraService.updateFrustum();
    this._allTextElements
      .forEach(
        (text: RenderableText) => {
          if (!this._cameraService.isPointBehind(text.position)) {
            const onScreenCoordinate = this.getOnscreenPosition(text.position);
            if (this._viewportService.isInBounds(onScreenCoordinate)) {
              this.setTextPositionAndShow(text, onScreenCoordinate);
            }
          }
        }
      );
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

}
