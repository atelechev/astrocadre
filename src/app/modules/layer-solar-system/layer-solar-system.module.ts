import { NgModule } from '@angular/core';
import { SolarSystemProvidersService } from '#layer-solar-system/services/solar-system-providers.service';
import { CoreModule } from '#core/core.module';
import { SolarSystemLayerFactoryService } from '#layer-solar-system/services/factories/solar-system-layer-factory.service';
import { ApparentTrajectoryFactoryService } from '#layer-solar-system/services/factories/apparent-trajectory-factory.service';
import { SelectorSolarSystemObjectsComponent } from '#layer-solar-system/components/selector-solar-system-objects/selector-solar-system-objects.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PrimeNgImportsModule } from 'src/app/primeng-imports.module';
import { PathsVisibilityManagerService } from '#layer-solar-system/services/visibility/paths-visibility-manager.service';


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
    SolarSystemProvidersService,
    SolarSystemLayerFactoryService
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
