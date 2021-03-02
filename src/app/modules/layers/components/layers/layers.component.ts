import { Component, OnInit } from '@angular/core';
import { Layers } from '#core/models/layers';
import { RenderableLayer } from '#core/models/renderable-layer';
import { Theme } from '#core/models/theme';
import { ThemeAware } from '#core/models/theme-aware';
import { TreeNode } from '#core/models/tree-node';
import { LayersEventService } from '#core/services/layers-event.service';
import { LayersTreeValidator } from '#core/services/layers-tree-validator';
import { StaticDataService } from '#core/services/static-data.service';
import { LayersFactoryService } from '#layers/services/layers-factory.service';
import { StarsMagnitudeLayer } from '#layers/models/stars-magnitude-layer';

@Component({
  selector: 'ac-layers',
  template: ``
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
      .map(layer => layer as StarsMagnitudeLayer);
  }

  public useTheme(theme: Theme): void {
    this.loadedLayers.forEach((layer: RenderableLayer, key: string) => {
      layer.useTheme(theme);
    });
  }

  public updateLayerVisibility(node: TreeNode): void {
    const layer = this.getLayer(node.code);
    if (layer) {
      this.updateHierachicalVisibility(layer, node.selected);
    }
  }

  public ensureStarMagnitudesVisibleDownTo(magnitude: number): void {
    const starsLayer = this.getLayer(Layers.STARS);
    if (starsLayer) {
      this.collectChildren(starsLayer)
        .filter(layer => layer instanceof StarsMagnitudeLayer)
        .map(layer => layer as StarsMagnitudeLayer)
        .forEach(layer => {
          const visible = layer.magClass <= magnitude;
          layer.setVisible(visible);
        });
    }
  }

  public ngOnInit(): void {
    this.subscribeLayerLoadRequestEvent();
  }

  private loadLayers(): void {
    this.dataService.getAvailableLayers().subscribe(
      (rootLayer: TreeNode) => {
        this.layersTreeValidator.validateTree(rootLayer);
        const rootCopy = TreeNode.from(rootLayer);
        this.layersEventService.layersTreeLoaded(rootCopy);
        rootCopy.nodes.forEach(layer => this.loadLayer(layer));
      },
      (error) => console.error(`Failed to load layers from source data: ${error}`)
    );
  }

  private loadLayer(layer: TreeNode): void {
    this.layersFactory.newRenderableLayer(layer).subscribe(
      (loadedLayer: RenderableLayer) => {
        this.loadedLayers.set(loadedLayer.getName(), loadedLayer);
        this.layersEventService.layerLoaded(loadedLayer.getName());
        if (layer.nodes) {
          layer.nodes.forEach(subLayer => this.loadLayer(subLayer));
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

}
