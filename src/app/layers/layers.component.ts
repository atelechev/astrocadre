import { Component, OnInit } from '@angular/core';
import { RenderableLayer } from '../core/renderable-layer';
import { ThemeAware } from '../core/theme-aware';
import { Theme } from '../core/theme';
import { LayersFactoryService } from './layers-factory.service';
import { StarsLayer } from './stars-layer';
import { LayersEventService } from './layers-event.service';
import { LayerVisibility } from '../core/layer-visibility';
import { ItemsTreeNode } from '../core/items-tree-node';
import { Layers } from '../core/layers';
import { StarsMagnitudeLayer } from './stars-magnitude-layer';

@Component({
  selector: 'app-sky-view-layers',
  template: ``,
  providers: [
    LayersFactoryService
  ]
})
export class LayersComponent implements ThemeAware, OnInit {


  private loadedLayers: Map<string, RenderableLayer>;

  constructor(private layersFactory: LayersFactoryService,
              private layersEventService: LayersEventService) {
    this.loadedLayers = new Map<string, RenderableLayer>();
  }

  public getLayer(layer: string): RenderableLayer {
    return this.loadedLayers.get(layer);
  }

  public useTheme(theme: Theme): void {
    this.loadedLayers.forEach((layer: RenderableLayer, key: string) => {
      layer.useTheme(theme);
    });
  }

  private loadLayer(layer: ItemsTreeNode): void {
    this.layersFactory.newRenderableLayer(layer).subscribe(
      (loadedLayer: RenderableLayer) => {
        this.loadedLayers.set(loadedLayer.getName(), loadedLayer);
        this.layersEventService.layerLoaded(loadedLayer.getName());
      },
      (error) => console.error(`Failed to load layer '${layer}': ${error}`)
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
      (layer: ItemsTreeNode) => this.loadLayer(layer)
    );
  }

  private subscribeLayerVisibilityRequestEvent(): void {
    this.layersEventService.requestLayerVisibility$.subscribe(
      (lv: LayerVisibility) => {
        const layer = this.getLayer(lv.layer);
        if (layer) {
          this.updateHierachicalVisibility(layer, lv.visible);
        }
      }
    );
  }

  private subscribeStarsMagnitudeRequestEvent(): void {
    this.layersEventService.requestStarsMagnitude$.subscribe(
      (magnitude: number) => this.ensureStarMagnitudesVisibleDownTo(magnitude)
    );
  }

  private ensureStarMagnitudesVisibleDownTo(magnitude: number): void {
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
    this.subscribeLayerVisibilityRequestEvent();
    this.subscribeStarsMagnitudeRequestEvent();
  }

}
