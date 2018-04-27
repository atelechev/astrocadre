import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Layers } from '../core/layers';
import { RenderableLayer } from '../core/renderable-layer';
import { ThemeAware } from '../core/theme-aware';
import { Theme } from '../core/theme';
import { LayersFactoryService } from './layers-factory.service';
import { StarsLayer } from './stars-layer';

@Component({
  selector: 'app-sky-view-layers',
  template: ``,
  providers: [
    LayersFactoryService
  ]
})
export class LayersComponent implements ThemeAware, OnChanges {


  private loadedLayers: Map<Layers | string, RenderableLayer>; // TODO normalize keys type

  @Output()
  private layerLoaded = new EventEmitter<Layers>();

  @Input()
  private activeLayers: Set<Layers>;

  @Input()
  private visibleStarsMagnitudeDownTo: number;

  constructor(private layersFactory: LayersFactoryService) {
    this.loadedLayers = new Map<Layers | string, RenderableLayer>();
  }

  public getLayer(layer: Layers | string): RenderableLayer {
    return this.loadedLayers.get(layer);
  }

  public useTheme(theme: Theme): void {
    this.loadedLayers.forEach((layer: RenderableLayer, key: Layers) => {
      layer.useTheme(theme);
    });
  }

  private loadLayer(layer: Layers): void {
    this.layersFactory.newRenderableLayer(layer).subscribe(
      (loadedLayer: RenderableLayer) => {
        this.loadedLayers.set(layer, loadedLayer);
        this.layerLoaded.emit(layer);
      },
      (error) => console.error(`Failed to load layer '${layer}': ${error}`)
    );
  }

  private setVisible(code: Layers, visible: boolean): void {
    const layer = this.getLayer(code);
    if (layer) {
      layer.setVisible(visible);
    }
  }

  private getArrayDiffItems(first: Array<Layers>, second: Array<Layers>): Array<Layers> {
    if (!second) {
      return [];
    }
    if (!first) {
      return second;
    }
    const diff = new Array<Layers>();
    for (let i = 0; i < second.length; i++) {
      if (!first.includes(second[i])) {
        diff.push(<Layers> second[i]);
      }
    }
    return diff;
  }

  private processActivatedLayers(previousLayers: Set<Layers>,
                                 newLayers: Set<Layers>): void {
    const arrPrevLayers = this.asLayersArray(previousLayers);
    const arrNewLayers = this.asLayersArray(newLayers);
    const activatedLayers = this.getArrayDiffItems(arrPrevLayers, arrNewLayers);
    activatedLayers.forEach(layer => {
      if (!this.loadedLayers.has(layer)) {
        this.loadLayer(layer);
      } else {
        this.layerLoaded.emit(layer);
      }
      this.setVisible(layer, true);
    });
  }

  private asLayersArray(layers: Set<Layers>): Array<Layers> {
    return layers ? Array.from(layers.values()) : [];
  }

  private processDeactivatedLayers(previousLayers: Set<Layers>,
                                   newLayers: Set<Layers>): void {
    const arrPrevLayers = this.asLayersArray(previousLayers);
    const arrNewLayers = this.asLayersArray(newLayers);
    const deactivatedLayers = this.getArrayDiffItems(arrNewLayers, arrPrevLayers);
    deactivatedLayers.forEach(layer => {
      this.setVisible(layer, false);
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.activeLayers) {
      this.processActivatedLayers(changes.activeLayers.previousValue,
                                  changes.activeLayers.currentValue);
      this.processDeactivatedLayers(changes.activeLayers.previousValue,
                                    changes.activeLayers.currentValue);
    }
    if (changes.visibleStarsMagnitudeDownTo) {
      const allStars = this.getLayer('stars');
      // TODO should find a way to pass the value through events
      if (allStars) {
        (<StarsLayer> allStars).setVisibleMagnitudesDownTo(changes.visibleStarsMagnitudeDownTo.currentValue);
      }
    }
  }

}
