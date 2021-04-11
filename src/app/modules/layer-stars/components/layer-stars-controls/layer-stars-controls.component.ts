import { Component, Input } from '@angular/core';
import { LayerAware } from '#core/models/layers/layer-aware';

/**
 * Wraps the common controls for all the stars levels.
 */
@Component({
  selector: 'ac-layer-stars-controls',
  templateUrl: './layer-stars-controls.component.html'
})
export class LayerStarsControlsComponent extends LayerAware {

}
