import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SkyViewComponent } from './core/sky-view.component';
import { LayersModule } from './layers/layers.module';
import { HttpModule } from '@angular/Http';
import { ThemesModule } from './themes/themes.module';
import { ControlsComponent } from './core/controls.component';


@NgModule({
  declarations: [
    ControlsComponent,
    SkyViewComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ThemesModule,
    LayersModule
  ],
  providers: [],
  bootstrap: [ SkyViewComponent ]
})
export class AppModule {

}
