import { NgModule } from '@angular/core';
import { ConstellationsService } from './constellations.service';
import { SkyGridComponent } from './sky-grid.component';
import { ConstellationBoundariesComponent } from './constellation-boundaries.component';
import { ConstellationLinesComponent } from './constellation-lines.component';

@NgModule({
  declarations: [
    SkyGridComponent,
    ConstellationBoundariesComponent,
    ConstellationLinesComponent
  ],
  providers: [
    SkyGridComponent,
    ConstellationBoundariesComponent,
    ConstellationLinesComponent,
    ConstellationsService
  ]
})
export class LayersModule {

}
