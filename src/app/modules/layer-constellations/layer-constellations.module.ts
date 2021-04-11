import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeNgImportsModule } from 'src/app/primeng-imports.module';
import { CoreModule } from '#core/core.module';
import { ConstellationsProvidersService } from '#layer-constellations/services/constellations-providers.service';
import { BoundariesLayerFactoryService } from '#layer-constellations/services/factories/boundaries-layer-factory.service';
import { LinesLayerFactoryService } from '#layer-constellations/services/factories/lines-layer-factory.service';
import { NamesLayerFactoryService } from '#layer-constellations/services/factories/names-layer-factory.service';
import { LayerConstellationsControlsComponent } from '#layer-constellations/components/layer-constellations-controls/layer-constellations-controls.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    CoreModule,
    PrimeNgImportsModule
  ],
  providers: [
    BoundariesLayerFactoryService,
    LinesLayerFactoryService,
    NamesLayerFactoryService,
    ConstellationsProvidersService
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
