import { NgModule } from '@angular/core';
import { ConstellationBoundaryService } from './constellation-boundaries.service';
import { AxesComponent } from './axes.component';
import { SkyGridComponent } from './sky-grid.component';
import { ConstellationBoundariesComponent } from './constellation-boundaries.component';

@NgModule({
  declarations: [
    AxesComponent,
    SkyGridComponent,
    ConstellationBoundariesComponent
  ],
  providers: [
    SkyGridComponent,
    AxesComponent,
    ConstellationBoundariesComponent,
    ConstellationBoundaryService
  ]
})
export class LayersModule {

}
