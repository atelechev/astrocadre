import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CameraControlsComponent } from '#controls/components/camera-controls/camera-controls.component';
import { ControlsComponent } from '#controls/components/controls/controls.component';
import { GoToComponent } from '#controls/components/go-to/go-to.component';

@NgModule({
  declarations: [
    ControlsComponent,
    CameraControlsComponent,
    GoToComponent
  ],
  exports: [
    ControlsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    ControlsComponent,
    GoToComponent
  ]
})
export class ControlsModule {

}
