import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
  } from '@angular/core';
import { DraggableElementsHandler } from 'src/app/modules2/controls/services/draggable-elements-handler';

@Component({
  selector: 'ac-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements AfterViewInit {

  @ViewChild('astrocadreControls')
  private _astrocadreControls: ElementRef;

  private _toolsExpanded: boolean;

  constructor(private readonly _draggableHandler: DraggableElementsHandler) {
    this._toolsExpanded = true;
  }

  public toggleTools(): void {
    this._toolsExpanded = !this._toolsExpanded;
  }

  public get toggleToolsLabel(): string {
    return this._toolsExpanded ? '\u25B2' : '\u25BC';
  }

  public get toolsExpanded(): boolean {
    return this._toolsExpanded;
  }

  public ngAfterViewInit(): void {
    this._draggableHandler.makeDraggable(this._astrocadreControls.nativeElement);
  }

}
