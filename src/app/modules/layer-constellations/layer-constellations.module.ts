import { NgModule } from '@angular/core';
import { CoreModule } from '#core/core.module';
import { LayerFactoryAware } from '#core/models/layers/factories/layer-factory-aware';
import { LayerFactory } from '#core/models/layers/factories/layer-factory';
import { Layer } from '#core/models/layers/layer';
import { ConstellationBoundariesLayerFactory } from '#layer-constellations/models/constellation-boundaries-layer-factory';
import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { ConstellationLinesLayerFactory } from '#layer-constellations/models/constellation-lines-layer-factory';
import { ConstellationNamesLayerFactory } from '#layer-constellations/models/constellation-names-layer-factory';
import { AggregateLayerFactory } from '#core/models/layers/factories/aggregate-layer-factory';

@NgModule({
  imports: [
    CoreModule
  ]
})
export class LayerConstellationsModule implements LayerFactoryAware {

  public getLayerFactory(model: Layer): LayerFactory {
    switch (model?.code) {
      case 'constellations':
        return new AggregateLayerFactory(model);
      case 'constellation-boundaries':
        return new ConstellationBoundariesLayerFactory(model, new AxialCurvesFactory());
      case 'constellation-lines':
        return new ConstellationLinesLayerFactory(model, new AxialCurvesFactory());
      case 'constellation-names':
        return new ConstellationNamesLayerFactory(model);
      default:
        return undefined;
    }
  }

}
