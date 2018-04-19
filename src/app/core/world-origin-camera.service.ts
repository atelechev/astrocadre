import { Injectable } from '@angular/core';
import { AbstractCameraService } from './abstract-camera-service';
import { Camera, PerspectiveCamera, Math as ThreeMath } from 'three';
import { RendererService } from './renderer.service';
import { SceneService } from './scene.service';

@Injectable()
export class WorldOriginCameraService extends AbstractCameraService {

  private camera: Camera;

  constructor() {
    super();
    this.camera = new PerspectiveCamera(50, 1, 0.1, 1000); // TODO extract params?
    this.setUpCamera();
  }

  private setUpCamera() {
    const origin = 0;
    this.camera.position.z = origin;
    this.camera.position.x = origin;
    this.camera.position.y = origin;
  }

  public getCamera(): Camera {
    return this.camera;
  }

}
