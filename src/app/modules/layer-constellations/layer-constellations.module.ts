import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeNgImportsModule } from 'src/app/primeng-imports.module';
import { CoreModule } from '#core/core.module';
import { ConstellationsProvidersService } from '#layer-constellations/services/constellations-providers.service';
import { LayerConstellationsControlsComponent } from '#layer-constellations/components/layer-constellations-controls/layer-constellations-controls.component';
import { ConstellationsLayerFactoryService } from '#layer-constellations/services/factories/constellations-layer-factory.service';
import { ConstellationsVisibilityManagerService } from '#layer-constellations/services/visibility/constellations-visibility-manager.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    CoreModule,
    PrimeNgImportsModule
  ],
  providers: [
    ConstellationsLayerFactoryService,
    ConstellationsProvidersService,
    ConstellationsVisibilityManagerService
  ],
  declarations: [
    LayerConstellationsControlsComponent
  ],
  exports: [
    LayerConstellationsControlsComponent
  ]
})
export class LayerConstellationsModule {

}
