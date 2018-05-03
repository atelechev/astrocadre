import { Component, EventEmitter, AfterViewInit, Output } from '@angular/core';
import { CameraAction } from '../core/camera-action';
import { Math as ThreeMath } from 'three';

@Component({
  selector: `app-sky-view-controls-camera`,
  templateUrl: './camera-controls.component.html',
  styleUrls: [ './controls.component.css', './camera-controls.component.css' ],
  providers: []
})
export class CameraControlsComponent implements AfterViewInit {

  @Output()
  private cameraChanged = new EventEmitter<any>();

  private toRadians(degrees: number): number {
    return ThreeMath.degToRad(degrees);
  }

  private emitCameraEvent(data: any): void {
    this.cameraChanged.emit(data);
  }

  private fireRotateCameraEvent(x: number, y: number, z: number): void {
    const data = { action: CameraAction.ROTATE,
                   x: this.toRadians(x),
                   y: this.toRadians(y),
                   z: this.toRadians(z) };
    this.emitCameraEvent(data);
  }

  private fireFoVChangeEvent(angle: number): void {
    const data = { action: CameraAction.FIELD_OF_VIEW, range: angle };
    this.emitCameraEvent(data);
  }

  private fireAxisAlignEvent(): void {
    const data = { action: CameraAction.ALIGN_NS_AXIS };
    this.emitCameraEvent(data);
  }

  public ngAfterViewInit(): void {
    this.fireRotateCameraEvent(90, 0, 0);
  }

}
