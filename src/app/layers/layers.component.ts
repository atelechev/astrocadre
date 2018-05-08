import { Component, OnInit } from '@angular/core';
import { RenderableLayer } from '../core/renderable-layer';
import { ThemeAware } from '../core/theme-aware';
import { Theme } from '../core/theme';
import { LayersFactoryService } from './layers-factory.service';
import { StarsLayer } from './stars-layer';
import { LayersEventService } from './layers-event.service';
import { LayerVisibility } from '../core/layer-visibility';

@Component({
  selector: 'app-sky-view-layers',
  template: ``,
  providers: [
    LayersFactoryService
  ]
})
export class LayersComponent implements ThemeAware, OnInit {


  private loadedLayers: Map<string, RenderableLayer>;

  private activeLayers: Set<string>;

  constructor(private layersFactory: LayersFactoryService,
              private layersEventService: LayersEventService) {
    this.loadedLayers = new Map<string, RenderableLayer>();
    this.activeLayers = new Set<string>();
  }

  public getLayer(layer: string): RenderableLayer {
    return this.loadedLayers.get(layer);
  }

  public useTheme(theme: Theme): void {
    this.loadedLayers.forEach((layer: RenderableLayer, key: string) => {
      layer.useTheme(theme);
    });
  }

  private loadLayer(layer: string): void {
    this.layersFactory.newRenderableLayer(layer).subscribe(
      (loadedLayer: RenderableLayer) => {
        this.loadedLayers.set(loadedLayer.getName(), loadedLayer);
        this.layersEventService.layerLoaded(loadedLayer.getName());
      },
      (error) => console.error(`Failed to load layer '${layer}': ${error}`)
    );
  }

  private setVisible(code: string, visible: boolean): void {
    const layer = this.getLayer(code);
    if (layer) {
      layer.setVisible(visible);
    }
  }

  private updateLayersVisibility(): void {
    this.loadedLayers.forEach((layer: RenderableLayer, code: string) => {
      const visible = this.activeLayers.has(code);
      layer.setVisible(visible);
    });
  }

  private subscribeLayerLoadRequestEvent(): void {
    this.layersEventService.requestLayerLoad$.subscribe(
      (code: string) => this.loadLayer(code)
    );
  }

  private subscribeLayerVisibilityRequestEvent(): void {
    this.layersEventService.requestLayerVisibility$.subscribe(
      (lv: LayerVisibility) => {
        if (lv.visible) {
          this.activeLayers.add(lv.layer);
        } else {
          this.activeLayers.delete(lv.layer);
        }
        this.updateLayersVisibility();
      }
    );
  }

  private subscribeLayerLoadedEvent(): void {
    this.layersEventService.broadcastLayerLoaded$.subscribe(
      (layer: string) => this.updateLayersVisibility()
    );
  }

  private subscribeStarsMagnitudeRequestEvent(): void {
    this.layersEventService.requestStarsMagnitude$.subscribe(
      (magnitude: number) => {
        const allStars = this.getLayer('stars');
        if (allStars) {
          (<StarsLayer> allStars).setVisibleMagnitudesDownTo(magnitude);
        }
      }
    );
  }

  public ngOnInit(): void {
    this.subscribeLayerLoadRequestEvent();
    this.subscribeLayerVisibilityRequestEvent();
    this.subscribeLayerLoadedEvent();
    this.subscribeStarsMagnitudeRequestEvent();
  }

}
