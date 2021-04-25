import { Injectable, Type } from '@angular/core';
import { MessierLayerFactoryService } from '#layer-messier/services/factories/messier-layer.factory.service';
import { Messier } from '#layer-messier/models/messier';
import { SelectorMessierNamesComponent } from '#layer-messier/components/selector-messier-names/selector-messier-names.component';
import { Layer } from '#core/models/layers/layer';
import { LayerAware } from '#core/models/layers/layer-aware';
import { LayersProvider } from '#core/models/layers/layers-provider';

/**
 * LayersProvider implementation for the LayerMessierModule.
 */
@Injectable()
export class MessierProvidersService implements LayersProvider {

  private readonly _layerCode: string;

  constructor(private readonly _messierLayerFactory: MessierLayerFactoryService) {
    this._layerCode = Messier.CODE;
  }

  public getRenderableLayer(model: Layer): Messier {
    if (model?.code === this._layerCode) {
      return this._messierLayerFactory.buildRenderableLayer(model);
    }
    return undefined;
  }

  public getUiControlsComponentType(model: Layer): Type<LayerAware> {
    if (model?.code === this._layerCode) {
      return SelectorMessierNamesComponent;
    }
    return undefined;
  }

}
