import { Injectable } from '@angular/core';
import { Scene, Object3D, AxesHelper, WebGLRenderer, Camera } from 'three';
import { Theme } from '../core/theme/theme';
import { ViewportDimensionService } from './viewport-dimension.service';

@Injectable()
export class SceneManager {

  private scene: Scene;

  private renderer: WebGLRenderer;

  constructor(dimensionService: ViewportDimensionService) {
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

  public updateForTheme(theme: Theme): void {
    this.scene.background = theme.getBackgroundColor();
  }

  public getScene(): Scene {
    return this.scene;
  }

  public getDomElement(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  public render(camera: Camera): void {
    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, camera);
    };
    animate();
  }

}
