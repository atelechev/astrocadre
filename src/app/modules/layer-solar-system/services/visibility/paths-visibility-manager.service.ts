import { Injectable } from '@angular/core';
import { LayerService } from '#core/services/layer.service';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { SolarSystem } from '#layer-solar-system/model/solar-system';

/**
 * Provides methods to manage the visibility of the apparent paths
 * (trajectories) of the Solar system objects.
 */
@Injectable()
export class PathsVisibilityManagerService {

  private readonly _layerCode: string;

  constructor(
    private readonly _layerService: LayerService,
    private readonly _layersVisibilityManager: LayersVisibilityManagerService
  ) {
    this._layerCode = SolarSystem.CODE;
  }

  public setPathsVisible(visible: boolean): void {
    const layer = this.getSolarSystemLayer();
    if (!layer) {
      return;
    }
    this._layersVisibilityManager.setVisible(this._layerCode, false);
    layer.setTrajectoriesVisible(visible);
    this._layersVisibilityManager.setVisible(this._layerCode, true);
  }

  private getSolarSystemLayer(): SolarSystem {
    return this._layerService.getRenderableLayer(this._layerCode) as SolarSystem;
  }

}
