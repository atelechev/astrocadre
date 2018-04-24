import { RenderableLayer } from '../core/renderable-layer';
import { Object3D, LineBasicMaterial, Material } from 'three';
import { Component } from '@angular/core';
import { StarsService } from './stars.service';
import { Observable } from 'rxjs/Observable';
import { MergedLines } from './model/merged-lines';
import { ThemesComponent } from '../themes/themes.component';
import { Layers } from './layers';

@Component({
  template: ``,
  providers: [
    StarsService
  ]
})
export class ConstellationLinesComponent implements RenderableLayer {

  constructor(private starsService: StarsService,
              private themes: ThemesComponent) {

  }

  public getObjects(): Observable<Object3D[]> {
    const material = 
      this.themes.getActiveTheme()
                 .getMaterialForLayer(Layers.CONSTELLATION_LINES, 'line-common');
    return this.starsService.getConstellationLines()
               .map((rawSegments: number[][]) => {
                  const mergedCurves = new MergedLines(material, rawSegments, 1.98);
                  return [ mergedCurves.toObject3D() ];
               });
  }

  public getName(): string {
    return Layers.CONSTELLATION_LINES;
  }

}
