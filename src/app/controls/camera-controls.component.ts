import { Component, AfterViewInit } from '@angular/core';
import { Math as ThreeMath } from 'three';
import { ViewportEventService } from '../core/viewport/viewport-event.service';
import { toRadians } from '../core/layer/vector-utils';

@Component({
  selector: `app-sky-view-controls-camera`,
  templateUrl: './camera-controls.component.html',
  styleUrls: [ './controls.component.css', './camera-controls.component.css' ],
  providers: []
})
export class CameraControlsComponent implements AfterViewInit {

  constructor(private viewportService: ViewportEventService) {

  }

  public rotateView(x: number, y: number, z: number): void {
    const data = { rx: toRadians(x),
                   ry: toRadians(y),
                   rz: toRadians(z) };
    this.viewportService.axialRotationRequested(data);
  }

  public changeFov(angle: number): void {
    this.viewportService.fovRequested(angle);
  }

  public alignNSAxis(): void {
    this.viewportService.axisAlignmentRequested();
  }

  public ngAfterViewInit(): void {
    this.rotateView(90, 0, 0);
  }

}
