import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { SceneService } from './scene.service';
import { Constants } from '../constants';
import { Cube } from './cube';

@Component({
  selector: 'app-sky-view',
  templateUrl: './sky-view.component.html',
  styleUrls: ['./sky-view.component.css'],
  providers: [ SceneService ]
})
export class SkyViewComponent implements AfterViewInit {
  title = 'Sky View'; // TODO change

  @ViewChild('skyViewRoot')
  private skyViewRoot: ElementRef;

  constructor(private sceneService: SceneService) {

  }

  private appendCanvas(): void {
    const canvas = this.sceneService.getDomElement();
    this.skyViewRoot.nativeElement.appendChild(canvas);
  }

  private addCube(): void {
    this.sceneService.addMesh(new Cube().get());
  }

  ngAfterViewInit() {
    this.appendCanvas();
    this.addCube(); // TODO remove
    this.sceneService.render();
  }

}
