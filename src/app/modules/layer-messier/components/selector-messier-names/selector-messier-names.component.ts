import { Component } from '@angular/core';
import { LayerAware } from '#core/models/layers/layer-aware';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';


/**
 * Provides the UI with the controls allowing to toggle
 * the Messier objects labels in the view.
 */
@Component({
  selector: 'ac-controls-select-messier-names',
  templateUrl: './selector-messier-names.component.html'
})
export class SelectorMessierNamesComponent extends LayerAware {

  private _namesShown: boolean;

  constructor(private readonly _textsVisibilityManager: TextsVisibilityManagerService) {
    super();
    this._namesShown = true;
  }

  public get namesShown(): boolean {
    return this._namesShown;
  }

  public set namesShown(show: boolean) {
    this._namesShown = show;
    if (this._namesShown) {
      this._textsVisibilityManager.showTexts(this.layer.code);
    } else {
      this._textsVisibilityManager.hideTexts(this.layer.code);
    }
  }

}
