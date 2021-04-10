import { NgModule } from '@angular/core';
import { CoreModule } from '#core/core.module';
import { SkyGridProvidersService } from '#layer-sky-grid/services/sky-grid-providers.service';
import { SkyGridLayerFactoryService } from '#layer-sky-grid/services/factories/sky-grid-layer-factory.service';

@NgModule({
  imports: [
    CoreModule
  ],
  providers: [
    SkyGridProvidersService,
    SkyGridLayerFactoryService
  ]
})
export class LayerSkyGridModule {

}
