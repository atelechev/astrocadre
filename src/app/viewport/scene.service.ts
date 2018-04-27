import { Injectable } from '@angular/core';

import { Scene, Object3D } from 'three';
import { Theme } from '../core/theme';

@Injectable()
export class SceneService {

  private scene: Scene;

  constructor() {
    this.scene = new Scene();
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

}
