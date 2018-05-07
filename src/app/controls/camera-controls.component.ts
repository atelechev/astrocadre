import { Component, AfterViewInit } from '@angular/core';
import { Math as ThreeMath } from 'three';
import { ViewportService } from '../viewport/viewport.service';

@Component({
  selector: `app-sky-view-controls-camera`,
  templateUrl: './camera-controls.component.html',
  styleUrls: [ './controls.component.css', './camera-controls.component.css' ],
  providers: []
})
export class CameraControlsComponent implements AfterViewInit {

  constructor(private viewportService: ViewportService) {

  }

  private toRadians(degrees: number): number {
    return ThreeMath.degToRad(degrees);
  }

  private viewportCenterChangeRequested(x: number, y: number, z: number): void {
    const data = { rx: this.toRadians(x),
                   ry: this.toRadians(y),
                   rz: this.toRadians(z) };
    this.viewportService.viewportCenterChangeRequested(data);
  }

  private viewportFovChangeRequested(angle: number): void {
    this.viewportService.viewportFovChangeRequested(angle);
  }

  public ngAfterViewInit(): void {
    this.viewportCenterChangeRequested(90, 0, 0);
  }

}
