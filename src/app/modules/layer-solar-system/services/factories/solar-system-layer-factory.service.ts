import { Injectable } from '@angular/core';
import AstronomicalObject from 'astronomy-bundle/astronomicalObject/AstronomicalObject';
import { EquatorialSphericalCoordinates } from 'astronomy-bundle/coordinates/coordinateTypes';
import { createMoon } from 'astronomy-bundle/moon';
import { createSun } from 'astronomy-bundle/sun';
import { createTimeOfInterest } from 'astronomy-bundle/time';
import TimeOfInterest from 'astronomy-bundle/time/TimeOfInterest';
import { from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LineSegments, Object3D, Points } from 'three';
import { Layer } from '#core/models/layers/layer';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { SolarSystem } from '#layer-solar-system/model/solar-system';
import { SupportedLayers } from '#core/models/layers/supported-layers';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { ApparentTrajectoryFactoryService } from '#layer-solar-system/services/factories/apparent-trajectory-factory.service';
import { PointsFactoryService } from '#core/services/factories/points-factory.service';
import { WorldConstants } from '#core/models/world-constants';
import { Searchable } from '#core/models/layers/searchable';
import { SearchService } from '#core/services/search.service';
import { RenderableText } from '#core/models/layers/renderable-text';
import { toVector3 } from '#core/utils/vector-utils';
import { TextOffsetPolicy } from '#core/models/layers/text/text-offset-policy';
import { SunMoonLabelsPolicy } from '#layer-solar-system/model/layers/sun-moon-labels-policy';


type AstroObjectProducer = () => AstronomicalObject;

@Injectable()
export class SolarSystemLayerFactoryService implements LayerFactory {

  private readonly _layerCode: string;

  private readonly _worldRadius: number;

  private readonly _currentTime: TimeOfInterest;

  private readonly _biggerLabelsPolicy: TextOffsetPolicy;

  constructor(
    private readonly _trajectoryFactory: ApparentTrajectoryFactoryService,
    private readonly _pointsFactory: PointsFactoryService,
    private readonly _visibilityManager: LayersVisibilityManagerService,
    private readonly _searchService: SearchService
  ) {
    this._layerCode = SupportedLayers.SOLAR_SYSTEM;
    this._currentTime = createTimeOfInterest.fromCurrentTime();
    this._worldRadius = WorldConstants.worldRadiusForLayer(this._layerCode);
    this._biggerLabelsPolicy = new SunMoonLabelsPolicy();
  }

  public buildRenderableLayer(model: Layer): SolarSystem {
    const renderable = new SolarSystem(model);
    Promise.all([
      this.buildEcliptic(renderable),
      this.buildMoonPath(renderable),
      this.buildSun(renderable),
      this.buildMoon(renderable)
    ]).then(
      (_: any) => {
        this._searchService.registerSearchables(renderable.searchables);
        this._visibilityManager.showLayer(this._layerCode);
      }
    );
    return renderable;
  }

  private buildEcliptic(renderable: SolarSystem): Promise<LineSegments> {
    return this._trajectoryFactory
      .buildApparentTrajectory(renderable.code, createSun, 365)
      .then(
        (plane: LineSegments) => renderable.ecliptic = plane
      );
  }

  private buildMoonPath(renderable: SolarSystem): Promise<LineSegments> {
    return this._trajectoryFactory
      .buildApparentTrajectory(renderable.code, createMoon, 28)
      .then(
        (plane: LineSegments) => renderable.moonPath = plane
      );
  }

  private buildSun(renderable: SolarSystem): Promise<Object3D> {
    return this.buildCelestialBody(
      renderable,
      () => createSun(this._currentTime),
      (body: Points) => renderable.sun = body,
      'Sun'
    );
  }

  private buildMoon(renderable: SolarSystem): Promise<Object3D> {
    return this.buildCelestialBody(
      renderable,
      () => createMoon(this._currentTime),
      (body: Points) => renderable.moon = body,
      'Moon'
    );
  }

  private buildCelestialBody(
    renderable: SolarSystem,
    astroObjectProvider: AstroObjectProducer,
    objectConsumer: (body: Object3D) => void,
    name: string
  ): Promise<Object3D> {
    return astroObjectProvider().getApparentGeocentricEquatorialSphericalCoordinates()
      .then(
        (esCoords: EquatorialSphericalCoordinates) => {
          const coords = [esCoords.rightAscension, esCoords.declination, this._worldRadius];
          const body = this._pointsFactory.createObject3D(this._layerCode, [coords]);
          renderable.addSeachable(this.toSearchable(coords, name));
          renderable.addText(this.toRenderableText(coords, name));
          objectConsumer(body);
          return body;
        }
      );
  }

  private toSearchable(coords: Array<number>, name: string): Searchable {
    return {
      type: 'solar-system-body',
      code: name.toUpperCase(),
      ra: coords[0],
      dec: coords[1],
      names: [name]
    };
  }

  private toRenderableText(coords: Array<number>, name: string): RenderableText {
    const center = toVector3(coords[0], coords[1], this._worldRadius);
    return new RenderableText(
      center,
      name,
      this._biggerLabelsPolicy
    );
  }

}
