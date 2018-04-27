import { Component, Output, EventEmitter, AfterViewInit, Input } from '@angular/core';


@Component({
  selector: `app-sky-view-controls-select-stars-magnitude`,
  templateUrl: './selector-stars-magnitude.component.html',
  styleUrls: [ './controls.component.css', './selector-stars-magnitude.component.css' ],
  providers: []
})
export class SelectorStarsMagnitudeComponent implements AfterViewInit {

  @Output()
  private starsMagnitudeChanged = new EventEmitter<any>();

  public initialMagnitude = 6;

  @Input()
  public enabled;

  public ngAfterViewInit(): void {
    this.fireStarsMagnitudeChangedEvent(this.initialMagnitude);
  }

  public fireStarsMagnitudeChangedEvent(magnitude: any): void {
    this.starsMagnitudeChanged.emit({ value: parseFloat(magnitude) });
  }

}
