import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { SceneService } from './scene.service';
import { Constants } from '../constants';
import { SkyGrid } from './layer/sky-grid';
import { Axes } from './layer/axes';
import { RenderableLayer } from '../renderable-layer';
import { ConstellationBoundaries } from './layer/constellation-boundaries';

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

  constructor(private sceneService: SceneService) {
    this.layers = new Array<RenderableLayer>(
      // new Axes(), // TODO for dev only, should be removed
      new SkyGrid(),
      new ConstellationBoundaries()
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
