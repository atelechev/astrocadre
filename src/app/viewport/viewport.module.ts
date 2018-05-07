import { NgModule } from '@angular/core';
import { ViewportComponent } from './viewport.component';
import { ViewportService } from './viewport.service';

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
    ViewportService
  ]
})
export class ViewportModule {

}
