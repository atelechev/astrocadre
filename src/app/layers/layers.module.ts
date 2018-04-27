import { NgModule } from '@angular/core';
import { LayersComponent } from './layers.component';
import { StarsService } from './stars.service';

@NgModule({
  declarations: [
    LayersComponent
  ],
  exports: [
    LayersComponent
  ],
  providers: [
    LayersComponent,
    StarsService
  ]
})
export class LayersModule {

}
