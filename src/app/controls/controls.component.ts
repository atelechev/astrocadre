import { Component } from '@angular/core';

@Component({
  selector: 'app-astrocadre-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
  providers: []
})
export class ControlsComponent {

  public toolsVisible: boolean;

  constructor() {
    this.toolsVisible = true;
  }

  public toggleToolsVisibility(): void {
    this.toolsVisible = !this.toolsVisible;
  }

}
