import { Component } from '@angular/core';
import { UiControlsWithNames } from '#core/components/ui-controls-with-names';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { PathsVisibilityManagerService } from '#layer-solar-system/services/visibility/paths-visibility-manager.service';


/**
 * Provides the UI with the controls allowing to show
 * the Solar system objects in the view.
 */
@Component({
  selector: 'ac-controls-select-solar-system-objects',
  templateUrl: './selector-solar-system-objects.component.html'
})
export class SelectorSolarSystemObjectsComponent extends UiControlsWithNames {

  private _pathsShown: boolean;

  constructor(
    textsVisibilityManager: TextsVisibilityManagerService,
    private readonly _pathsVisibilityManager: PathsVisibilityManagerService
  ) {
    super(textsVisibilityManager);
    this._pathsShown = true;
  }

  public get pathsShown(): boolean {
    return this._pathsShown;
  }

  public set pathsShown(show: boolean) {
    this._pathsShown = show;
    this._pathsVisibilityManager.setPathsVisible(this._pathsShown);
  }

}
