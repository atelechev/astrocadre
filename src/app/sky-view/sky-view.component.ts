import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { SceneService } from './scene.service';
import { Constants } from '../constants';
import { Cube } from './cube';
import { SkyGrid } from './grid/sky-grid';
import { Axes } from './grid/axes';

@Component({
  selector: 'app-sky-view',
  templateUrl: './sky-view.component.html',
  styleUrls: ['./sky-view.component.css'],
  providers: [ SceneService ]
})
export class SkyViewComponent implements AfterViewInit {

  @ViewChild('skyViewRoot')
  private skyViewRoot: ElementRef;

  constructor(private sceneService: SceneService) {

  }

  private appendCanvas(): void {
    const canvas = this.sceneService.getDomElement();
    this.skyViewRoot.nativeElement.appendChild(canvas);
  }

  ngAfterViewInit() {
    this.appendCanvas();
    this.sceneService.addObjects(new SkyGrid().getGrid());
    // this.sceneService.addObjects(new Axes().getGrid()); // TODO for dev only, should be removed
    this.sceneService.render();
  }

}
