import { RenderableLayer } from '../core/renderable-layer';
import { Object3D } from 'three';
import { Injectable, Component } from '@angular/core';
import { ConstellationBoundaryService } from './constellation-boundaries.service';

@Component({
  template: ``,
  providers: [
    ConstellationBoundaryService
  ]
})
export class ConstellationBoundariesComponent implements RenderableLayer {

  constructor() {

  }

  public getObjects(): Object3D[] {
    // TODO implement
    return new Array<Object3D>();
  }

}
