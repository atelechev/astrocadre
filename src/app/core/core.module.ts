import { NgModule } from '@angular/core';
import { CoreComponent } from './core.component';
import { ThemesEventService } from './theme/themes-event.service';

@NgModule({
  declarations: [
    CoreComponent
  ],
  exports: [
    CoreComponent
  ],
  providers: [
    CoreComponent,
    ThemesEventService
  ]
})
export class CoreModule {

}
