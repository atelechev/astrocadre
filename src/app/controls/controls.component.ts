import { Component } from '@angular/core';
import { ControlsService } from './controls.service';

@Component({
  selector: 'app-sky-view-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
  providers: [
    ControlsService
  ]
})
export class ControlsComponent {

}
