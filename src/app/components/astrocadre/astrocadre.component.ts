import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
  } from '@angular/core';
import { LayerService } from 'src/app/modules2/core/services/layer.service';
import { MouseEventsHandler } from 'src/app/modules2/core/services/mouse-events-handler';
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
    private readonly _mouseEventsHandler: MouseEventsHandler,
    private readonly _viewportService: ViewportService,
    private readonly _sceneService: SceneService
  ) {

  }

  public ngOnInit(): void {
    this._themeLoader.loadThemes();
    this._layersLoader.loadLayers();
  }

  public ngAfterViewInit(): void {
    const viewportRoot = this._astrocadreViewport.nativeElement as HTMLDivElement;
    this._sceneService.viewportRootElement = viewportRoot;
    this._mouseEventsHandler.initMouseListenersOn(viewportRoot);
  }

  public get viewportHeight(): string {
    return `${this._viewportService.height}px`;
  }

  public get viewportWidth(): string {
    return `${this._viewportService.width}px`;
  }

}
