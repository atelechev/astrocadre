import { Component, ViewChild } from '@angular/core';
import { AxialRotation } from 'src/app/modules2/core/models/axial-rotation';
import { CameraService } from 'src/app/modules2/core/services/camera.service';
import { toRadians } from 'src/app/modules2/core/utils/vector-utils';
import { environment } from '#environments/environment';


@Component({
  selector: 'ac-controls-camera',
  templateUrl: './camera-controls.component.html',
  styleUrls: [
    './camera-controls.component.css',
    '../controls-common.css'
  ]
})
export class CameraControlsComponent {

  @ViewChild('cameraChangeStep')
  private _cameraStepInput: any;

  constructor(private readonly _cameraService: CameraService) {

  }

  public getPathToResource(resourceBaseName: string): string {
    return environment.pathInContext(`assets/textures/${resourceBaseName}.png`);
  }

  public stepClockwise(): void {
    this.rotateView(0, 0, this.cameraChangeStep);
  }

  public stepCounterClockwise(): void {
    this.rotateView(0, 0, -this.cameraChangeStep);
  }

  public stepUp(): void {
    this.rotateView(this.cameraChangeStep, 0, 0);
  }

  public stepDown(): void {
    this.rotateView(-this.cameraChangeStep, 0, 0);
  }

  public stepLeft(): void {
    this.rotateView(0, this.cameraChangeStep, 0);
  }

  public stepRight(): void {
    this.rotateView(0, -this.cameraChangeStep, 0);
  }

  public changeFov(): void {
    this._cameraService.setFoV(this.cameraChangeStep);
  }

  public alignNSAxis(): void {
    this._cameraService.alignNSAxis();
  }

  private get cameraChangeStep(): number {
    return this._cameraStepInput.nativeElement.value || 0;
  }

  private rotateView(x: number, y: number, z: number): void {
    const data: AxialRotation = {
      rx: toRadians(x),
      ry: toRadians(y),
      rz: toRadians(z)
    };
    this._cameraService.rotate(data);
  }

}
