import { NgModule } from '@angular/core';
import { SolarSystemProvidersService } from '#layer-solar-system/services/solar-system-providers.service';
import { CoreModule } from '#core/core.module';
import { SolarSystemLayerFactoryService } from '#layer-solar-system/services/factories/solar-system-layer-factory.service';
import { ApparentTrajectoryFactoryService } from '#layer-solar-system/services/factories/apparent-trajectory-factory.service';


@NgModule({
  imports: [
    CoreModule
  ],
  providers: [
    ApparentTrajectoryFactoryService,
    SolarSystemProvidersService,
    SolarSystemLayerFactoryService
  ]
})
export class LayerSolarSystemModule {

}
