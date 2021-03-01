import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CameraControlsComponent } from '#controls/components/camera-controls/camera-controls.component';
import { ControlsComponent } from '#controls/components/controls/controls.component';
import { GoToComponent } from '#controls/components/go-to/go-to.component';
import { SelectorLayersStarsComponent } from '#controls/components/selector-layers-stars/selector-layers-stars.component';
import { SelectorLayersComponent } from '#controls/components/selector-layers/selector-layers.component';
import { SelectorThemeComponent } from '#controls/components/selector-theme/selector-theme.component';
import { SelectorViewportSizeComponent } from '#controls/components/selector-viewport-size/selector-viewport-size.component';

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
