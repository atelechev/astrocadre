import { Injectable } from '@angular/core';
import { EquatorialSphericalCoordinates } from 'astronomy-bundle/coordinates/coordinateTypes';
import { createSun } from 'astronomy-bundle/sun';
import { createTimeOfInterest } from 'astronomy-bundle/time';
import TimeOfInterest from 'astronomy-bundle/time/TimeOfInterest';
import { forkJoin } from 'rxjs';
import { LineSegments } from 'three';
import { Layer } from '#core/models/layers/layer';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { SolarSystem } from '#layer-solar-system/model/solar-system';
import { SupportedLayers } from '#core/models/layers/supported-layers';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { CelestialPlaneFactoryService } from '#layer-solar-system/services/factories/celestial-plane-factory.service';


@Injectable()
export class SolarSystemLayerFactoryService implements LayerFactory {

  private readonly _layerCode: string;


  constructor(
    private readonly _planeFactory: CelestialPlaneFactoryService,
    private readonly _visibilityManager: LayersVisibilityManagerService
  ) {
    this._layerCode = SupportedLayers.SOLAR_SYSTEM;
  }

  public buildRenderableLayer(model: Layer): SolarSystem {
    const renderable = new SolarSystem(model);
    this.buildEcliptic(renderable);
    // TODO
    return renderable;
  }

  private buildEcliptic(renderable: SolarSystem): void {
    this._planeFactory.buildCelestialPlane(renderable.code, createSun)
      .subscribe(
        (plane: LineSegments) => {
          renderable.ecliptic = plane;
          this._visibilityManager.showLayer(this._layerCode);
        }
      );
  }

}
