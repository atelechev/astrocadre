import { NgModule } from '@angular/core';
import { CoreComponent } from './core.component';
import { ThemesEventService } from './theme/themes-event.service';
import { ViewportEventService } from './viewport/viewport-event.service';

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
    ViewportEventService
  ]
})
export class CoreModule {

}
