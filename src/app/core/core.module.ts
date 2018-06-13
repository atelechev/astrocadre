import { NgModule } from '@angular/core';
import { CoreComponent } from './core.component';
import { ThemesEventService } from './theme/themes-event.service';
import { ViewportEventService } from './viewport/viewport-event.service';
import { LayersEventService } from './layer/layers-event.service';
import { StaticDataService } from './static-data-service';
import { SearchService } from './search/search.service';
import { LayersTreeValidator } from './controls/layers-tree-validator';
import { ViewportDimensionService } from './viewport/viewport-dimension.service';

@NgModule({
  declarations: [
    CoreComponent
  ],
  exports: [
    CoreComponent
  ],
  providers: [
    CoreComponent,
    StaticDataService,
    ThemesEventService,
    ViewportEventService,
    LayersEventService,
    SearchService,
    ViewportDimensionService
  ]
})
export class CoreModule {

}
