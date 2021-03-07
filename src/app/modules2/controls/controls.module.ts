import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ControlsComponent } from 'src/app/modules2/controls/components/controls/controls.component';
import { LayersComponent } from 'src/app/modules2/controls/components/layers/layers.component';
import { SelectorLayerComponent } from 'src/app/modules2/controls/components/selector-layer/selector-layer.component';
import { SelectorThemeComponent } from 'src/app/modules2/controls/components/selector-theme/selector-theme.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    ControlsComponent,
    LayersComponent,
    SelectorThemeComponent,
    SelectorLayerComponent
  ],
  exports: [
    ControlsComponent
  ]
})
export class ControlsModule {

}
