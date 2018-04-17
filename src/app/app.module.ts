import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { SkyViewComponent } from './sky-view/sky-view.component';


@NgModule({
  declarations: [
    SkyViewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [ SkyViewComponent ]
})
export class AppModule {

}
