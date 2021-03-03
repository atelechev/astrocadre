import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/modules2/core/services/theme.service';


@Component({
  selector: `ac-root`,
  templateUrl: './astrocadre.component.html',
  styleUrls: []
})
export class AstrocadreComponent implements OnInit {

  constructor(
    private readonly _themeLoader: ThemeService
  ) {

  }

  public ngOnInit(): void {
    this._themeLoader.loadThemes();
  }

}
