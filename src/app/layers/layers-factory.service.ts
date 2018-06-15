import { Layers } from '../core/layers';
import { RenderableLayer } from '../core/layer/renderable-layer';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LayersTreeNode } from '../core/layer/layers-tree-node';
import { SkyGridLayerFactory } from './sky-grid-layer-factory';
import { RenderableLayerFactory } from './renderable-layer-factory';
import { ConstellationBoundariesLayerFactory } from './constellation-boundaries-layer-factory';
import { ConstellationLinesLayerFactory } from './constellation-lines-layer-factory';
import { ConstellationNamesLayerFactory } from './constellation-names-layer-factory';
import { StarsMagnitudeLayerFactory } from './stars-magnitude-layer-factory';
import { LayerFactory } from './layer-factory';
import { ensureArgDefined } from '../core/layer/arg-validation-utils';

/**
 * Wraps factories for supported layers.
 * Used as entry point to instantiate layers.
 */
@Injectable()
export class LayersFactoryService {

  private layerFactories: Map<string, LayerFactory<any>>;

  constructor(private renderableLayerFactory: RenderableLayerFactory,
              private skyGridLayerFactory: SkyGridLayerFactory,
              private constellationBoundariesLayerFactory: ConstellationBoundariesLayerFactory,
              private constellationLinesLayerFactory: ConstellationLinesLayerFactory,
              private constellationNamesLayerFactory: ConstellationNamesLayerFactory,
              private starsMagnitudeLayerFactory: StarsMagnitudeLayerFactory) {
     this.layerFactories = this.initLayerFactories();
  }

  private initLayerFactories(): Map<string, LayerFactory<any>> {
    const factories = new Map<string, LayerFactory<any>>();
    factories.set(Layers.CONSTELLATIONS, this.renderableLayerFactory);
    factories.set(Layers.STARS, this.renderableLayerFactory);
    factories.set(Layers.SKY_GRID, this.skyGridLayerFactory);
    factories.set(Layers.CONSTELLATION_BOUNDARIES, this.constellationBoundariesLayerFactory);
    factories.set(Layers.CONSTELLATION_LINES, this.constellationLinesLayerFactory);
    factories.set(Layers.CONSTELLATION_NAMES, this.constellationNamesLayerFactory);
    return factories;
  }

  private isStarMagnitudeLayer(layerName: string): boolean {
    return layerName && layerName.startsWith(StarsMagnitudeLayerFactory.LAYER_PREFIX);
  }

  public newRenderableLayer(layer: LayersTreeNode): Observable<RenderableLayer> {
    ensureArgDefined(layer, 'layer');
    if (this.isStarMagnitudeLayer(layer.code)) {
      return this.starsMagnitudeLayerFactory.newLayer(layer);
    }
    const factory = this.layerFactories.get(layer.code);
    if (factory) {
      return factory.newLayer(layer);
    }
    throw new Error(`Unsupported layer: ${layer.code}`);
  }

}
