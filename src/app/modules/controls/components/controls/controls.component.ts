import { Component, Input } from '@angular/core';

/**
 * The root component for all the controls visible in the UI.
 */
@Component({
  selector: 'ac-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent {

  private _toolsExpanded: boolean;

  constructor() {
    this._toolsExpanded = false;
  }

  @Input()
  public set toolsExpanded(expand: boolean) {
    this._toolsExpanded = expand;
  }

  public get toolsExpanded(): boolean {
    return this._toolsExpanded;
  }

  public toggleTools(): void {
    this._toolsExpanded = !this._toolsExpanded;
  }

}
