import { Injectable } from '@angular/core';
import { Points } from 'three';
import { Messier } from '#layer-messier/models/messier';
import { MessierLabelsPolicy } from '#layer-messier/models/layers/text/messier-labels-policy';
import { Layer } from '#core/models/layers/layer';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { Searchable } from '#core/models/layers/searchable';
import { PointsFactoryService } from '#core/services/factories/points-factory.service';
import { RenderableText } from '#core/models/layers/renderable-text';

type Filter = (obj: Searchable) => boolean;

/**
 * Factory for the renderable layer of Messier objects.
 */
@Injectable()
export class MessierLayerFactoryService implements LayerFactory {

  private readonly _layerCode: string;

  private readonly _labelsPolicy: MessierLabelsPolicy;

  private readonly _filterCluster: Filter;

  private readonly _filterGalaxy: Filter;

  private readonly _filterNebula: Filter;

  private readonly _filterOther: Filter;

  constructor(private readonly _pointsFactory: PointsFactoryService) {
    this._layerCode = Messier.CODE;
    this._labelsPolicy = new MessierLabelsPolicy();
    this._filterCluster = (obj: Searchable): boolean => this.typeStartsWith(obj, 'cluster');
    this._filterGalaxy = (obj: Searchable): boolean => this.typeStartsWith(obj, 'galaxy');
    this._filterNebula = (obj: Searchable): boolean => this.typeStartsWith(obj, 'nebula');
    this._filterOther = (obj: Searchable): boolean =>
      !this._filterCluster(obj) && !this._filterGalaxy(obj) && !this._filterNebula(obj);
  }

  public buildRenderableLayer(model: Layer): Messier {
    const clusters = this.extractObjectsWithTypePrefix(this._filterCluster, model.objects);
    const galaxies = this.extractObjectsWithTypePrefix(this._filterGalaxy, model.objects);
    const nebulas = this.extractObjectsWithTypePrefix(this._filterNebula, model.objects);
    const other = this.extractObjectsWithTypePrefix(this._filterOther, model.objects);
    const labels = model.objects.map(
      (obj: Searchable) => this.toRenderableText(obj)
    );
    return new Messier(
      model,
      clusters,
      galaxies,
      nebulas,
      other,
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
    return this._pointsFactory.createObject3D(this._layerCode, points);
  }

  private toRenderableText(object: Searchable): RenderableText {
    return new RenderableText(
      this._pointsFactory.buildPoint(this._layerCode, object.ra, object.dec),
      object.code,
      this._labelsPolicy
    );
  }

}
