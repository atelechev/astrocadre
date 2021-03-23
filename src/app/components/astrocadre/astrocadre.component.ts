import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
  } from '@angular/core';
import { MouseEventsHandler } from 'src/app/modules2/core/services/mouse-events-handler';
import { SceneService } from 'src/app/modules2/core/services/scene.service';
import { ViewportService } from 'src/app/modules2/core/services/viewport.service';


@Component({
  selector: `ac-root`,
  templateUrl: './astrocadre.component.html',
  styleUrls: []
})
export class AstrocadreComponent implements AfterViewInit {

  @ViewChild('astrocadreViewport')
  private _astrocadreViewport: ElementRef;

  constructor(
    private readonly _mouseEventsHandler: MouseEventsHandler,
    private readonly _viewportService: ViewportService,
    private readonly _sceneService: SceneService
  ) {

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
