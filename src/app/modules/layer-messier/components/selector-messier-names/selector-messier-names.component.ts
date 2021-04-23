import { Component } from '@angular/core';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { UiControlsWithNames } from '#core/components/ui-controls-with-names';


/**
 * Provides the UI with the controls allowing to toggle
 * the Messier objects labels in the view.
 */
@Component({
  selector: 'ac-controls-select-messier-names',
  templateUrl: './selector-messier-names.component.html'
})
export class SelectorMessierNamesComponent extends UiControlsWithNames {

  constructor(textsVisibilityManager: TextsVisibilityManagerService) {
    super(textsVisibilityManager);
  }

}
