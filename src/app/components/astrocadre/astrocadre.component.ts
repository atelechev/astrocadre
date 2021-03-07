import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
  } from '@angular/core';
import { LayerService } from 'src/app/modules2/core/services/layer.service';
import { SceneService } from 'src/app/modules2/core/services/scene.service';
import { ThemeService } from 'src/app/modules2/core/services/theme.service';
import { ViewportService } from 'src/app/modules2/core/services/viewport.service';


@Component({
  selector: `ac-root`,
  templateUrl: './astrocadre.component.html',
  styleUrls: []
})
export class AstrocadreComponent implements OnInit, AfterViewInit {

  @ViewChild('astrocadreViewport')
  private _astrocadreViewport: ElementRef;

  constructor(
    private readonly _themeLoader: ThemeService,
    private readonly _layersLoader: LayerService,
    private readonly _viewportService: ViewportService,
    private readonly _sceneService: SceneService
  ) {

  }

  public ngOnInit(): void {
    this._themeLoader.loadThemes();
    this._layersLoader.loadLayers();
  }

  public ngAfterViewInit(): void {
    this.appendCanvas();
    this._sceneService.render();
  }

  public get viewportHeight(): string {
    return `${this._viewportService.height}px`;
  }

  public get viewportWidth(): string {
    return `${this._viewportService.width}px`;
  }

  private appendCanvas(): void {
    const canvas = this._sceneService.domElement;
    this._astrocadreViewport.nativeElement.appendChild(canvas);
  }

}