import { NgModule } from '@angular/core';
import { ConstellationBoundaryService } from './constellation-boundaries.service';
import { SkyGridComponent } from './sky-grid.component';
import { ConstellationBoundariesComponent } from './constellation-boundaries.component';

@NgModule({
  declarations: [
    SkyGridComponent,
    ConstellationBoundariesComponent
  ],
  providers: [
    SkyGridComponent,
    ConstellationBoundariesComponent,
    ConstellationBoundaryService
  ]
})
export class LayersModule {

}
