import { Component } from '@angular/core';


@Component({
  selector: 'ac-controls-go-to',
  templateUrl: './go-to.component.html',
  styleUrls: [
    '../controls-common.css',
    './go-to.component.css'
  ]
})
export class GoToComponent {

  private _searchText: string;

  public get isDisabled(): boolean {
    return !this.searchText || this.searchText.trim().length < 1;
  }

  public get searchText(): string {
    return this._searchText;
  }

  public set searchText(st: string) {
    this._searchText = st;
  }

  public get searchNoResultsClass(): string {
    return '';
  }

  public execSearchRequest(): void {
    console.log(`exec: ${this._searchText}`);
    // TODO
  }

}
