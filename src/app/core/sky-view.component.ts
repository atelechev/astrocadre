import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { SceneService } from './scene.service';
import { SkyGridComponent } from '../layers/sky-grid.component';
import { RenderableLayer } from './renderable-layer';
import { ConstellationBoundariesComponent } from '../layers/constellation-boundaries.component';
import { Object3D } from 'three';
import { RendererService } from './renderer.service';
import { WorldOriginCameraService } from './world-origin-camera.service';
import { ExternalCameraService } from './external-camera.service'; // TODO for dev only
import { ConstellationLinesComponent } from '../layers/constellation-lines.component';
import { StarsComponent } from '../layers/stars.component';
import { ThemesComponent } from '../themes/themes.component';
import { Themes } from '../themes/themes';
import { Theme } from '../themes/theme';

@Component({
  selector: 'app-sky-view',
  templateUrl: './sky-view.component.html',
  styleUrls: ['./sky-view.component.css'],
  providers: [
    SceneService,
    WorldOriginCameraService,
    ExternalCameraService, // TODO ExternalCameraService for dev only
    RendererService ]
})
export class SkyViewComponent implements AfterViewInit {

  @ViewChild('skyViewRoot')
  private skyViewRoot: ElementRef;

  private layers: RenderableLayer[];

  constructor(private themesComponent: ThemesComponent,
              private sceneService: SceneService,
              private rendererService: RendererService,
              private cameraService: WorldOriginCameraService,
              private skyGrid: SkyGridComponent,
              private constellationBoundaries: ConstellationBoundariesComponent,
              private constellationLines: ConstellationLinesComponent,
              private stars: StarsComponent) {
    this.layers = new Array<RenderableLayer>(
      skyGrid,
      constellationBoundaries,
      constellationLines,
      stars
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
    this.themesComponent.loadTheme(Themes.DEV).subscribe(
      (theme: Theme) => {
        this.sceneService.updateForTheme(theme);
        this.layers.forEach(layer => {
          layer.getObjects(this.themesComponent.getActiveTheme()).subscribe(
            (objects: Object3D[]) => {
              console.log(`${objects.length} objects to add for layer ${layer.getName()}`);
              this.sceneService.addObjects(objects);
            },
            (error) => console.error(`Failed to load the layer '${layer.getName()}': ${error}`)
          );
        });
      },
      (error) => console.error(`Failed to initialize sky-view': ${error}`)
    );
    this.rendererService.render(this.sceneService.getScene(), this.cameraService.getCamera());
  }

}
