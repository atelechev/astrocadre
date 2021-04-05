import { Component } from '@angular/core';
import { MathUtils } from 'three';
import { AxialRotation } from '#core/models/screen/axial-rotation';
import { CameraService } from '#core/services/camera.service';

/**
 * Provides the UI controls for the camera/view.
 */
@Component({
  selector: 'ac-controls-camera',
  templateUrl: './camera-controls.component.html'
})
export class CameraControlsComponent {

  private _selectedStep: number;

  constructor(private readonly _cameraService: CameraService) {
    this._selectedStep = 10;
  }

  public get selectedStep(): number {
    return this._selectedStep;
  }

  public set selectedStep(step: number) {
    this._selectedStep = step;
  }

  public changeFov(): void {
    this._cameraService.setFoV(this._selectedStep);
  }

  public stepClockwise(): void {
    this.rotateView(0, 0, this._selectedStep);
  }

  public stepCounterClockwise(): void {
    this.rotateView(0, 0, -this._selectedStep);
  }

  public stepUp(): void {
    this.rotateView(this._selectedStep, 0, 0);
  }

  public stepDown(): void {
    this.rotateView(-this._selectedStep, 0, 0);
  }

  public stepLeft(): void {
    this.rotateView(0, this._selectedStep, 0);
  }

  public stepRight(): void {
    this.rotateView(0, -this._selectedStep, 0);
  }

  public alignNSAxis(): void {
    this._cameraService.alignNSAxis();
  }

  private rotateView(x: number, y: number, z: number): void {
    const data: AxialRotation = {
      rx: MathUtils.degToRad(x),
      ry: MathUtils.degToRad(y),
      rz: MathUtils.degToRad(z)
    };
    this._cameraService.rotate(data);
  }

}
