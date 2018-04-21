import { Injectable } from '@angular/core';
import { WebGLRenderer, Scene, Camera } from 'three';
import { Constants } from '../constants';

@Injectable()
export class RendererService {

  private renderer: WebGLRenderer;

  constructor() {
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(Constants.VIEW_WIDTH, Constants.VIEW_HEIGHT);
  }

  public getDomElement(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  public render(scene: Scene, camera: Camera): void {
    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(scene, camera);
    };
    animate();
  }

}
