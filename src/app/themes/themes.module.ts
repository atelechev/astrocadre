import { NgModule } from '@angular/core';
import { ThemesComponent } from './themes.component';
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
    ThemesComponent
  ]
})
export class ThemesModule {

}
