import { Injectable } from '@angular/core';
import AstronomicalObject from 'astronomy-bundle/astronomicalObject/AstronomicalObject';
import { EquatorialSphericalCoordinates } from 'astronomy-bundle/coordinates/types/CoordinateTypes';
import { createMoon } from 'astronomy-bundle/moon';
import {
  createJupiter,
  createMars,
  createMercury,
  createNeptune,
  createSaturn,
  createUranus,
  createVenus
  } from 'astronomy-bundle/planets';
import { createSun } from 'astronomy-bundle/sun';
import { createTimeOfInterest } from 'astronomy-bundle/time';
import TimeOfInterest from 'astronomy-bundle/time/TimeOfInterest';
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


type AstroObjectProducer = (toi?: TimeOfInterest) => AstronomicalObject;

type AstroObjectProps = {
  name: string;
  producer: AstroObjectProducer;
  trajectorySteps: number;
};

@Injectable()
export class SolarSystemLayerFactoryService implements LayerFactory {

  private readonly _astroObjectProps: Array<AstroObjectProps> = [
    { name: 'Sun', producer: createSun, trajectorySteps: 365 },
    { name: 'Moon', producer: createMoon, trajectorySteps: 28 },
    { name: 'Mercury', producer: createMercury, trajectorySteps: 7 },
    { name: 'Venus', producer: createVenus, trajectorySteps: 7 },
    { name: 'Mars', producer: createMars, trajectorySteps: 14 },
    { name: 'Jupiter', producer: createJupiter, trajectorySteps: 30 },
    { name: 'Saturn', producer: createSaturn, trajectorySteps: 30 },
    { name: 'Uranus', producer: createUranus, trajectorySteps: 30 },
    { name: 'Neptune', producer: createNeptune, trajectorySteps: 30 }
  ];

  private readonly _layerCode;

  private readonly _worldRadius: number;

  private readonly _currentTime: TimeOfInterest;

  private readonly _biggerLabelsPolicy: TextOffsetPolicy;

  constructor(
    private readonly _trajectoryFactory: ApparentTrajectoryFactoryService,
    private readonly _pointsFactory: PointsFactoryService,
    private readonly _layerService: LayerService,
    private readonly _searchService: SearchService,
    virtualSphereService: VirtualSphereRadiusService
  ) {
    this._layerCode = SolarSystem.CODE;
    this._currentTime = createTimeOfInterest.fromCurrentTime();
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
    const bodies = this._astroObjectProps.map(
      (props: AstroObjectProps) => this.buildCelestialBody(renderable, props.name, props.producer)
    );
    const trajectories = this._astroObjectProps.map(
      (props: AstroObjectProps) => this.buildTrajectory(renderable, props.name, props.producer, props.trajectorySteps)
    );
    return bodies.concat(trajectories);
  }

  private buildTrajectory(
    renderable: SolarSystem,
    name: string,
    bodyProducer: AstroObjectProducer,
    steps: number
  ): Promise<void> {
    return this._trajectoryFactory
      .buildApparentTrajectory(renderable.code, bodyProducer, steps)
      .then(
        (plane: LineSegments) => renderable.addTrajectory(name, plane)
      );
  }

  private buildCelestialBody(
    renderable: SolarSystem,
    name: string,
    astroObjectProvider: AstroObjectProducer
  ): Promise<void> {
    return astroObjectProvider(this._currentTime).getApparentGeocentricEquatorialSphericalCoordinates()
      .then(
        (esCoords: EquatorialSphericalCoordinates) => {
          const coords = [esCoords.rightAscension, esCoords.declination, this._worldRadius];
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
