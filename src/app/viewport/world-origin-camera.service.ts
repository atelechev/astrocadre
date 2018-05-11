import { Injectable } from '@angular/core';
import { AbstractCameraService } from './abstract-camera-service';
import { Camera, PerspectiveCamera, Math as ThreeMath, Vector3 } from 'three';
import { ViewportEventService } from './viewport-event.service';
import { AxialRotation } from '../core/axial-rotation';
import { SkyCoordinate } from '../core/sky-coordinate';
import { VectorUtil } from '../layers/geometry/vector-util';
import { Constants } from '../core/constants';

@Injectable()
export class WorldOriginCameraService extends AbstractCameraService {

  private camera: Camera;

  constructor(viewportService: ViewportEventService) {
    super(viewportService);
    this.camera = new PerspectiveCamera(this.fov, this.aspect, 0.1, 5); // TODO extract params?
    this.setUpCamera();
    this.subscribeAxialRotationEvent();
    this.subscribeFovChangeEvent();
    this.subscribeViewCenterChangeEvent();
  }

  private subscribeAxialRotationEvent(): void {
    this.viewportService.requestAxialRotation$.subscribe(
      (rotation: AxialRotation) => this.rotate(rotation)
    );
  }

  private subscribeFovChangeEvent(): void {
    this.viewportService.requestFov$.subscribe(
      (fov: number) => this.setFoV(fov)
    );
  }

  private subscribeViewCenterChangeEvent(): void {
    this.viewportService.requestCenterView$.subscribe(
      (coords: SkyCoordinate) => this.centerView(coords)
    );
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

  private getAlignmentPoleCoordinate(declination: number): Vector3 {
    if (declination < 0) {
      return Constants.SOUTH;
    }
    return Constants.NORTH;
  }

  private centerView(coords: SkyCoordinate): void {
    const camera = this.getCamera();
    camera.up = this.getAlignmentPoleCoordinate(coords.declination);
    camera.lookAt(VectorUtil.toVector3(coords.rightAscension, coords.declination, Constants.WORLD_RADIUS));
  }

  public rotate(rotation: AxialRotation): void {
    const camera = this.getCamera();
    camera.rotateX(rotation.rx);
    camera.rotateY(rotation.ry);
    camera.rotateZ(rotation.rz);
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
