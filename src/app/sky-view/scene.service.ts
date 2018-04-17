import { Injectable } from '@angular/core';

import { Scene as ThreeScene, Scene } from 'three';
import { Camera, PerspectiveCamera, WebGLRenderer, Mesh } from 'three';
import { Constants } from '../constants';
import { RenderableShape } from '../renderable-shape';

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

  public addMesh(mesh: RenderableShape): void {
    this.scene.add(mesh.getMesh());
  }

  public render(): void {
    const animate = () => {
      requestAnimationFrame(animate);
      const cube = this.scene.children[0];
      cube.rotation.x += 0.015;
      cube.rotation.y += 0.005;
      cube.rotation.z += 0.0025;
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

}
