import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
  } from '@angular/core';
import { MouseEventsHandler } from '#core/services/mouse-events-handler';
import { SceneService } from '#core/services/scene.service';
import { ViewportService } from '#core/services/viewport.service';
import { LoaderService } from '#controls/services/loader.service';

/**
 * The root component of the Asctocadre application.
 */
@Component({
  selector: `ac-root`,
  templateUrl: './astrocadre.component.html'
})
export class AstrocadreComponent implements OnInit, AfterViewInit {

  @ViewChild('astrocadreViewport')
  private _astrocadreViewport: ElementRef;

  constructor(
    private readonly _loaderService: LoaderService,
    private readonly _mouseEventsHandler: MouseEventsHandler,
    private readonly _viewportService: ViewportService,
    private readonly _sceneService: SceneService
  ) {

  }

  public ngOnInit(): void {
    this._loaderService.loadAllData();
  }

  public ngAfterViewInit(): void {
    const viewportRoot = this._astrocadreViewport.nativeElement as HTMLDivElement;
    this._sceneService.setViewportRootElement(viewportRoot);
    this._mouseEventsHandler.initMouseListenersOn(viewportRoot);
    this.startRendering();
  }

  public get viewportHeight(): string {
    return `${this._viewportService.height}px`;
  }

  public get viewportWidth(): string {
    return `${this._viewportService.width}px`;
  }

  private startRendering(): void {
    const animate = () => {
      requestAnimationFrame(animate);
      this._sceneService.render();
    };
    animate();
  }

}
