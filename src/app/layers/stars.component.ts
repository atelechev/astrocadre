import { RenderableLayer } from '../core/renderable-layer';
import { Object3D, Material, PointsMaterial, TextureLoader } from 'three';
import { Component } from '@angular/core';
import { StarsService } from './stars.service';
import { Observable } from 'rxjs/Observable';
import { MergedLines } from './model/merged-lines';
import { MergedPoints } from './model/merged-points';
import { ThemesComponent } from '../themes/themes.component';
import { Layers } from './layers';

@Component({
  template: ``,
  providers: [
    StarsService
  ]
})
export class StarsComponent implements RenderableLayer {

  constructor(private starsService: StarsService,
              private themes: ThemesComponent) {

  }

  private getMaterialForMagnitudeClass(magClass: number): Material {
    const materialKey = 'star-' + magClass.toFixed(1);
    return this.themes.getActiveTheme().getMaterialForLayer(this.getName(), materialKey);
  }

  public getObjects(): Observable<Object3D[]> {
    const magnitudes = this.themes.getActiveTheme().getRenderedStarMagnitudes();
    return this.starsService.getStarsByClasses(magnitudes)
    .map(starsByClasses => {
      const allStars = new Array<Object3D>();
      for (let i = 0; i < magnitudes.length; i++) {
        const material = this.getMaterialForMagnitudeClass(magnitudes[i]);
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
