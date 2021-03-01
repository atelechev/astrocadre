import { NgModule } from '@angular/core';
import { LayersComponent } from '#layers/components/layers/layers.component';
import { LayersFactoryService } from '#layers/services/layers-factory.service';
import { PointsFactory } from '#layers/services/points-factory';
import { LinesFactory } from '#layers/services/lines-factory';
import { AxialCurvesFactory } from '#layers/services/axial-curves-factory';
import { SkyGridLayerFactory } from '#layers/services/sky-grid-layer-factory';
import { RenderableLayerFactory } from '#layers/services/renderable-layer-factory';
import { ConstellationBoundariesLayerFactory } from '#layers/services/constellation-boundaries-layer-factory';
import { ConstellationLinesLayerFactory } from '#layers/services/constellation-lines-layer-factory';
import { ConstellationNamesLayerFactory } from '#layers/services/constellation-names-layer-factory';
import { StarsMagnitudeLayerFactory } from '#layers/services/stars-magnitude-layer-factory';

@NgModule({
  declarations: [
    LayersComponent
  ],
  exports: [
    LayersComponent
  ],
  providers: [
    LayersFactoryService,
    PointsFactory,
    LinesFactory,
    AxialCurvesFactory,
    SkyGridLayerFactory,
    RenderableLayerFactory,
    ConstellationBoundariesLayerFactory,
    ConstellationLinesLayerFactory,
    ConstellationNamesLayerFactory,
    StarsMagnitudeLayerFactory
  ]
})
export class LayersModule {

}
