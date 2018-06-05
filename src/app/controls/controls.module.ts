import { NgModule } from '@angular/core';
import { ControlsComponent } from './controls.component';
import { SelectorThemeComponent } from './selector-theme.component';
import { BrowserModule } from '@angular/platform-browser';
import { SelectorLayersComponent } from './selector-layers.component';
import { CameraControlsComponent } from './camera-controls.component';
import { FormsModule } from '@angular/forms';
import { GoToComponent } from './go-to.component';
import { SelectorLayersStarsComponent } from './selector-layers-stars.component';

@NgModule({
  declarations: [
    ControlsComponent,
    SelectorThemeComponent,
    SelectorLayersComponent,
    SelectorLayersStarsComponent,
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
    SelectorThemeComponent,
    SelectorLayersComponent,
    SelectorLayersStarsComponent,
    GoToComponent
  ]
})
export class ControlsModule {

}
