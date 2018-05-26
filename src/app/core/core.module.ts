import { NgModule } from '@angular/core';
import { CoreComponent } from './core.component';
import { ThemesEventService } from './theme/themes-event.service';
import { ViewportEventService } from './viewport/viewport-event.service';
import { LayersEventService } from './layer/layers-event.service';

@NgModule({
  declarations: [
    CoreComponent
  ],
  exports: [
    CoreComponent
  ],
  providers: [
    CoreComponent,
    ThemesEventService,
    ViewportEventService,
    LayersEventService
  ]
})
export class CoreModule {

}
