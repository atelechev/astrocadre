import { Injectable } from '@angular/core';

import { Scene as ThreeScene, Scene, Object3D } from 'three';
import { AxesHelper } from 'three';
import { Theme } from '../themes/theme';
import { Themes } from '../themes/themes';

@Injectable()
export class SceneService {

  private scene: ThreeScene;

  constructor() {
    this.scene = new ThreeScene();
  }

  private showAxesIfDevMode(theme: Theme): void {
    if (theme.getName() === Themes.DEV) {
      const axesHelper = new AxesHelper(3);
      this.addObject(axesHelper);
      console.warn('Axes helper shown: dev mode.');
    }
  }

  public addObject(object: Object3D): void {
    this.scene.add(object);
  }

  public addObjects(objects: Object3D[]): void {
    objects.forEach(obj => this.addObject(obj));
  }

  public getScene(): Scene {
    return this.scene;
  }

  public updateForTheme(theme: Theme): void {
    this.showAxesIfDevMode(theme);
    this.scene.background = theme.getBackgroundColor();
  }

}
