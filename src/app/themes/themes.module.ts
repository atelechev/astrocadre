import { NgModule } from '@angular/core';
import { ThemesComponent } from './themes.component';
import { ThemeDevService } from './theme-dev.service';
import { ThemeSkyChartService } from './theme-skychart.service';

@NgModule({
  declarations: [
    ThemesComponent
  ],
  providers: [
    ThemesComponent,
    ThemeDevService,
    ThemeSkyChartService
  ]
})
export class ThemesModule {

}