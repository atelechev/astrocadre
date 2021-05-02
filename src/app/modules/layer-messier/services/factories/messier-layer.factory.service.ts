import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Points } from 'three';
import { Messier } from '#layer-messier/models/messier';
import { MessierLabelsPolicy } from '#layer-messier/models/layers/text/messier-labels-policy';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { Searchable } from '#core/models/layers/searchable';
import { PointsFactoryService } from '#core/services/factories/points-factory.service';
import { RenderableText } from '#core/models/layers/renderable-text';
import { StaticDataService } from '#core/services/static-data.service';

type Filter = (obj: Searchable) => boolean;

/**
 * Factory for the renderable layer of Messier objects.
 */
@Injectable()
export class MessierLayerFactoryService implements LayerFactory {

  private readonly _labelsPolicy: MessierLabelsPolicy;


  constructor(
    private readonly _pointsFactory: PointsFactoryService,
    private readonly _dataService: StaticDataService
  ) {
    this._labelsPolicy = new MessierLabelsPolicy();
  }

  private get code(): string {
    return Messier.CODE;
  }

  public buildRenderableLayer(): Promise<Messier> {
    return this._dataService.getDataJson(this.code)
      .pipe(
        map(
          (rawData: Array<Searchable>) => this.buildMessierObjects(rawData)
        )
      ).toPromise();
  }

  private getFilter(objectsType: string): Filter {
    return (obj: Searchable): boolean => this.typeStartsWith(obj, objectsType);
  }

  private buildMessierObjects(rawData: Array<Searchable>): Messier {
    const filterCluster = this.getFilter('cluster');
    const filterGalaxy = this.getFilter('galaxy');
    const filterNebula = this.getFilter('nebula');
    const filterOther = (obj: Searchable): boolean =>
      !filterCluster(obj) && !filterGalaxy(obj) && !filterNebula(obj);

    const clusters = this.extractObjectsWithTypePrefix(filterCluster, rawData);
    const galaxies = this.extractObjectsWithTypePrefix(filterGalaxy, rawData);
    const nebulas = this.extractObjectsWithTypePrefix(filterNebula, rawData);
    const other = this.extractObjectsWithTypePrefix(filterOther, rawData);
    const labels = rawData.map(
      (obj: Searchable) => this.toRenderableText(obj)
    );

    return new Messier(
      clusters,
      galaxies,
      nebulas,
      other,
      rawData,
      labels
    );
  }

  private typeStartsWith(object: Searchable, prefix: string): boolean {
    return object?.type.startsWith(prefix);
  }

  private extractObjectsWithTypePrefix(filter: Filter, allObjects: Array<Searchable>): Points {
    const objectsWithPrefix = allObjects.filter(filter);
    const points = objectsWithPrefix.map(
      (obj: Searchable) => [obj.ra, obj.dec]
    );
    return this._pointsFactory.createObject3D(this.code, points);
  }

  private toRenderableText(object: Searchable): RenderableText {
    return new RenderableText(
      this._pointsFactory.buildPoint(this.code, object.ra, object.dec),
      object.code,
      this._labelsPolicy
    );
  }

}
