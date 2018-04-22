import { NgModule } from '@angular/core';
import { StarsService } from './stars.service';
import { SkyGridComponent } from './sky-grid.component';
import { ConstellationBoundariesComponent } from './constellation-boundaries.component';
import { ConstellationLinesComponent } from './constellation-lines.component';
import { StarsComponent } from './stars.component';

@NgModule({
  declarations: [
    SkyGridComponent,
    ConstellationBoundariesComponent,
    ConstellationLinesComponent,
    StarsComponent
  ],
  providers: [
    SkyGridComponent,
    ConstellationBoundariesComponent,
    ConstellationLinesComponent,
    StarsComponent,
    StarsService
  ]
})
export class LayersModule {

}
