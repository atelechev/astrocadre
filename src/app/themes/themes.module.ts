import { NgModule } from '@angular/core';
import { ThemesComponent } from './themes.component';
import { ThemesService } from './themes.service';
import { HttpModule } from '@angular/Http';

@NgModule({
  declarations: [
    ThemesComponent
  ],
  imports: [
    HttpModule
  ],
  exports: [
    ThemesComponent
  ],
  providers: [
    ThemesComponent,
    ThemesService
  ]
})
export class ThemesModule {

}
