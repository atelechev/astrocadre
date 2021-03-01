import { Injectable } from '@angular/core';
import { Object3D, Scene, WebGLRenderer } from 'three';
import { Theme } from '#core/models/theme';
import { ViewportDimensionService } from '#core/services/viewport-dimension.service';
import { WorldOriginCameraService } from '#viewport/services/world-origin-camera.service';

/**
 * Provides methods to handle actions related with Three's Scene object and rendering.
 */
@Injectable()
export class SceneManager {

  private scene: Scene;

  private renderer: WebGLRenderer;

  constructor(private dimensionService: ViewportDimensionService,
    private cameraService: WorldOriginCameraService) {
    this.scene = new Scene();
    this.renderer = new WebGLRenderer();
    this.updateCanvasSize();
    this.subscribeViewportDimensionChangeEvent();
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

  /**
   * Removes the specified objects from the underlying Scene.
   *
   * @param objects the objects to remove.
   */
  public removeObjects(objects: Object3D[]): void {
    objects.forEach(object => this.removeObject(object));
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

  private removeObject(object: Object3D): void {
    const foundObject = this.scene.children.find((obj: Object3D) => object === obj);
    if (foundObject) {
      this.scene.remove(foundObject);
    }
  }

  private subscribeViewportDimensionChangeEvent(): void {
    this.dimensionService.broadcastDimensionChanged$.subscribe(
      () => this.updateCanvasSize()
    );
  }

  private updateCanvasSize(): void {
    this.renderer.setSize(this.dimensionService.getWidth(),
      this.dimensionService.getHeight());
  }

  private addObject(object: Object3D): void {
    if (!this.isObjectShown(object)) {
      this.scene.add(object);
    }
  }

  private isObjectShown(object: Object3D): boolean {
    const foundObject = this.scene.children.find((obj: Object3D) => object === obj);
    return !!foundObject;
  }

}
