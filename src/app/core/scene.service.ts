import { Injectable } from '@angular/core';

import { Scene as ThreeScene, Scene, Object3D } from 'three';
import { AxesHelper } from 'three';
import { Theme } from '../themes/theme';
import { Themes } from '../themes/themes';

@Injectable()
export class SceneService {

  private scene: ThreeScene;

  private layers: Map<string, Object3D[]>;

  constructor() {
    this.scene = new ThreeScene();
    this.layers = new Map<string, Object3D[]>();
  }

  private showAxesIfDevMode(theme: Theme): void {
    if (theme.getName() === Themes.DEV) {
      const axesHelper = new AxesHelper(3);
      this.addLayer('axes-helper', [ axesHelper ]);
      console.warn('Axes helper shown: dev mode.');
    }
  }

  private addObject(object: Object3D): void {
    this.scene.add(object);
  }

  public addLayer(code: string, objects: Object3D[]): void {
    this.layers.set(code, objects);
  }

  public showLayer(code: string, visible: boolean): void {
    if (visible) {
      this.addLayerToScene(code);
    } else {
      this.removeLayerFromScene(code);
    }
  }

  private addLayerToScene(code: string): void {
    const objects = this.getObjectsForLayer(code);
    objects.forEach(object => {
      if (!this.isObjectShown(object)) {
        this.addObject(object);
      }
    });
  }

  private getObjectsForLayer(code: string): Object3D[] {
    const objects = this.layers.get(code);
    if (!objects) {
      console.warn(`Invalid layer code '${code}', can't show this layer.`);
      return [];
    }
    return objects;
  }

  private isObjectShown(object: Object3D): boolean {
    for (let i = 0; i < this.scene.children.length; i++) {
      if (object === this.scene.children[i]) {
        return true;
      }
    }
    return false;
  }

  private removeLayerFromScene(code: string): void {
    const objects = this.getObjectsForLayer(code);
    objects.forEach(object => {
      if (this.isObjectShown(object)) {
        this.scene.remove(object);
      }
    });
  }

  public getScene(): Scene {
    return this.scene;
  }

  public clearScene(): void {
    while (this.scene.children.length) {
      this.scene.remove(this.scene.children[0]);
    }
  }

  public updateForTheme(theme: Theme): void {
    this.showAxesIfDevMode(theme);
    this.scene.background = theme.getBackgroundColor();
  }

}
