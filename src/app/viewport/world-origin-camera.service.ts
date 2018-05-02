import { Injectable } from '@angular/core';
import { AbstractCameraService } from './abstract-camera-service';
import { Camera, PerspectiveCamera } from 'three';

@Injectable()
export class WorldOriginCameraService extends AbstractCameraService {

  private camera: Camera;

  constructor() {
    super();
    this.camera = new PerspectiveCamera(this.fov, this.aspect, 0.1, 5); // TODO extract params?
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
