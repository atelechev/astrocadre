import { NgModule } from '@angular/core';
import { ViewportComponent } from './viewport.component';
import { ViewportEventService } from './viewport-event.service';

@NgModule({
  declarations: [
    ViewportComponent
  ],
  exports: [
    ViewportComponent
  ],
  imports: [],
  providers: [
    ViewportComponent,
    ViewportEventService
  ]
})
export class ViewportModule {

}
