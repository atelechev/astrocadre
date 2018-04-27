import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/Http';
import { CoreModule } from './core/core.module';
import { ControlsModule } from './controls/controls.module';
import { ThemesModule } from './themes/themes.module';
import { ViewportModule } from './viewport/viewport.module';
import { LayersModule } from './layers/layers.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CoreModule,
    ThemesModule,
    LayersModule,
    ControlsModule,
    ViewportModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
