import { Component } from '@angular/core';
import { UiControlsWithNames } from '#core/components/ui-controls-with-names';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { ConstellationsVisibilityManagerService } from '#layer-constellations/services/visibility/constellations-visibility-manager.service';

/**
 * Wraps the common controls for all the constellations sub-layers.
 */
@Component({
  selector: 'ac-layer-constellations-controls',
  templateUrl: './layer-constellations-controls.component.html'
})
export class LayerConstellationsControlsComponent extends UiControlsWithNames {

  private _boundariesShown: boolean;

  private _linesShown: boolean;

  constructor(
    textsVisibilityManager: TextsVisibilityManagerService,
    private readonly _visibilityManager: ConstellationsVisibilityManagerService
  ) {
    super(textsVisibilityManager);
    this._boundariesShown = true;
    this._linesShown = true;
  }

  public get boundariesShown(): boolean {
    return this._boundariesShown;
  }

  public set boundariesShown(show: boolean) {
    this._boundariesShown = show;
    this._visibilityManager.showBoundaries(show);
  }

  public get linesShown(): boolean {
    return this._linesShown;
  }

  public set linesShown(show: boolean) {
    this._linesShown = show;
    this._visibilityManager.showLines(show);
  }

}
