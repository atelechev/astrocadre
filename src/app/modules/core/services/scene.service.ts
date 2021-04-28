import { Injectable } from '@angular/core';
import {
  Camera,
  Object3D,
  Scene,
  Vector3,
  WebGLRenderer
} from 'three';
import { Color } from 'three';
import { Dimension } from '#core/models/screen/dimension';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { RenderableText } from '#core/models/layers/renderable-text';
import { ScreenCoordinate } from '#core/models/screen/screen-coordinate';
import { Theme } from '#core/models/theme/theme';
import { CameraService } from '#core/services/camera.service';
import { ViewportService } from '#core/services/viewport.service';
import { ThemeService } from '#core/services/theme.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { ViewportEvent } from '#core/models/event/viewport-event';
import { ViewportSizeChangeEvent } from '#core/models/event/viewport-size-change-event';
import { ThemeEvent } from '#core/models/event/theme-event';
import { LayerEvent } from '#core/models/event/layer-event';
import { LayerShownEvent } from '#core/models/event/layer-shown-event';
import { LayerHiddenEvent } from '#core/models/event/layer-hidden-event';
import { TextsShownEvent } from '#core/models/event/texts-shown-event';
import { TextsHiddenEvent } from '#core/models/event/texts-hidden-event';
import { LayerService } from '#core/services/layer.service';

/**
 * Manages the current scene.
 */
@Injectable({ providedIn: 'root' })
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
    private readonly _layerService: LayerService,
    private readonly _textsVisibilityManager: TextsVisibilityManagerService
  ) {
    this._allObjects = new Set<Object3D>();
    this._allTextElements = new Set<RenderableText>();
    this._viewportRootElement = undefined;
    this._scene = new Scene();
    this._renderer = new WebGLRenderer();
    this.subscribeViewportEvents();
    this.subscribeThemeEvents();
    this.subscribeLayerEvents();
  }

  /**
   * Returns the number of objects expected to be shown in the scene.
   */
  public get allObjectsCount(): number {
    return this._allObjects.size;
  }

  /**
   * Returns the number of objects shown in the scene.
   */
  public get shownObjectsCount(): number {
    return this._scene.children.length;
  }

  /**
   * Returns the number of text objects shown in the scene.
   */
  public get allTextsCount(): number {
    return this._allTextElements.size;
  }

  /**
   * Sets the viewport root element to the specified div.
   *
   * The viewport root is a HTML object which holds the 3D canvas.
   *
   * @param viewportRoot the root reference to set.
   */
  public setViewportRootElement(viewportRoot: HTMLDivElement) {
    this._viewportRootElement = viewportRoot;
    if (this._viewportRootElement) {
      const canvas = this._renderer.domElement;
      this._viewportRootElement.appendChild(canvas);
    }
  }

  /**
   * Starts the rendering in the underlying canvas.
   */
  public render(): void {
    this._renderer.render(this._scene, this.camera);
  }

  private showTexts(layer: RenderableLayer): void {
    this.addTextElements(layer?.texts);
    this.showVisibleLabels();
  }

  private hideTexts(layer: RenderableLayer): void {
    this.removeTextElements(layer?.texts);
    this.showVisibleLabels();
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

  private subscribeViewportEvents(): void {
    this._viewportService.events
      .subscribe(
        (event: ViewportEvent<any>) => {
          const useSize = event.key === ViewportSizeChangeEvent.KEY ?
            (event as ViewportSizeChangeEvent).data : this._viewportService.size;
          this.processViewportSizeChange(useSize);
        }
      );
  }

  private processViewportSizeChange(size: Dimension): void {
    this.updateCanvasSize(size);
    this._halfWidth = size.width / 2;
    this._halfHeight = size.height / 2;
    this.showVisibleLabels();
  }

  private updateCanvasSize(size: Dimension): void {
    if (size) {
      this._renderer.setSize(size.width, size.height);
    }
  }

  private subscribeThemeEvents(): void {
    this._themeService.events
      .subscribe(
        (event: ThemeEvent<any>) => this.updateSceneBackGround(event.data)
      );
  }

  private subscribeLayerEvents(): void {
    this._layerService.events
      .subscribe(
        (event: LayerEvent<any>) => this.processLayerEvent(event)
      );
    this._textsVisibilityManager.events
      .subscribe(
        (event: LayerEvent<any>) => this.processLayerEvent(event)
      );
  }

  private processLayerEvent(event: LayerEvent<any>): void {
    switch (event.key) {
      case LayerShownEvent.KEY:
        this.showLayer(event.data);
        break;
      case LayerHiddenEvent.KEY:
        this.hideLayer(event.data);
        break;
      case TextsShownEvent.KEY:
        this.showTexts(event.data);
        break;
      case TextsHiddenEvent.KEY:
        this.hideTexts(event.data);
        break;
      default: /* do nothing */
    }
  }

  private showLayer(layer: RenderableLayer): void {
    if (layer) {
      this.addObjects(layer.objects);
      this.showTexts(layer);
    }
  }

  private hideLayer(layer: RenderableLayer): void {
    if (layer) {
      this.removeObjects(layer.objects);
      this.hideTexts(layer);
    }
  }

  private updateSceneBackGround(theme: Theme): void {
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
