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

  protected rotate(rx: number, ry: number, rz: number): void {
    const camera = this.getCamera();
    camera.rotateX(rx);
    camera.rotateY(ry);
    camera.rotateZ(rz);
  }

  protected setFoV(range: number): void {
    const camera = <PerspectiveCamera> this.getCamera();
    camera.fov = parseInt('' + range, 10); // TODO weird
    camera.updateProjectionMatrix();
  }

  protected alignNSAxis(): void {
    const camera = this.getCamera();
    // TODO
    // console.log(`rx=${camera.rotation.x} ry=${camera.rotation.y} rz=${camera.rotation.z}`);
    // console.log(`dx=${ThreeMath.radToDeg(camera.rotation.x)}
    // dy=${ThreeMath.radToDeg(camera.rotation.y)} dz=${ThreeMath.radToDeg(camera.rotation.z})`);
    const delta = camera.rotation.z > 0 ? -camera.rotation.z : camera.rotation.z;
    // console.log('delta=' + delta);
    // camera.rotateZ(delta);
  }

}
