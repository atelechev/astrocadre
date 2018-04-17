import { Injectable } from '@angular/core';

import { Scene as ThreeScene, Scene } from 'three';
import { Camera, PerspectiveCamera, WebGLRenderer, Mesh } from 'three';
import { Constants } from '../constants';

@Injectable()
export class SceneService {

  private scene: ThreeScene;

  private camera: Camera;

  private renderer: WebGLRenderer;

  constructor() {
    this.scene = new ThreeScene();
    this.camera = new PerspectiveCamera(50, 1, 0.1, 1000); // TODO extract params
    this.camera.position.z = 5;
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(Constants.VIEW_WIDTH, Constants.VIEW_HEIGHT);
  }

  public getDomElement(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  public addMesh(mesh: Mesh): void {
    this.scene.add(mesh);
  }

  public render(): void {
    const ren = this.renderer;
    const sc = this.scene;
    const cam = this.camera;
    const animate = function() {
      requestAnimationFrame(animate);
      const cube = sc.children[0];
      cube.rotation.x += 0.015;
      cube.rotation.y += 0.005;
      cube.rotation.z += 0.0025;
      ren.render(sc, cam);
    };
    animate();
  }

}
