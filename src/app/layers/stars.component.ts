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

  private renderedMagnitudes = [ 2, 2.5, 3, 3.5 ];

  private textureLoader: TextureLoader;


  constructor(private starsService: StarsService) {
    this.textureLoader = new TextureLoader();
  }

  private getMaterialForMagnitudeClass(magClass: number): Material {
    const dotSizeMultiplier = 1.5;
    const dotSize = 7 * dotSizeMultiplier - magClass;
    return new PointsMaterial({ size: dotSize,
                                sizeAttenuation: false,
                                map: this.textureLoader.load('assets/textures/star.png') } );
  }

  public getObjects(): Observable<Object3D[]> {
    const magClass = this.renderedMagnitudes[0];
    const material = this.getMaterialForMagnitudeClass(magClass);
    return this.starsService.getStars(magClass)
      .map((rawStars: number[][]) => {
        const mergedPoints = new MergedPoints(material, rawStars, 1.96);
        return [ mergedPoints.toObject3D() ];
      });
  }

  public getName(): string {
    return 'stars';
  }

}
