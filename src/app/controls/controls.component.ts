import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { SelectorThemeComponent } from './selector-theme.component';
import { SelectorStarsMagnitudeComponent } from './selector-stars-magnitude.component';
import { CoreComponent } from '../core/core.component';

@Component({
  selector: 'app-sky-view-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
  providers: []
})
export class ControlsComponent {

  @Output()
  private selectionsChanged = new EventEmitter<any>();

  @ViewChild('skyViewControls')
  private controlsHtmlElement: ElementRef;

  private magnitudeSelectorEnabled: boolean;

  @ViewChild(SelectorThemeComponent)
  private themeSelector: SelectorThemeComponent;

  @ViewChild(SelectorStarsMagnitudeComponent)
  private starsMagnitudeSelector: SelectorStarsMagnitudeComponent;

  constructor(private core: CoreComponent) {

  }

  private updateMagnitudesSelector(event: any): void {
    if (event.changed === 'layer' && event.data.code === 'stars') {
      this.magnitudeSelectorEnabled = event.data.visible;
    }
  }

  public fireSelectionsChanged(event: any): void {
    this.updateMagnitudesSelector(event);
    this.selectionsChanged.emit(event);
  }

}
