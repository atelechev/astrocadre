import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
  } from '@angular/core';
import { DraggableElementsHandler } from '#core/services/draggable-elements-handler';

@Component({
  selector: 'ac-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['../controls/controls.component.css']
})
export class ControlsComponent implements AfterViewInit {

  @ViewChild('astrocadreControls')
  private astrocadreControls: ElementRef;

  public toolsVisible: boolean;

  constructor(private draggableElementsHandler: DraggableElementsHandler) {
    this.toolsVisible = true;
  }

  public toggleToolsVisibility(): void {
    this.toolsVisible = !this.toolsVisible;
  }

  public ngAfterViewInit(): void {
    this.draggableElementsHandler.makeDraggable(this.astrocadreControls.nativeElement);
  }

}
