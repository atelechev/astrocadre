import { NgModule } from '@angular/core';
import { ControlsComponent } from './controls.component';
import { SelectorThemeComponent } from './selector-theme.component';
import { BrowserModule } from '@angular/platform-browser';
import { SelectorLayersComponent } from './selector-layers.component';
import { SelectorStarsMagnitudeComponent } from './selector-stars-magnitude.component';
import { CameraControlsComponent } from './camera-controls.component';
import { FormsModule } from '@angular/forms';
import { ViewportModule } from '../viewport/viewport.module';
import { GoToComponent } from './go-to.component';

@NgModule({
  declarations: [
    ControlsComponent,
    SelectorThemeComponent,
    SelectorLayersComponent,
    SelectorStarsMagnitudeComponent,
    CameraControlsComponent,
    GoToComponent
  ],
  exports: [
    ControlsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ViewportModule // TODO should not be imported here
  ],
  providers: [
    ControlsComponent,
    SelectorThemeComponent,
    SelectorLayersComponent,
    SelectorStarsMagnitudeComponent,
    GoToComponent
  ]
})
export class ControlsModule {

}
