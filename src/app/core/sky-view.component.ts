import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { SceneService } from './scene.service';
import { Constants } from '../constants';
import { SkyGridComponent } from '../layers/sky-grid.component';
import { AxesComponent } from '../layers/axes.component';
import { RenderableLayer } from './renderable-layer';
import { ConstellationBoundariesComponent } from '../layers/constellation-boundaries.component';

@Component({
  selector: 'app-sky-view',
  templateUrl: './sky-view.component.html',
  styleUrls: ['./sky-view.component.css'],
  providers: [ SceneService ]
})
export class SkyViewComponent implements AfterViewInit {

  @ViewChild('skyViewRoot')
  private skyViewRoot: ElementRef;

  private layers: RenderableLayer[];

  constructor(private sceneService: SceneService,
              private axes: AxesComponent,
              private skyGrid: SkyGridComponent,
              private constellationBoundaries: ConstellationBoundariesComponent) {
    this.layers = new Array<RenderableLayer>(
      axes, // TODO for dev only, should be removed
      skyGrid,
      constellationBoundaries
    );
  }

  private appendCanvas(): void {
    const canvas = this.sceneService.getDomElement();
    this.skyViewRoot.nativeElement.appendChild(canvas);
  }

  ngAfterViewInit() {
    this.appendCanvas();
    this.layers.forEach(layer => {
      this.sceneService.addObjects(layer.getObjects());
    });
    this.sceneService.render();
  }

}
