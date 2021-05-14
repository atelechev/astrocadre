import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeNgImportsModule } from 'src/app/primeng-imports.module';
import { SolarSystemProvidersService } from '#layer-solar-system/services/solar-system-providers.service';
import { CoreModule } from '#core/core.module';
import { SolarSystemLayerFactoryService } from '#layer-solar-system/services/factories/solar-system-layer-factory.service';
import { ApparentTrajectoryFactoryService } from '#layer-solar-system/services/factories/apparent-trajectory-factory.service';
import { SelectorSolarSystemObjectsComponent } from '#layer-solar-system/components/selector-solar-system-objects/selector-solar-system-objects.component';
import { PathsVisibilityManagerService } from '#layer-solar-system/services/visibility/paths-visibility-manager.service';
import { PositionCalculationService } from '#layer-solar-system/services/position-calculation.service';
import { TimeService } from '#layer-solar-system/services/time.service';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    CoreModule,
    PrimeNgImportsModule
  ],
  providers: [
    ApparentTrajectoryFactoryService,
    PathsVisibilityManagerService,
    PositionCalculationService,
    SolarSystemProvidersService,
    SolarSystemLayerFactoryService,
    TimeService
  ],
  declarations: [
    SelectorSolarSystemObjectsComponent
  ],
  exports: [
    SelectorSolarSystemObjectsComponent
  ]
})
export class LayerSolarSystemModule {

}
