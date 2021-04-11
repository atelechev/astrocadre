import { Injectable, Type } from '@angular/core';
import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { BoundariesLayerFactoryService } from '#layer-constellations/services/factories/boundaries-layer-factory.service';
import { LinesLayerFactoryService } from '#layer-constellations/services/factories/lines-layer-factory.service';
import { NamesLayerFactoryService } from '#layer-constellations/services/factories/names-layer-factory.service';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { LayersProvider } from '#core/models/layers/layers-provider';
import { AggregateLayerFactoryService } from '#core/services/factories/aggregate-layer-factory.service';
import { LayerAware } from '#core/models/layers/layer-aware';
import { LayerConstellationsControlsComponent } from '#layer-constellations/components/layer-constellations-controls/layer-constellations-controls.component';


@Injectable()
export class ConstellationsProvidersService implements LayersProvider {

  constructor(
    private readonly _aggregateLayerFactory: AggregateLayerFactoryService,
    private readonly _boundariesLayerFactory: BoundariesLayerFactoryService,
    private readonly _linesLayerFactory: LinesLayerFactoryService,
    private readonly _namesLayerFactory: NamesLayerFactoryService
  ) {

  }

  public getRenderableLayer(model: Layer): RenderableLayer {
    const factory = this.getLayerFactory(model?.code);
    return factory?.buildRenderableLayer(model);
  }

  public getUiControlsComponentType(model: Layer): Type<LayerAware> {
    if (model?.code === 'constellations') {
      return LayerConstellationsControlsComponent;
    }
    return undefined;
  }

  private getLayerFactory(code: string): LayerFactory {
    switch (code) {
      case 'constellations':
        return this._aggregateLayerFactory;
      case 'constellation-boundaries':
        return this._boundariesLayerFactory;
      case 'constellation-lines':
        return this._linesLayerFactory;
      case 'constellation-names':
        return this._namesLayerFactory;
      default:
        return undefined;
    }
  }

}
