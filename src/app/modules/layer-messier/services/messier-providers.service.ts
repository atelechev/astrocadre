import { Injectable, Type } from '@angular/core';
import { SelectorMessierNamesComponent } from 'src/app/modules/layer-messier/components/selector-messier-names/selector-messier-names.component';
import { Messier } from 'src/app/modules/layer-messier/models/messier';
import { MessierLayerFactoryService } from 'src/app/modules/layer-messier/services/factories/messier-layer.factory.service';
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
    this._layerCode = 'messier';
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
