import { Injectable } from '@angular/core';
import { LayerService } from '#core/services/layer.service';
import { Constellations } from '#layer-constellations/models/constellations';


/**
 * Provides methods to manage the visibility of the objects
 * composing the constellations layer.
 */
@Injectable()
export class ConstellationsVisibilityManagerService {

  private readonly _layerCode: string;

  constructor(private readonly _layerService: LayerService) {
    this._layerCode = Constellations.CODE;
  }

  public setBoundariesVisible(vesible: boolean): void {
    this.showObjects(vesible, (layer: Constellations, isShown: boolean) => layer.setBoundariesVisible(isShown));
  }

  public setLinesVisible(visible: boolean): void {
    this.showObjects(visible, (layer: Constellations, isShown: boolean) => layer.setLinesVisible(isShown));
  }

  private showObjects(
    show: boolean,
    showFunction: (constLayer: Constellations, isShown: boolean) => void
  ): void {
    const layer = this.getConstellationsLayer();
    if (!layer) {
      return;
    }
    this._layerService.setVisible(this._layerCode, false);
    showFunction(layer, show);
    this._layerService.setVisible(this._layerCode, true);
  }

  private getConstellationsLayer(): Constellations {
    return this._layerService.getRenderableLayer(this._layerCode) as Constellations;
  }

}
