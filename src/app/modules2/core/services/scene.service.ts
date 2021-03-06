import { Injectable } from '@angular/core';
import { Dimension } from 'src/app/modules2/core/models/dimension';
import { Theme } from 'src/app/modules2/core/models/theme';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { Object3D, Scene, WebGLRenderer } from 'three';
import { Color } from 'three';

@Injectable()
export class SceneService {

  private readonly _scene: Scene;

  private readonly _renderer: WebGLRenderer;

  constructor(
    private readonly _eventsService: EventsService
  ) {
    this._scene = new Scene();
    this._renderer = new WebGLRenderer();
    this.subscribeViewportSizeChange();
    this.subscribeThemeLoaded();
  }

  /**
   * Returns the underlying Scene instance.
   */
  public get scene(): Scene {
    return this._scene;
  }

  /**
   * Returns the DOM element of the Canvas used for rendering.
   */
  public get domElement(): HTMLCanvasElement {
    return this._renderer.domElement;
  }

  /**
   * Adds the specified objects to the underlying Scene.
   * Does not add undefined or already added objects.
   *
   * @param objects the array of objects to add.
   */
  public addObjects(objects: Object3D[]): void {
    objects?.forEach(object => this.addObject(object));
  }

  /**
   * Removes the specified objects from the underlying Scene.
   *
   * @param objects the objects to remove.
   */
  public removeObjects(objects: Object3D[]): void {
    objects.forEach(object => this.removeObject(object));
  }

  /**
   * Triggers the rendering of the underlying Scene.
   */
  public render(): void {
    // TODO
    // const animate = () => {
    //   requestAnimationFrame(animate);
    //   this._renderer.render(this.scene, this.cameraService.getCamera());
    // };
    // animate();
  }

  private addObject(object: Object3D): void {
    if (!this.existsObject(object)) {
      this._scene.add(object);
    }
  }

  private removeObject(object: Object3D): void {
    if (this.existsObject(object)) {
      this._scene.remove(object);
    }
  }

  private existsObject(object: Object3D): boolean {
    const foundObject = this._scene.children.find((obj: Object3D) => object === obj);
    return !!foundObject;
  }

  private subscribeViewportSizeChange(): void {
    this._eventsService
      .viewportSizeChanged
      .subscribe(
        (size: Dimension) => this.updateCanvasSize(size)
      );
  }

  private updateCanvasSize(size: Dimension): void {
    if (size) {
      this._renderer.setSize(size.width, size.height);
    }
  }

  private subscribeThemeLoaded(): void {
    this._eventsService
      .themeLoaded
      .subscribe(
        (theme: Theme) => this.updateSceneBackground(theme)
      );
  }

  private updateSceneBackground(theme: Theme): void {
    if (theme) {
      this._scene.background = new Color(theme.background.color);
    }
  }

}
