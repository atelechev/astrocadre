import { Injectable } from '@angular/core';
import { AggregateLayerFactory } from '#core/models/layers/factories/aggregate-layer-factory';
import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { ConstellationBoundariesLayerFactory } from '#layer-constellations/models/constellation-boundaries-layer-factory';
import { ConstellationLinesLayerFactory } from '#layer-constellations/models/constellation-lines-layer-factory';
import { ConstellationNamesLayerFactory } from '#layer-constellations/models/constellation-names-layer-factory';
import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { LayerFactory } from '#core/models/layers/factories/layer-factory';
import { LayersProvider } from '#core/models/layers/layers-provider';


@Injectable()
export class ConstellationsProvidersService implements LayersProvider {

  public getRenderableLayer(model: Layer): RenderableLayer {
    const factory = this.getLayerFactory(model?.code);
    return factory?.buildRenderableLayer(model);
  }

  private getLayerFactory(code: string): LayerFactory {
    switch (code) {
      case 'constellations':
        return new AggregateLayerFactory();
      case 'constellation-boundaries':
        return new ConstellationBoundariesLayerFactory(new AxialCurvesFactory());
      case 'constellation-lines':
        return new ConstellationLinesLayerFactory(new AxialCurvesFactory());
      case 'constellation-names':
        return new ConstellationNamesLayerFactory();
      default:
        return undefined;
    }
  }

}
