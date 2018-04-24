import { NgModule } from '@angular/core';
import { ThemesComponent } from './themes.component';
import { ThemesService } from './themes.service';

@NgModule({
  declarations: [
    ThemesComponent
  ],
  providers: [
    ThemesComponent,
    ThemesService
  ]
})
export class ThemesModule {

}
