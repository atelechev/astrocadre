import { NgModule } from '@angular/core';
import { CoreModule } from '#core/core.module';
import { SkyGridProvidersService } from '#layer-sky-grid/services/sky-grid-providers.service';

@NgModule({
  imports: [
    CoreModule
  ],
  providers: [
    SkyGridProvidersService
  ]
})
export class LayerSkyGridModule {

}
