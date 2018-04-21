import { Injectable } from '@angular/core';

import { Scene as ThreeScene, Scene, Object3D, Vector3 } from 'three';
import { Camera, PerspectiveCamera, WebGLRenderer, Mesh, Math as ThreeMath, AxesHelper } from 'three';
import { Constants } from '../constants';


@Injectable()
export class SceneService {

  private scene: ThreeScene;

  constructor() {
    this.scene = new ThreeScene();
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

  public showAxes(): void {
    const axesHelper = new AxesHelper(3);
    this.addObject(axesHelper);
    console.warn('Axes helper shown: dev mode.');
  }

}
