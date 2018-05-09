import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: `app-sky-view-controls-go-to`,
  templateUrl: './go-to.component.html',
  styleUrls: [ './controls.component.css' ],
  providers: []
})
export class GoToComponent implements AfterViewInit {

  private searchText: string;

  private goToButtonDisabled: boolean;

  constructor() {
    this.goToButtonDisabled = true;
  }

  public updateGoToButtonState(): void {
    this.goToButtonDisabled = !this.searchText || this.searchText.trim().length < 1;
  }

  public execGoToSearchRequest(): void {
    if (!this.goToButtonDisabled) {
      console.log('executing for: ' + this.searchText);
    }
  }

  public ngAfterViewInit(): void {
    // TODO
  }

}
