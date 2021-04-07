import { NgModule } from '@angular/core';
import { CoreModule } from '#core/core.module';
import { LayerFactoryAware } from '#core/models/layers/factories/layer-factory-aware';
import { LayerFactory } from '#core/models/layers/factories/layer-factory';
import { Layer } from '#core/models/layers/layer';
import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { SkyGridLayerFactory } from '#layer-sky-grid/models/sky-grid-layer-factory';

@NgModule({
  imports: [
    CoreModule
  ]
})
export class LayerSkyGridModule implements LayerFactoryAware {

  public getLayerFactory(model: Layer): LayerFactory {
    return model?.code === 'sky-grid' ? new SkyGridLayerFactory(model, new AxialCurvesFactory()) : undefined;
  }

}
