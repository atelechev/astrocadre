import { Injectable } from '@angular/core';
import { Object3D, PerspectiveCamera, Vector3 } from 'three';
import { Constants } from '#core/constants';
import { toVector3 } from '#core-layer/vector-utils';
import { ViewportEventService } from '#core-viewport/viewport-event.service';
import { ViewportDimensionService } from '#core-viewport/viewport-dimension.service';
import { AxialRotation } from '#core-viewport/axial-rotation';
import { SkyCoordinate } from '#core-viewport/sky-coordinate';

@Injectable()
export class WorldOriginCameraService {

  private readonly nearPlane = 0.1;

  private readonly farPlane = 5;

  private readonly initialFov = 30;

  private coordsMarkerObject: Object3D;

  private camera: PerspectiveCamera;

  constructor(private viewportService: ViewportEventService,
    private dimensionService: ViewportDimensionService) {
    this.camera = new PerspectiveCamera(this.initialFov,
      this.dimensionService.getAspect(),
      this.nearPlane,
      this.farPlane);
    this.coordsMarkerObject = this.initCoordsMarkerObject();
    this.setUpCamera();
    this.subscribeAxialRotationEvent();
    this.subscribeFovChangeEvent();
    this.subscribeViewCenterChangeEvent();
    this.subscribeAxisAlignmentEvent();
    this.subscribeViewportDimensionChangeEvent();
  }

  public getCamera(): PerspectiveCamera {
    return this.camera;
  }

  public centerView(coords: SkyCoordinate): void {
    this.camera.up = this.getAlignmentPoleCoordinate(coords.declination);
    this.camera.lookAt(toVector3(coords.rightAscension, coords.declination, Constants.WORLD_RADIUS));
    this.camera.updateMatrixWorld(true);
    this.viewportService.viewportChanged();
  }

  public rotate(rotation: AxialRotation): void {
    this.camera.rotateX(rotation.rx);
    this.camera.rotateY(rotation.ry);
    this.camera.rotateZ(rotation.rz);
    this.viewportService.viewportChanged();
  }

  public setFoV(range: number): void {
    this.camera.fov = range;
    this.camera.updateProjectionMatrix();
    this.viewportService.viewportChanged();
  }

  public alignNSAxis(): void {
    const viewCenter = this.getViewCenterCoordinates();
    this.camera.up = this.getAlignmentPoleCoordinate(viewCenter.z);
    this.camera.lookAt(viewCenter);
    this.viewportService.viewportChanged();
  }

  public getViewCenterCoordinates(): Vector3 {
    const viewCenter = new Vector3();
    this.coordsMarkerObject.updateMatrixWorld(true);
    viewCenter.setFromMatrixPosition(this.coordsMarkerObject.matrixWorld);
    return viewCenter;
  }

  private subscribeViewportDimensionChangeEvent(): void {
    this.dimensionService.broadcastDimensionChanged$.subscribe(
      () => {
        this.camera.aspect = this.dimensionService.getAspect();
        this.camera.updateProjectionMatrix();
      }
    );
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


  private getAlignmentPoleCoordinate(declination: number): Vector3 {
    if (declination < 0) {
      return Constants.SOUTH;
    }
    return Constants.NORTH;
  }

  private initCoordsMarkerObject(): Object3D {
    const marker = new Object3D();
    marker.position.set(0, 0, -(Constants.WORLD_RADIUS + 0.1));
    this.camera.add(marker);
    this.camera.updateMatrixWorld(true);
    return marker;
  }

}
