import { RenderableLayer } from '../core/renderable-layer';
import { Object3D, Material, PointsMaterial, TextureLoader } from 'three';
import { Component } from '@angular/core';
import { StarsService } from './stars.service';
import { Observable } from 'rxjs/Observable';
import { MergedLines } from './model/merged-lines';
import { MergedPoints } from './model/merged-points';

@Component({
  template: ``,
  providers: [
    StarsService
  ]
})
export class StarsComponent implements RenderableLayer {

  private renderedMagnitudes = [ 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6 ];

  private textureLoader: TextureLoader;


  constructor(private starsService: StarsService) {
    this.textureLoader = new TextureLoader();
  }

  private getMaterialForMagnitudeClass(magClass: number): Material {
    const dotSizeMultiplier = 2.5;
    const dotSize = (6.5 - magClass) * dotSizeMultiplier;
    return new PointsMaterial({ size: dotSize,
                                sizeAttenuation: false,
                                map: this.textureLoader.load('assets/textures/star.png') } );
  }

  public getObjects(): Observable<Object3D[]> {
    return this.starsService.getStarsByClasses(this.renderedMagnitudes)
    .map(starsByClasses => {
      const allStars = new Array<Object3D>();
      for (let i = 0; i < this.renderedMagnitudes.length; i++) {
        const material = this.getMaterialForMagnitudeClass(this.renderedMagnitudes[i]);
        const starsForClass = new MergedPoints(material, starsByClasses[i], 1.96);
        allStars.push(starsForClass.toObject3D());
      }
      return allStars;
    });
  }

  public getName(): string {
    return 'stars';
  }

}
