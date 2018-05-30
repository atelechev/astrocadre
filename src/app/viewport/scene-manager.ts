import { Injectable } from '@angular/core';
import { Scene, Object3D, AxesHelper, WebGLRenderer, Camera } from 'three';
import { Theme } from '../core/theme/theme';
import { ViewportDimensionService } from './viewport-dimension.service';
import { WorldOriginCameraService } from './world-origin-camera.service';

/**
 * Provides methods to handle actions related with Three's Scene object and rendering.
 */
@Injectable()
export class SceneManager {

  private scene: Scene;

  private renderer: WebGLRenderer;

  constructor(dimensionService: ViewportDimensionService,
              private cameraService: WorldOriginCameraService) {
    this.scene = new Scene();
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(dimensionService.getWidth(),
                          dimensionService.getHeight());
  }

  private addObject(object: Object3D): void {
    if (!this.isObjectShown(object)) {
      this.scene.add(object);
    }
  }

  /**
   * Adds the specified objects to the underlying Scene.
   * Does not add undefined or already added objects.
   *
   * @param objects the array of objects to add.
   */
  public addObjects(objects: Object3D[]): void {
    objects.forEach(object => this.addObject(object));
  }

  private removeObject(object: Object3D): void {
    for (let i = 0; i < this.scene.children.length; i++) {
      if (object === this.scene.children[i]) {
        this.scene.remove(object);
        return;
      }
    }
  }

  /**
   * Removes the specified objects from the underlying Scene.
   *
   * @param objects the objects to remove.
   */
  public removeObjects(objects: Object3D[]): void {
    objects.forEach(object => this.removeObject(object));
  }

  private isObjectShown(object: Object3D): boolean {
    for (let i = 0; i < this.scene.children.length; i++) {
      if (object === this.scene.children[i]) {
        return true;
      }
    }
    return false;
  }

  /**
   * Updates the Scene with respective theme configuration.
   *
   * @param theme the Theme to apply.
   */
  public updateForTheme(theme: Theme): void {
    this.scene.background = theme.getBackgroundColor();
  }

  /**
   * Returns the underlying Scene instance.
   */
  public getScene(): Scene {
    return this.scene;
  }

  /**
   * Returns the DOM element of the Canvas used for rendering.
   */
  public getDomElement(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  /**
   * Triggers the rendering of the underlying Scene.
   */
  public render(): void {
    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.cameraService.getCamera());
    };
    animate();
  }

}
