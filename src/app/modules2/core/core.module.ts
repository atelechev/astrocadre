import { NgModule } from '@angular/core';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { StaticDataService } from 'src/app/modules2/core/services/static-data.service';
import { ThemeService } from 'src/app/modules2/core/services/theme.service';

@NgModule({
  providers: [
    EventsService,
    StaticDataService,
    ThemeService
  ]
})
export class CoreModule {

}
