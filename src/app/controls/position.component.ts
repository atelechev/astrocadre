import { Component } from '@angular/core';
import { Vector3, Math as ThreeMath } from 'three';
import { Constants } from '../core/constants';
import { ViewportService } from '../viewport/viewport.service';

@Component({
  selector: `app-sky-view-controls-position`,
  templateUrl: './position.component.html',
  styleUrls: [ './controls.component.css' ],
  providers: []
})
export class PositionComponent {

  public ra: string;

  public decl: string;

  constructor(private viewportService: ViewportService) {
    this.subscribeToViewportChanges();
  }

  private subscribeToViewportChanges(): void {
    this.viewportService.changeComplete$.subscribe(
      (viewportCenter: Vector3) => {
        this.ra = this.calculateRightAscension(viewportCenter);
        this.decl = this.calculateDeclination(viewportCenter);
      }
    );
  }

  // TODO move to VectorUtil
  private calculateRightAscension(viewportCenter: Vector3): string {
    const phiRad = Math.atan(viewportCenter.y / viewportCenter.x);
    return ThreeMath.radToDeg(phiRad).toFixed(3);
  }

  // TODO move to VectorUtil
  private calculateDeclination(viewportCenter: Vector3): string {
    const thetaRad = Math.acos(viewportCenter.z / (Constants.WORLD_RADIUS + 0.1)); // TODO constants
    return (90 - ThreeMath.radToDeg(thetaRad)).toFixed(3);
  }

}
