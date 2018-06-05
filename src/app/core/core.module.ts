import { NgModule } from '@angular/core';
import { CoreComponent } from './core.component';
import { ThemesEventService } from './theme/themes-event.service';
import { ViewportEventService } from './viewport/viewport-event.service';
import { LayersEventService } from './layer/layers-event.service';
import { StaticDataService } from './static-data-service';
import { SearchService } from './search/search.service';

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
    SearchService
  ]
})
export class CoreModule {

}
