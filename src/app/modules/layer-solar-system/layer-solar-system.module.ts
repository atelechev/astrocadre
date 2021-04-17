import { NgModule } from '@angular/core';
import { SolarSystemProvidersService } from '#layer-solar-system/services/solar-system-providers.service';
import { CoreModule } from '#core/core.module';
import { SolarSystemLayerFactoryService } from '#layer-solar-system/services/factories/solar-system-layer-factory.service';
import { CelestialPlaneFactoryService } from '#layer-solar-system/services/factories/celestial-plane-factory.service';


@NgModule({
  imports: [
    CoreModule
  ],
  providers: [
    SolarSystemProvidersService,
    SolarSystemLayerFactoryService,
    CelestialPlaneFactoryService
  ]
})
export class LayerSolarSystemModule {

}
