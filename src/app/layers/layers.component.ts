import { Component, OnInit } from '@angular/core';
import { RenderableLayer } from '../core/layer/renderable-layer';
import { ThemeAware } from '../core/theme/theme-aware';
import { Theme } from '../core/theme/theme';
import { LayersFactoryService } from './layers-factory.service';
import { LayersEventService } from '../core/layer/layers-event.service';
import { LayerVisibility } from '../core/layer/layer-visibility';
import { TreeNode } from '../core/tree-node';
import { Layers } from '../core/layers';
import { StarsMagnitudeLayer } from './stars-magnitude-layer';
import { PointsFactory } from './geometry/points-factory';
import { LinesFactory } from './geometry/lines-factory';
import { AxialCurvesFactory } from './geometry/axial-curves-factory';
import { SkyGridLayerFactory } from './sky-grid-layer-factory';
import { RenderableLayerFactory } from './renderable-layer-factory';
import { ConstellationBoundariesLayerFactory } from './constellation-boundaries-layer-factory';
import { ConstellationLinesLayerFactory } from './constellation-lines-layer-factory';
import { ConstellationNamesLayerFactory } from './constellation-names-layer-factory';
import { StarsMagnitudeLayerFactory } from './stars-magnitude-layer-factory';
import { StaticDataService } from '../core/static-data-service';
import { LayersTreeValidator } from '../core/layer/layers-tree-validator';

@Component({
  selector: 'app-astrocadre-layers',
  template: ``,
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
export class LayersComponent implements ThemeAware, OnInit {


  private loadedLayers: Map<string, RenderableLayer>;

  constructor(private layersFactory: LayersFactoryService,
              private layersEventService: LayersEventService,
              private dataService: StaticDataService,
              private layersTreeValidator: LayersTreeValidator) {
    this.loadedLayers = new Map<string, RenderableLayer>();
    this.loadLayers();
  }

  public getLayers(): Array<RenderableLayer> {
    return Array.from(this.loadedLayers.values());
  }

  public getLayer(layer: string): RenderableLayer {
    return this.loadedLayers.get(layer);
  }

  public getStarsMagnitudeLayers(): Array<StarsMagnitudeLayer> {
    return Array.from(this.loadedLayers.values())
                .filter(layer => layer instanceof StarsMagnitudeLayer)
                .map(layer => <StarsMagnitudeLayer> layer);
  }

  public useTheme(theme: Theme): void {
    this.loadedLayers.forEach((layer: RenderableLayer, key: string) => {
      layer.useTheme(theme);
    });
  }

  private loadLayers(): void {
    this.dataService.getAvailableLayers().subscribe(
      (rootLayer: TreeNode) => {
        this.layersTreeValidator.validateTree(rootLayer);
        const rootCopy = TreeNode.from(rootLayer);
        this.layersEventService.layersTreeLoaded(rootCopy);
        rootCopy.children.forEach(layer => this.loadLayer(layer));
      },
      (error) => console.error(`Failed to load layers from source data: ${error}`)
    );
  }

  private loadLayer(layer: TreeNode): void {
    this.layersFactory.newRenderableLayer(layer).subscribe(
      (loadedLayer: RenderableLayer) => {
        this.loadedLayers.set(loadedLayer.getName(), loadedLayer);
        this.layersEventService.layerLoaded(loadedLayer.getName());
        if (layer.children) {
          layer.children.forEach(subLayer => this.loadLayer(subLayer));
        }
      },
      (error) => console.error(`Failed to load layer '${layer.code}': ${error}`)
    );
  }

  private updateHierachicalVisibility(layer: RenderableLayer, visible: boolean): void {
    layer.setVisible(visible);
    this.collectChildren(layer).forEach(child => this.updateHierachicalVisibility(child, visible));
  }

  private collectChildren(layer: RenderableLayer): Array<RenderableLayer> {
    return Array.from(this.loadedLayers.values()).filter(l => l.isChildOf(layer));
  }

  private subscribeLayerLoadRequestEvent(): void {
    this.layersEventService.requestLayerLoad$.subscribe(
      (layer: TreeNode) => this.loadLayer(layer)
    );
  }

  public updateLayerVisibility(lv: LayerVisibility): void {
    const layer = this.getLayer(lv.layer);
    if (layer) {
      this.updateHierachicalVisibility(layer, lv.visible);
    }
  }

  public ensureStarMagnitudesVisibleDownTo(magnitude: number): void {
    const starsLayer = this.getLayer(Layers.STARS);
    if (starsLayer) {
      this.collectChildren(starsLayer)
          .filter(layer => layer instanceof StarsMagnitudeLayer)
          .map(layer => <StarsMagnitudeLayer> layer)
          .forEach(layer => {
            const visible = layer.magClass <= magnitude;
            layer.setVisible(visible);
          });
    }
  }

  public ngOnInit(): void {
    this.subscribeLayerLoadRequestEvent();
  }

}
