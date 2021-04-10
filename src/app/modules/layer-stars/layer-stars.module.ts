import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeNgImportsModule } from 'src/app/primeng-imports.module';
import { CoreModule } from '#core/core.module';
import { StarsVisibilityManagerService } from '#layer-stars/services/visibility/stars-visibility-manager.service';
import { SelectorStarNamesComponent } from '#layer-stars/components/selector-star-names/selector-star-names.component';
import { SelectorStarMagnitudeComponent } from '#layer-stars/components/selector-star-magnitude/selector-star-magnitude.component';
import { StarsProvidersService } from '#layer-stars/services/stars-providers.service';
import { StarsLayerFactoryService } from '#layer-stars/services/factories/stars-layer-factory.service';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    CoreModule,
    PrimeNgImportsModule
  ],
  providers: [
    StarsLayerFactoryService,
    StarsProvidersService,
    StarsVisibilityManagerService
  ],
  declarations: [
    SelectorStarMagnitudeComponent,
    SelectorStarNamesComponent
  ],
  exports: [
    SelectorStarMagnitudeComponent,
    SelectorStarNamesComponent
  ]
})
export class LayerStarsModule {

}
