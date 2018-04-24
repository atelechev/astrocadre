import { RenderableLayer } from '../core/renderable-layer';
import { Object3D, Material } from 'three';
import { Component } from '@angular/core';
import { StarsService } from './stars.service';
import { Observable } from 'rxjs/Observable';
import { MergedPoints } from './model/merged-points';
import { Layers } from './layers';
import { Theme } from '../themes/theme';

@Component({
  template: ``,
  providers: [
    StarsService
  ]
})
export class StarsComponent implements RenderableLayer {

  constructor(private starsService: StarsService) {

  }

  private getMaterialForMagnitudeClass(magClass: number, theme: Theme): Material {
    const materialKey = 'star-' + magClass.toFixed(1);
    return theme.getMaterialForLayer(this.getName(), materialKey);
  }

  public getObjects(theme: Theme): Observable<Object3D[]> {
    const magnitudes = theme.getRenderedStarMagnitudes();
    return this.starsService.getStarsByClasses(magnitudes)
    .map(starsByClasses => {
      const allStars = new Array<Object3D>();
      for (let i = 0; i < magnitudes.length; i++) {
        const material = this.getMaterialForMagnitudeClass(magnitudes[i], theme);
        const starsForClass = new MergedPoints(material, starsByClasses[i], 1.96);
        allStars.push(starsForClass.toObject3D());
      }
      return allStars;
    });
  }

  public getName(): string {
    return Layers.STARS;
  }

}
