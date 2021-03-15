import { Injectable } from '@angular/core';
import { AxialRotation } from 'src/app/modules2/core/models/axial-rotation';
import { WorldConstants } from 'src/app/modules2/core/models/world-constants';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { ViewportService } from 'src/app/modules2/core/services/viewport.service';
import { Object3D, PerspectiveCamera, Vector3 } from 'three';


@Injectable()
export class CameraService {

  /**
   * The coordinate of the North pole in the 3D world.
   */
  private readonly _north = new Vector3(0, 0, WorldConstants.WORLD_RADIUS);

  /**
   * The coordinate of the South pole in the 3D world.
   */
  private readonly _south = new Vector3(0, 0, -WorldConstants.WORLD_RADIUS);


  private readonly _nearPlane = 0.1;

  private readonly _farPlane = 5;

  private readonly _defaultFov = 30;

  private readonly _coordsMarker: Object3D;

  private readonly _camera: PerspectiveCamera;

  constructor(
    private readonly _eventsService: EventsService,
    private readonly _viewportService: ViewportService
  ) {
    this._camera = this.initializeCamera();
    this._coordsMarker = this.initCoordsMarker();
  }

  public get camera(): PerspectiveCamera {
    return this._camera;
  }

  public rotate(rotation: AxialRotation): void {
    this.camera.rotateX(rotation.rx);
    this.camera.rotateY(rotation.ry);
    this.camera.rotateZ(rotation.rz);
    this._eventsService.fireViewportChanged();
  }

  public alignNSAxis(): void {
    const viewCenter = this.getViewCenterCoordinates();
    this.camera.up = this.getAlignmentPoleCoordinate(viewCenter.z);
    this.camera.lookAt(viewCenter);
    this._eventsService.fireViewportChanged();
  }

  public setFoV(range: number): void {
    this.camera.fov = range;
    this.camera.updateProjectionMatrix();
    this._eventsService.fireViewportChanged();
  }

  private getViewCenterCoordinates(): Vector3 {
    const viewCenter = new Vector3();
    this._coordsMarker.updateMatrixWorld(true);
    viewCenter.setFromMatrixPosition(this._coordsMarker.matrixWorld);
    return viewCenter;
  }

  private getAlignmentPoleCoordinate(declination: number): Vector3 {
    if (declination < 0) {
      return this._south;
    }
    return this._north;
  }

  private initializeCamera(): PerspectiveCamera {
    const camera = new PerspectiveCamera(this._defaultFov,
      this._viewportService.aspectRatio,
      this._nearPlane,
      this._farPlane);
    const origin = 0;
    camera.position.z = origin;
    camera.position.x = origin;
    camera.position.y = origin;
    return camera;
  }

  private initCoordsMarker(): Object3D {
    const marker = new Object3D();
    marker.position.set(0, 0, -(WorldConstants.WORLD_RADIUS + 0.1));
    this._camera.add(marker);
    this._camera.updateMatrixWorld(true);
    return marker;
  }

}
