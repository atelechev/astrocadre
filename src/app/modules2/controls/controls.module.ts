import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ControlsComponent } from 'src/app/modules2/controls/components/controls/controls.component';
import { SelectorThemeComponent } from 'src/app/modules2/controls/components/selector-theme/selector-theme.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    ControlsComponent,
    SelectorThemeComponent
  ],
  exports: [
    ControlsComponent
  ]
})
export class ControlsModule {

}
