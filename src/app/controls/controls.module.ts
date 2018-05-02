import { NgModule } from '@angular/core';
import { ControlsComponent } from './controls.component';
import { SelectorThemeComponent } from './selector-theme.component';
import { BrowserModule } from '@angular/platform-browser';
import { SelectorLayersComponent } from './selector-layers.component';
import { SelectorStarsMagnitudeComponent } from './selector-stars-magnitude.component';
import { CameraControlsComponent } from './camera-controls.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ControlsComponent,
    SelectorThemeComponent,
    SelectorLayersComponent,
    SelectorStarsMagnitudeComponent,
    CameraControlsComponent
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
    SelectorThemeComponent,
    SelectorLayersComponent,
    SelectorStarsMagnitudeComponent
  ]
})
export class ControlsModule {

}
