import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { SkyViewComponent } from './core/sky-view.component';
import { LayersModule } from './layers/layers.module';
import { HttpModule } from '@angular/Http';


@NgModule({
  declarations: [
    SkyViewComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LayersModule
  ],
  providers: [],
  bootstrap: [ SkyViewComponent ]
})
export class AppModule {

}
