import { Injectable } from '@angular/core';

import { Scene as ThreeScene, Scene, Object3D, Vector3, Color } from 'three';
import { Camera, PerspectiveCamera, WebGLRenderer, Mesh, Math as ThreeMath, AxesHelper } from 'three';
import { Constants } from '../constants';
import { ThemesComponent } from '../themes/themes.component';
import { Theme } from '../themes/theme';

@Injectable()
export class SceneService {

  private scene: ThreeScene;

  constructor(private themes: ThemesComponent) {
    this.scene = new ThreeScene();
    this.scene.background = 
      this.themes.getActiveTheme().getBackgroundColor(); // TODO make it updatable on dynamic theme change
    this.showAxesIfDevMode();
  }

  private showAxesIfDevMode(): void {
    if (this.themes.getActiveTheme().getName() === 'dev') {
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

}
