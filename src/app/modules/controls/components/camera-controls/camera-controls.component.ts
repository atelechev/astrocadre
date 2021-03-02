import { Component } from '@angular/core';
import { ViewportEventService } from '#core/services/viewport-event.service';
import { toRadians } from '#core/utils/vector-utils';
import { environment } from '#environments/environment';

@Component({
  selector: `ac-controls-camera`,
  templateUrl: './camera-controls.component.html',
  styleUrls: ['../controls/controls.component.css', './camera-controls.component.css']
})
export class CameraControlsComponent {

  constructor(private viewportService: ViewportEventService) {

  }

  public rotateView(x: number, y: number, z: number): void {
    const data = {
      rx: toRadians(x),
      ry: toRadians(y),
      rz: toRadians(z)
    };
    this.viewportService.axialRotationRequested(data);
  }

  public changeFov(angle: number): void {
    this.viewportService.fovRequested(angle);
  }

  public alignNSAxis(): void {
    this.viewportService.axisAlignmentRequested();
  }

  public getPathToResource(resourceBaseName: string): string {
    return environment.pathInContext(`assets/textures/${resourceBaseName}.png`);
  }

}
