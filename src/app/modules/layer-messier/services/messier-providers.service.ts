import { Injectable, Type } from '@angular/core';
import { MessierLayerFactoryService } from '#layer-messier/services/factories/messier-layer.factory.service';
import { Messier } from '#layer-messier/models/messier';
import { SelectorMessierNamesComponent } from '#layer-messier/components/selector-messier-names/selector-messier-names.component';
import { LayerAware } from '#core/models/layers/layer-aware';
import { LayerProvider } from '#core/models/layers/layer-provider';

/**
 * LayersProvider implementation for the LayerMessierModule.
 */
@Injectable()
export class MessierProvidersService implements LayerProvider {

  constructor(private readonly _messierLayerFactory: MessierLayerFactoryService) {

  }

  public get code(): string {
    return Messier.CODE;
  }

  public getRenderableLayer(): Promise<Messier> {
    return this._messierLayerFactory.buildRenderableLayer();
  }

  public getUiControlsComponentType(): Type<LayerAware> {
    return SelectorMessierNamesComponent;
  }

}
