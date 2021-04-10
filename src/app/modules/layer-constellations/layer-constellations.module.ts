import { NgModule } from '@angular/core';
import { CoreModule } from '#core/core.module';
import { ConstellationsProvidersService } from '#layer-constellations/services/constellations-providers.service';
import { BoundariesLayerFactoryService } from '#layer-constellations/services/factories/boundaries-layer-factory.service';
import { LinesLayerFactoryService } from '#layer-constellations/services/factories/lines-layer-factory.service';
import { NamesLayerFactoryService } from '#layer-constellations/services/factories/names-layer-factory.service';

@NgModule({
  imports: [
    CoreModule
  ],
  providers: [
    BoundariesLayerFactoryService,
    LinesLayerFactoryService,
    NamesLayerFactoryService,
    ConstellationsProvidersService
  ]
})
export class LayerConstellationsModule {

}
