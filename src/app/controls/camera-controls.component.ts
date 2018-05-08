import { Component, AfterViewInit } from '@angular/core';
import { Math as ThreeMath } from 'three';
import { ViewportEventService } from '../viewport/viewport-event.service';

@Component({
  selector: `app-sky-view-controls-camera`,
  templateUrl: './camera-controls.component.html',
  styleUrls: [ './controls.component.css', './camera-controls.component.css' ],
  providers: []
})
export class CameraControlsComponent implements AfterViewInit {

  constructor(private viewportService: ViewportEventService) {

  }

  private toRadians(degrees: number): number {
    return ThreeMath.degToRad(degrees);
  }

  private rotateView(x: number, y: number, z: number): void {
    const data = { rx: this.toRadians(x),
                   ry: this.toRadians(y),
                   rz: this.toRadians(z) };
    this.viewportService.axialRotationRequested(data);
  }

  private changeFov(angle: number): void {
    this.viewportService.fovRequested(angle);
  }

  public ngAfterViewInit(): void {
    this.rotateView(90, 0, 0);
  }

}
