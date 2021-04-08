import { NgModule } from '@angular/core';
import { CoreModule } from '#core/core.module';
import { ConstellationsProvidersService } from '#layer-constellations/services/constellations-providers.service';

@NgModule({
  imports: [
    CoreModule
  ],
  providers: [
    ConstellationsProvidersService
  ]
})
export class LayerConstellationsModule {

}
