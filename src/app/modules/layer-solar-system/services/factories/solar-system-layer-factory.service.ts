import { Injectable } from '@angular/core';
import AstronomicalObject from 'astronomy-bundle/astronomicalObject/AstronomicalObject';
import { EquatorialSphericalCoordinates } from 'astronomy-bundle/coordinates/coordinateTypes';
import { createMoon } from 'astronomy-bundle/moon';
import { createSun } from 'astronomy-bundle/sun';
import { createTimeOfInterest } from 'astronomy-bundle/time';
import TimeOfInterest from 'astronomy-bundle/time/TimeOfInterest';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LineSegments, Object3D, Points } from 'three';
import { Layer } from '#core/models/layers/layer';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { SolarSystem } from '#layer-solar-system/model/solar-system';
import { SupportedLayers } from '#core/models/layers/supported-layers';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { CelestialPlaneFactoryService } from '#layer-solar-system/services/factories/celestial-plane-factory.service';
import { PointsFactoryService } from '#core/services/factories/points-factory.service';
import { WorldConstants } from '#core/models/world-constants';


@Injectable()
export class SolarSystemLayerFactoryService implements LayerFactory {

  private readonly _layerCode: string;

  private readonly _currentTime: TimeOfInterest;

  constructor(
    private readonly _planeFactory: CelestialPlaneFactoryService,
    private readonly _pointsFactory: PointsFactoryService,
    private readonly _visibilityManager: LayersVisibilityManagerService
  ) {
    this._layerCode = SupportedLayers.SOLAR_SYSTEM;
    this._currentTime = createTimeOfInterest.fromCurrentTime();
  }

  public buildRenderableLayer(model: Layer): SolarSystem {
    const renderable = new SolarSystem(model);
    Promise.all([
      this.buildEcliptic(renderable),
      this.buildMoonPath(renderable),
      this.buildSun(renderable),
      this.buildMoon(renderable)
    ]).then(
      (_: any) => this._visibilityManager.showLayer(this._layerCode)
    );
    // TODO
    return renderable;
  }

  private buildEcliptic(renderable: SolarSystem): Promise<LineSegments> {
    return this._planeFactory
      .buildCelestialPlane(renderable.code, createSun, 365)
      .pipe(
        tap({
          next: (plane: LineSegments) => renderable.ecliptic = plane
        })
      ).toPromise();
  }

  private buildMoonPath(renderable: SolarSystem): Promise<LineSegments> {
    return this._planeFactory
      .buildCelestialPlane(renderable.code, createMoon, 28)
      .pipe(
        tap({
          next: (plane: LineSegments) => renderable.moonPath = plane
        })
      ).toPromise();
  }

  private buildSun(renderable: SolarSystem): Promise<EquatorialSphericalCoordinates> {
    return this.buildCelestialBody(
      () => createSun(this._currentTime),
      (body: Points) => renderable.sun = body
    );
  }

  private buildMoon(renderable: SolarSystem): Promise<EquatorialSphericalCoordinates> {
    return this.buildCelestialBody(
      () => createMoon(this._currentTime),
      (body: Points) => renderable.moon = body
    );
  }

  private buildCelestialBody(
    bodyProvider: () => AstronomicalObject,
    targetSetter: (body: Object3D) => void
  ): Promise<EquatorialSphericalCoordinates> {
    return from(bodyProvider().getApparentGeocentricEquatorialSphericalCoordinates())
      .pipe(
        tap({
          next: (esCoords: EquatorialSphericalCoordinates) => {
            const coords = this.toPointCoords(esCoords);
            const body = this._pointsFactory.createObject3D(this._layerCode, [coords]);
            targetSetter(body);
          }
        })
      ).toPromise();
  }

  private toPointCoords(coords: EquatorialSphericalCoordinates): Array<number> {
    return [
      coords.rightAscension,
      coords.declination,
      WorldConstants.worldRadiusForLayer(this._layerCode)
    ];
  }

}
