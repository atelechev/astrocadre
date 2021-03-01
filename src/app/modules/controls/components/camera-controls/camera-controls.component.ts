import { Component } from '@angular/core';
import { environment } from '#environments/environment';
import { toRadians } from '#core/utils/vector-utils';
import { ViewportEventService } from '#core/services/viewport-event.service';

@Component({
  selector: `app-astrocadre-controls-camera`,
  templateUrl: './camera-controls.component.html',
  styleUrls: ['../controls/controls.component.css', './camera-controls.component.css'],
  providers: []
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
