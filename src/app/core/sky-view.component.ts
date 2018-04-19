import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { SceneService } from './scene.service';
import { Constants } from '../constants';
import { SkyGridComponent } from '../layers/sky-grid.component';
import { AxesComponent } from '../layers/axes.component';
import { RenderableLayer } from './renderable-layer';
import { ConstellationBoundariesComponent } from '../layers/constellation-boundaries.component';
import { Object3D } from 'three';
import { RendererService } from './renderer.service';
import { WorldOriginCameraService } from './world-origin-camera.service';

@Component({
  selector: 'app-sky-view',
  templateUrl: './sky-view.component.html',
  styleUrls: ['./sky-view.component.css'],
  providers: [ SceneService, WorldOriginCameraService, RendererService ]
})
export class SkyViewComponent implements AfterViewInit {

  @ViewChild('skyViewRoot')
  private skyViewRoot: ElementRef;

  private layers: RenderableLayer[];

  constructor(private sceneService: SceneService,
              private rendererService: RendererService,
              private cameraService: WorldOriginCameraService,
              private axes: AxesComponent,
              private skyGrid: SkyGridComponent,
              private constellationBoundaries: ConstellationBoundariesComponent) {
    this.layers = new Array<RenderableLayer>(
      // axes, // TODO for dev only, should be removed
      skyGrid,
      constellationBoundaries
    );
    // TODO could we avoid this call and make it somewhere inside cameraService?
    this.cameraService.initMouseListeners(rendererService, sceneService);
  }

  private appendCanvas(): void {
    const canvas = this.rendererService.getDomElement();
    this.skyViewRoot.nativeElement.appendChild(canvas);
  }

  ngAfterViewInit() {
    this.appendCanvas();
    this.layers.forEach(layer => {
      layer.getObjects().subscribe(
        (objects: Object3D[]) => this.sceneService.addObjects(objects),
        (error) => console.error(`Failed to load the layer '${layer.getName()}': ${error}`)
      );
    });
    this.rendererService.render(this.sceneService.getScene(), this.cameraService.getCamera());
  }

}
