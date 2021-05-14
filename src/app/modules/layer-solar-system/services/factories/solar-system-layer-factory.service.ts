import { Injectable } from '@angular/core';
import { LineSegments } from 'three';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { SolarSystem } from '#layer-solar-system/model/solar-system';
import { ApparentTrajectoryFactoryService } from '#layer-solar-system/services/factories/apparent-trajectory-factory.service';
import { PointsFactoryService } from '#core/services/factories/points-factory.service';
import { Searchable } from '#core/models/layers/searchable';
import { SearchService } from '#core/services/search.service';
import { RenderableText } from '#core/models/layers/renderable-text';
import { toVector3 } from '#core/utils/vector-utils';
import { TextOffsetPolicy } from '#core/models/layers/text/text-offset-policy';
import { SunMoonLabelsPolicy } from '#layer-solar-system/model/layers/sun-moon-labels-policy';
import { VirtualSphereRadiusService } from '#core/services/virtual-sphere-radius.service';
import { LayerService } from '#core/services/layer.service';
import { PositionCalculationService } from '#layer-solar-system/services/position-calculation.service';
import { TimeService } from '#layer-solar-system/services/time.service';
import { SOLAR_SYSTEM_OBJECTS } from '#layer-solar-system/model/solar-system-objects';
import { SolarSystemObject } from '#layer-solar-system/model/solar-system-object';


/**
 * Factory for the renderable layer of Solar system objects.
 */
@Injectable()
export class SolarSystemLayerFactoryService implements LayerFactory {

  private readonly _layerCode;

  private readonly _worldRadius: number;

  private readonly _biggerLabelsPolicy: TextOffsetPolicy;

  constructor(
    private readonly _timeService: TimeService,
    private readonly _trajectoryFactory: ApparentTrajectoryFactoryService,
    private readonly _positionCalculator: PositionCalculationService,
    private readonly _pointsFactory: PointsFactoryService,
    private readonly _layerService: LayerService,
    private readonly _searchService: SearchService,
    virtualSphereService: VirtualSphereRadiusService
  ) {
    this._layerCode = SolarSystem.CODE;
    this._worldRadius = virtualSphereService.getRadiusFor(this._layerCode);
    this._biggerLabelsPolicy = new SunMoonLabelsPolicy();
  }

  public buildRenderableLayer(): Promise<SolarSystem> {
    const renderable = new SolarSystem();
    return Promise.all(this.getAllObjectsBuilders(renderable))
      .then(
        (_: any) => {
          this._searchService.registerSearchables(renderable.searchables);
          this._layerService.setVisible(this._layerCode, true);
          return Promise.resolve(renderable);
        }
      );
  }

  private getAllObjectsBuilders(renderable: SolarSystem): Array<Promise<any>> {
    const bodies = SOLAR_SYSTEM_OBJECTS.map(
      (obj: SolarSystemObject) => this.buildCelestialBody(renderable, obj.name)
    );
    const trajectories = SOLAR_SYSTEM_OBJECTS.map(
      (obj: SolarSystemObject) => this.buildTrajectory(renderable, obj)
    );
    return bodies.concat(trajectories);
  }

  private buildTrajectory(renderable: SolarSystem, object: SolarSystemObject): Promise<void> {
    return this._trajectoryFactory
      .buildApparentTrajectory(object.name, object.pathSteps)
      .then(
        (plane: LineSegments) => renderable.addTrajectory(object.name, plane)
      );
  }

  private buildCelestialBody(renderable: SolarSystem, name: string): Promise<void> {
    return this._positionCalculator
      .calculatePosition(name.toLowerCase(), this._timeService.selectedTime)
      .then(
        (coords: Array<number>) => {
          const body = this._pointsFactory.createObject3D(this._layerCode, [coords]);
          renderable.addSeachable(this.toSearchable(coords, name));
          renderable.addText(this.toRenderableText(coords, name));
          renderable.addCelestialBody(name, body);
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
