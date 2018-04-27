import { NgModule } from '@angular/core';
import { ControlsComponent } from './controls.component';
import { SelectorThemeComponent } from './selector-theme.component';
import { BrowserModule } from '@angular/platform-browser';
import { SelectorLayersComponent } from './selector-layers.component';
import { SelectorStarsMagnitudeComponent } from './selector-stars-magnitude.component';

@NgModule({
  declarations: [
    ControlsComponent,
    SelectorThemeComponent,
    SelectorLayersComponent,
    SelectorStarsMagnitudeComponent
  ],
  exports: [
    ControlsComponent
  ],
  imports: [
    BrowserModule
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
