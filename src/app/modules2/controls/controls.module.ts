import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CameraControlsComponent } from 'src/app/modules2/controls/components/camera-controls/camera-controls.component';
import { ControlsComponent } from 'src/app/modules2/controls/components/controls/controls.component';
import { GoToComponent } from 'src/app/modules2/controls/components/go-to/go-to.component';
import { LayersComponent } from 'src/app/modules2/controls/components/layers/layers.component';
import { ResizeControlsComponent } from 'src/app/modules2/controls/components/resize-controls/resize-controls.component';
import { SelectorLayerComponent } from 'src/app/modules2/controls/components/selector-layer/selector-layer.component';
import { SelectorStarMagnitudeComponent } from 'src/app/modules2/controls/components/selector-star-magnitude/selector-star-magnitude.component';
import { SelectorStarNamesComponent } from 'src/app/modules2/controls/components/selector-star-names/selector-star-names.component';
import { SelectorThemeComponent } from 'src/app/modules2/controls/components/selector-theme/selector-theme.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    CameraControlsComponent,
    ControlsComponent,
    GoToComponent,
    LayersComponent,
    ResizeControlsComponent,
    SelectorStarMagnitudeComponent,
    SelectorStarNamesComponent,
    SelectorThemeComponent,
    SelectorLayerComponent
  ],
  exports: [
    ControlsComponent
  ]
})
export class ControlsModule {

}
