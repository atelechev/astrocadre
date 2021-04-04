import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RenderableText } from '#core/models/layers/renderable-text';
import { LayerService } from '#core/services/layer.service';
import { Layer } from '#core/models/layers/layer';


@Injectable()
export class TextsVisibilityManagerService {

  private readonly _textsShown: BehaviorSubject<Array<RenderableText>>;

  private readonly _textsHidden: BehaviorSubject<Array<RenderableText>>;

  constructor(private readonly _layerService: LayerService) {
    this._textsShown = new BehaviorSubject<Array<RenderableText>>([]);
    this._textsHidden = new BehaviorSubject<Array<RenderableText>>([]);
  }

  public get textsShown(): Observable<Array<RenderableText>> {
    return this._textsShown;
  }

  public get textsHidden(): Observable<Array<RenderableText>> {
    return this._textsHidden;
  }

  public showTexts(code: string): void {
    const layer = this._layerService.getRenderableLayer(code);
    if (!layer) {
      return;
    }
    layer.showTexts();
    this._textsShown.next(layer.texts);
    layer.subLayers?.forEach(
      (subLayer: Layer) => this.showTexts(subLayer.code)
    );
  }

  public hideTexts(code: string): void {
    const layer = this._layerService.getRenderableLayer(code);
    if (!layer) {
      return;
    }
    layer.hideTexts();
    this._textsHidden.next(layer.texts);
    layer.subLayers?.forEach(
      (subLayer: Layer) => this.hideTexts(subLayer.code)
    );
  }

}
