import { Component } from '@angular/core';

@Component({
  selector: 'ac-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent {

  private _toolsExpanded: boolean;

  constructor() {
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

}
