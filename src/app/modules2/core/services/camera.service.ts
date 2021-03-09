import { Injectable } from '@angular/core';
import { WorldConstants } from 'src/app/modules2/core/models/world-constants';
import { ViewportService } from 'src/app/modules2/core/services/viewport.service';
import { Object3D, PerspectiveCamera } from 'three';


@Injectable()
export class CameraService {

  private readonly _nearPlane = 0.1;

  private readonly _farPlane = 5;

  private readonly _defaultFov = 30;

  private readonly _coordsMarker: Object3D;

  private readonly _camera: PerspectiveCamera;

  constructor(
    private readonly _viewportService: ViewportService
  ) {
    this._camera = this.initializeCamera();
    this._coordsMarker = this.initCoordsMarker();
  }

  public get camera(): PerspectiveCamera {
    return this._camera;
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
