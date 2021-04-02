import { Injectable } from '@angular/core';
import { ThemeMeta } from '#core/models/theme-meta';
import { StaticDataService } from '#core/services/static-data.service';
import { ThemeService } from '#core/services/theme.service';
import { Theme } from '#core/models/theme';
import { LayerService } from '#core/services/layer.service';
import { Layer } from '#core/models/layer';

@Injectable()
export class LoaderService {

  constructor(
    private readonly _dataService: StaticDataService,
    private readonly _themeService: ThemeService,
    private readonly _layersService: LayerService
  ) {
    // nothing
  }

  public loadAllData(): void {
    this.loadThemes();
    this.loadLayers();
  }

  public loadTheme(code: string): void {
    if (!code) {
      return;
    }
    this._dataService
      .getTheme(code)
      .toPromise()
      .then(
        (theme: Theme) => {
          this._themeService.theme = theme;
        },
        (err: any) => console.error(err)
      );
  }

  private loadThemes(): void {
    this._dataService
      .getThemes()
      .toPromise()
      .then(
        (themes: Array<ThemeMeta>) => {
          this._themeService.availableThemes = themes;
          if (themes?.length > 0) {
            this.loadTheme(themes[0].code);
          }
        },
        (err: any) => console.error(err)
      );
  }

  private loadLayers(): void {
    this._dataService
      .getLayersTree()
      .toPromise()
      .then(
        (root: Layer) => {
          this._layersService.rootLayer = root;
          this.processLoadedLayer(root);
        },
        (err: any) => console.error(err)
      );
  }

  private processLoadedLayer(layer: Layer): void {
    this.loadLayerObjects(layer);
    layer.subLayers?.forEach(
      (subLayer: Layer) => this.processLoadedLayer(subLayer)
    );
  }

  private loadLayerObjects(layer: Layer): void {
    if (layer.loadFromUrl) {
      this._dataService
        .getDataJson(layer.code)
        .toPromise()
        .then(
          (objs: Array<any>) => {
            layer.objects = objs || [];
            this._layersService.registerLayer(layer);
          },
          (err: any) => console.error(err)
        );
    } else {
      this._layersService.registerLayer(layer);
    }
  }

}
