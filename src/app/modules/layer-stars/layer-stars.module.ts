import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeNgImportsModule } from 'src/app/primeng-imports.module';
import { CoreModule } from '#core/core.module';
import { StarsVisibilityManagerService } from '#layer-stars/services/stars-visibility-manager.service';
import { SelectorStarNamesComponent } from '#layer-stars/components/selector-star-names/selector-star-names.component';
import { SelectorStarMagnitudeComponent } from '#layer-stars/components/selector-star-magnitude/selector-star-magnitude.component';
import { LayerFactoryAware } from '#core/models/layers/factories/layer-factory-aware';
import { Layer } from '#core/models/layers/layer';
import { LayerFactory } from '#core/models/layers/factories/layer-factory';
import { StarsLayerFactory } from '#layer-stars/models/stars-layer-factory';
import { PointsFactory } from '#core/models/layers/factories/points-factory';
import { AggregateLayerFactory } from '#core/models/layers/factories/aggregate-layer-factory';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    CoreModule,
    PrimeNgImportsModule
  ],
  providers: [
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
export class LayerStarsModule implements LayerFactoryAware {

  public getLayerFactory(model: Layer): LayerFactory {
    if (model?.code.startsWith('stars')) {
      return new StarsLayerFactory(model, new PointsFactory());
    }
    return undefined;
  }

}
