import { Injectable } from '@angular/core';
import { AbstractCameraService } from './abstract-camera-service';
import { Camera, PerspectiveCamera, Math as ThreeMath } from 'three';
import { ViewportService } from './viewport.service';

@Injectable()
export class ExternalCameraService extends AbstractCameraService {

  private camera: Camera;

  constructor(viewportService: ViewportService) {
    super(viewportService);
    this.camera = new PerspectiveCamera(50, 1, 0.1, 1000); // TODO extract params?
    this.setUpCamera();
  }

  private setUpCamera() {
    const position = 3.5;
    this.camera.position.z = position;
    this.camera.position.x = position + 2.5;
    this.camera.position.y = position - 2.5;
    this.camera.rotation.x = ThreeMath.degToRad(-15);
    this.camera.rotation.y = ThreeMath.degToRad(55);
    this.camera.rotation.z = ThreeMath.degToRad(102.5);
  }

  public getCamera(): Camera {
    return this.camera;
  }

  protected rotate(rx: number, ry: number, rz: number): void {
    // throw new Error('Unsupported!');
  }

  protected setFoV(range: number): void {
    // throw new Error('Unsupported!');
  }

  protected alignNSAxis(): void {
    // throw new Error('Unsupported!');
  }

}
