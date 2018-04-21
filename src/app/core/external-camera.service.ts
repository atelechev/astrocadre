import { Injectable } from '@angular/core';
import { AbstractCameraService } from './abstract-camera-service';
import { Camera, PerspectiveCamera, Math as ThreeMath } from 'three';
import { RendererService } from './renderer.service';
import { SceneService } from './scene.service';

@Injectable()
export class ExternalCameraService extends AbstractCameraService {

  private camera: Camera;

  constructor() {
    super();
    this.camera = new PerspectiveCamera(50, 1, 0.1, 1000); // TODO extract params?
    this.setUpCamera();
  }

  private setUpCamera() {
    const position = 3.5;
    this.camera.position.z = position;
    this.camera.position.x = position;
    this.camera.position.y = -position;
    this.camera.rotateX(ThreeMath.degToRad(40));
    this.camera.rotateY(ThreeMath.degToRad(35));
    this.camera.rotateZ(ThreeMath.degToRad(40));
  }

  public getCamera(): Camera {
    return this.camera;
  }

}
