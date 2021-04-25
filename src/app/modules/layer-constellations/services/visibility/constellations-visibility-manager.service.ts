import { Injectable } from '@angular/core';
import { LayerService } from '#core/services/layer.service';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { Constellations } from '#layer-constellations/models/constellations';


/**
 * Provides methods to manage the visibility of the objects
 * composing the constellations layer.
 */
@Injectable()
export class ConstellationsVisibilityManagerService {

  private readonly _layerCode: string;

  constructor(
    private readonly _layerService: LayerService,
    private readonly _layersVisibilityManager: LayersVisibilityManagerService
  ) {
    this._layerCode = Constellations.CODE;
  }

  public showBoundaries(show: boolean): void {
    this.showObjects(show, (layer: Constellations, isShown: boolean) => layer.showBoundaries(isShown));
  }

  public showLines(show: boolean): void {
    this.showObjects(show, (layer: Constellations, isShown: boolean) => layer.showLines(isShown));
  }

  private showObjects(
    show: boolean,
    showFunction: (constLayer: Constellations, isShown: boolean) => void
  ): void {
    const layer = this.getConstellationsLayer();
    if (!layer) {
      return;
    }
    this._layersVisibilityManager.hideLayer(this._layerCode);
    showFunction(layer, show);
    this._layersVisibilityManager.showLayer(this._layerCode);
  }

  private getConstellationsLayer(): Constellations {
    return this._layerService.getRenderableLayer(this._layerCode) as Constellations;
  }

}
