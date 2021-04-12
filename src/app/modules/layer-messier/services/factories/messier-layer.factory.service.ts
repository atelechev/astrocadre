import { Injectable } from '@angular/core';
import { MessierLabelsPolicy } from 'src/app/modules/layer-messier/models/layers/text/messier-labels-policy';
import { Messier } from 'src/app/modules/layer-messier/models/messier';
import { Points } from 'three';
import { Layer } from '#core/models/layers/layer';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { Searchable } from '#core/models/layers/searchable';
import { SupportedLayers } from '#core/models/layers/supported-layers';
import { PointsFactoryService } from '#core/services/factories/points-factory.service';
import { RenderableText } from '#core/models/layers/renderable-text';
import { buildCenterPoint } from '#core/utils/star-utils';


type Filter = (obj: Searchable) => boolean;

/**
 * Factory for the renderable layer of Messier objects.
 */
@Injectable()
export class MessierLayerFactoryService implements LayerFactory {

  private readonly _labelsPolicy: MessierLabelsPolicy;

  private readonly _filterCluster: Filter;

  private readonly _filterGalaxy: Filter;

  private readonly _filterNebula: Filter;

  private readonly _filterOther: Filter;

  constructor(private readonly _pointsFactory: PointsFactoryService) {
    this._labelsPolicy = new MessierLabelsPolicy();
    this._filterCluster = (obj: Searchable): boolean => obj?.type.startsWith('cluster');
    this._filterGalaxy = (obj: Searchable): boolean => obj?.type.startsWith('galaxy');
    this._filterNebula = (obj: Searchable): boolean => obj?.type.startsWith('nebula');
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

  private extractObjectsWithTypePrefix(filter: Filter, allObjects: Array<Searchable>): Points {
    const objectsWithPrefix = allObjects.filter(filter);
    const points = objectsWithPrefix.map(
      (obj: Searchable) => [obj.ra, obj.dec]
    );
    return this._pointsFactory.createObject3D(SupportedLayers.MESSIER, points);
  }

  private toRenderableText(object: Searchable): RenderableText {
    return new RenderableText(
      buildCenterPoint([object.ra, object.dec]),
      object.code,
      this._labelsPolicy
    );
  }

}
