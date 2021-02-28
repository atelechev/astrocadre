import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ControlsComponent } from '#controls/controls.component';
import { SelectorThemeComponent } from '#controls/selector-theme.component';
import { SelectorLayersComponent } from '#controls/selector-layers.component';
import { CameraControlsComponent } from '#controls/camera-controls.component';
import { GoToComponent } from '#controls/go-to.component';
import { SelectorLayersStarsComponent } from '#controls/selector-layers-stars.component';
import { SelectorViewportSizeComponent } from '#controls/selector-viewport-size.component';

@NgModule({
  declarations: [
    ControlsComponent,
    SelectorThemeComponent,
    SelectorLayersComponent,
    SelectorLayersStarsComponent,
    CameraControlsComponent,
    GoToComponent,
    SelectorViewportSizeComponent
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
    GoToComponent,
    SelectorViewportSizeComponent
  ]
})
export class ControlsModule {

}
