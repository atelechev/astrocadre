import { Directive } from '@angular/core';
import { LayerAware } from '#core/models/layers/layer-aware';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';

/**
 * Common class for the UI controls that provide a possibility to
 * toggle object names shown in the main view.
 */
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class UiControlsWithNames extends LayerAware {

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
    this._textsVisibilityManager.setTextsVisible(this.layer.code, this._namesShown);
  }

}
