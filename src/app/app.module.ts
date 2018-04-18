import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { SkyViewComponent } from './core/sky-view.component';
import { LayersModule } from './layers/layers.module';


@NgModule({
  declarations: [
    SkyViewComponent
  ],
  imports: [
    BrowserModule,
    LayersModule
  ],
  providers: [],
  bootstrap: [ SkyViewComponent ]
})
export class AppModule {

}
