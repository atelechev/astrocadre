import { Injectable } from '@angular/core';
import {
  Frustum,
  Matrix4,
  Object3D,
  PerspectiveCamera,
  Vector3
  } from 'three';
import { AxialRotation } from '#core/models/screen/axial-rotation';
import { SkyCoordinate } from '#core/models/screen/sky-coordinate';
import { ViewportService } from '#core/services/viewport.service';
import { toVector3 } from '#core/utils/vector-utils';
import { VirtualSphereRadiusService } from '#core/services/virtual-sphere-radius.service';
import { ViewportEvent } from '#core/models/event/viewport-event';
import { ViewportSizeChangeEvent } from '#core/models/event/viewport-size-change-event';
import { ScreenCoordinate } from '#core/models/screen/screen-coordinate';

/**
 * Holds the reference to the camera object and provides methods to change the view.
 */
@Injectable({ providedIn: 'root' })
export class CameraService {

  /**
   * The coordinate of the North pole in the 3D world.
   */
  private readonly _north: Vector3;

  /**
   * The coordinate of the South pole in the 3D world.
   */
  private readonly _south: Vector3;


  private readonly _nearPlane = 0.1;

  private readonly _farPlane = 5;

  private readonly _defaultFov = 30;

  private readonly _coordsMarker: Object3D;

  private readonly _camera: PerspectiveCamera;

  private readonly _frustum: Frustum;

  constructor(
    private readonly _viewportService: ViewportService,
    private readonly _vurtualSphere: VirtualSphereRadiusService
  ) {
    this._north = new Vector3(0, 0, this._vurtualSphere.maxRadius);
    this._south = new Vector3(0, 0, -this._vurtualSphere.maxRadius);
    this._camera = this.initializeCamera();
    this._frustum = new Frustum();
    this._coordsMarker = this.initCoordsMarker();
    this.subscribeViewportEvents();
  }

  /**
   * Returns the current camera object.
   */
  public get camera(): PerspectiveCamera {
    return this._camera;
  }

  /**
   * Rotates the camera according to the specified rotation argument.
   *
   * @param rotation the rotation to execute.
   */
  public rotate(rotation: AxialRotation): void {
    if (rotation) {
      this.camera.rotateX(rotation.rx);
      this.camera.rotateY(rotation.ry);
      this.camera.rotateZ(rotation.rz);
      this._viewportService.fireViewportViewChanged('rotate');
    }
  }

  /**
   * Aligns the view of the camera, so that the North is placed above the top middle of the view, if the view
   * is in the Nothern hemisphere, or the South is placed above the top middle, if the view
   * is in the Southern hemisphere.
   */
  public alignNSAxis(): void {
    const viewCenter = this.getViewCenterCoordinates();
    this.camera.up = this.getAlignmentPoleCoordinate(viewCenter.z);
    this.camera.lookAt(viewCenter);
    this._viewportService.fireViewportViewChanged('alignNSAxis');
  }

  /**
   * Sets the field of view to the specified width in degrees.
   *
   * @param width the width of the field of view in degrees.
   */
  public setFoV(width: number): void {
    if (width && width > 0) {
      this.camera.fov = width;
      this.camera.updateProjectionMatrix();
      this._viewportService.fireViewportViewChanged('setFoV');
    }
  }

  /**
   * Centers the view at the specified coordinates.
   *
   * @param coords the coordinate to use as the center of the view.
   */
  public centerView(coords: SkyCoordinate): void {
    if (coords) {
      this.camera.up = this.getAlignmentPoleCoordinate(coords.declination);
      this.camera.lookAt(toVector3(coords.rightAscension, coords.declination, this._vurtualSphere.maxRadius));
      this.camera.updateMatrixWorld(true);
      this._viewportService.fireViewportViewChanged('centerView');
    }
  }

  /**
   * Returns the coordinates of the view center.
   *
   * @returns Vector3 the coordinates of the view center.
   */
  public getViewCenterCoordinates(): Vector3 {
    const viewCenter = new Vector3();
    this._coordsMarker.updateMatrixWorld(true);
    viewCenter.setFromMatrixPosition(this._coordsMarker.matrixWorld);
    return viewCenter;
  }

  /**
   * Returns true if the specified point is behind the current view plane.
   *
   * @param point the point to check.
   * @returns boolean true if the point is behind.
   */
  public isPointBehind(point: Vector3): boolean {
    if (!point) {
      return true;
    }
    return !this._frustum.containsPoint(point);
  }

  /**
   * Updates the current frustum.
   */
  public updateFrustum(): void {
    this._camera.updateMatrix();
    this._camera.updateMatrixWorld(true);
    const matrix = new Matrix4().multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
    this._frustum.setFromProjectionMatrix(matrix);
  }

  /**
   * Returns the screen coordinates of the specified point in the 3D space.
   *
   * @param point the point to convert the coordinates for.
   * @returns ScreenCoordinate the screen coordinates of the point.
   */
  public getOnScreenPosition(point: Vector3): ScreenCoordinate {
    const onScreen = point.clone();
    onScreen.project(this._camera);
    const halfWidth = this._viewportService.halfWidth;
    const halfHeight = this._viewportService.halfHeight;
    const scrX = (onScreen.x * halfWidth) + halfWidth;
    const scrY = -(onScreen.y * halfHeight) + halfHeight;
    return { x: scrX, y: scrY };
  }

  private getAlignmentPoleCoordinate(declination: number): Vector3 {
    if (declination < 0) {
      return this._south;
    }
    return this._north;
  }

  private initializeCamera(): PerspectiveCamera {
    const camera = new PerspectiveCamera(
      this._defaultFov,
      this._viewportService.aspectRatio,
      this._nearPlane,
      this._farPlane
    );
    const origin = 0;
    camera.position.z = origin;
    camera.position.x = origin;
    camera.position.y = origin;
    return camera;
  }

  private initCoordsMarker(): Object3D {
    const marker = new Object3D();
    marker.position.set(0, 0, -(this._vurtualSphere.maxRadius + 0.1));
    this._camera.add(marker);
    this._camera.updateMatrixWorld(true);
    return marker;
  }

  private subscribeViewportEvents(): void {
    this._viewportService.events
      .subscribe(
        (event: ViewportEvent<any>) => {
          if (event.key === ViewportSizeChangeEvent.KEY) {
            this._camera.aspect = this._viewportService.aspectRatio;
            this._camera.updateProjectionMatrix();
          }
        }
      );
  }

}
