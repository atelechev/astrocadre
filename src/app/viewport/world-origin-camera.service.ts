import { Injectable } from '@angular/core';
import { Object3D, Camera, PerspectiveCamera, Vector3 } from 'three';
import { ViewportEventService } from '../core/viewport/viewport-event.service';
import { AxialRotation } from '../core/viewport/axial-rotation';
import { SkyCoordinate } from '../core/viewport/sky-coordinate';
import { VectorUtil } from '../layers/geometry/vector-util';
import { Constants } from '../core/constants';

@Injectable()
export class WorldOriginCameraService {

  protected fov = 30;

  protected aspect = 1;

  protected coordsMarkerObject: Object3D;

  private camera: PerspectiveCamera;

  constructor(private viewportService: ViewportEventService) {
    this.camera = new PerspectiveCamera(this.fov, this.aspect, 0.1, 5); // TODO extract params?
    this.setUpCamera();
    this.subscribeAxialRotationEvent();
    this.subscribeFovChangeEvent();
    this.subscribeViewCenterChangeEvent();
    this.subscribeAxisAlignmentEvent();
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

  private subscribeAxisAlignmentEvent(): void {
    this.viewportService.requestAxisAlignment$.subscribe(
      () => this.alignNSAxis()
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
    this.camera.up = this.getAlignmentPoleCoordinate(coords.declination);
    this.camera.lookAt(VectorUtil.toVector3(coords.rightAscension, coords.declination, Constants.WORLD_RADIUS));
    this.viewportService.viewportChanged();
  }

  public rotate(rotation: AxialRotation): void {
    this.camera.rotateX(rotation.rx);
    this.camera.rotateY(rotation.ry);
    this.camera.rotateZ(rotation.rz);
    this.viewportService.viewportChanged();
  }

  protected setFoV(range: number): void {
    this.camera.fov = range;
    this.camera.updateProjectionMatrix();
    this.viewportService.viewportChanged();
  }

  protected alignNSAxis(): void {
    const viewCenter = this.getViewCenterCoordinates();
    this.camera.up = this.getAlignmentPoleCoordinate(viewCenter.z);
    this.camera.lookAt(viewCenter);
    this.viewportService.viewportChanged();
  }

  public initCoordsMarkerObject(): void {
    this.coordsMarkerObject = new Object3D();
    this.coordsMarkerObject.position.set(0, 0, -(Constants.WORLD_RADIUS + 0.1));
    this.camera.add(this.coordsMarkerObject);
    this.camera.updateMatrixWorld(true);
  }

  public getViewCenterCoordinates(): Vector3 {
    const viewCenter = new Vector3();
    viewCenter.setFromMatrixPosition(this.coordsMarkerObject.matrixWorld);
    return viewCenter;
  }

}
