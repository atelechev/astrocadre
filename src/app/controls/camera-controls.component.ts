import { Component, EventEmitter, AfterViewInit, Output } from '@angular/core';
import { CameraAction } from '../core/camera-action';
import { Math as ThreeMath } from 'three';

@Component({
  selector: `app-sky-view-controls-camera`,
  templateUrl: './camera-controls.component.html',
  styleUrls: [ './controls.component.css' ],
  providers: []
})
export class CameraControlsComponent implements AfterViewInit {

  @Output()
  private cameraAngleChanged = new EventEmitter<any>();


  private fireCameraChangedEvent(action: string, x: number, y: number, z: number): void {
    this.cameraAngleChanged.emit({ action: action, x: x, y: y, z: z });
  }

  private toRadians(degrees: number): number {
    return ThreeMath.degToRad(degrees);
  }

  private fireRotateCameraEvent(x: number, y: number, z: number): void {
    this.fireCameraChangedEvent(CameraAction[CameraAction.rotate],
                                this.toRadians(x),
                                this.toRadians(y),
                                this.toRadians(z));
  }

  public ngAfterViewInit(): void {
    this.fireRotateCameraEvent(Math.PI / 2, 0, 0);
  }

}
