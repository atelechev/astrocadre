import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstellationBoundariesLayerFactory } from '#layers/services/constellation-boundaries-layer-factory';
import { ConstellationLinesLayerFactory } from '#layers/services/constellation-lines-layer-factory';
import { ConstellationNamesLayerFactory } from '#layers/services/constellation-names-layer-factory';
import { LayerFactory } from '#layers/services/layer-factory';
import { RenderableLayerFactory } from '#layers/services/renderable-layer-factory';
import { SkyGridLayerFactory } from '#layers/services/sky-grid-layer-factory';
import { StarsMagnitudeLayerFactory } from '#layers/services/stars-magnitude-layer-factory';
import { ensureArgDefined } from '#core/arg-validation-utils';
import { Layers } from '#core/layers';
import { TreeNode } from '#core/tree-node';
import { RenderableLayer } from '#core-layer/renderable-layer';

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

  public newRenderableLayer(layer: TreeNode): Observable<RenderableLayer> {
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

}
