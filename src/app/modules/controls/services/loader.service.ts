import { Injectable } from '@angular/core';
import { ThemeMeta } from '#core/models/theme/theme-meta';
import { StaticDataService } from '#core/services/static-data.service';
import { ThemeService } from '#core/services/theme.service';
import { Theme } from '#core/models/theme/theme';
import { LayerService } from '#core/services/layer.service';
import { LayerProvider } from '#core/models/layers/layer-provider';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { SearchService } from '#core/services/search.service';
import { LayerProvidersRegistryService } from '#controls/services/layer-providers-registry.service';
import { themeDefault } from '#core/models/theme/theme-default';

/**
 * Asynchronously loads layers and themes data.
 */
@Injectable()
export class LoaderService {

  private readonly _loadedThemes: Map<string, Theme>;

  private _layerIndexCounter: number;

  constructor(
    private readonly _dataService: StaticDataService,
    private readonly _themeService: ThemeService,
    private readonly _layerService: LayerService,
    private readonly _searchService: SearchService,
    private readonly _providersRegistry: LayerProvidersRegistryService
  ) {
    this._loadedThemes = new Map<string, Theme>();
    this._layerIndexCounter = 0;
  }

  /**
   * Starts the loading of the layers and themes data from the backend.
   */
  public loadAllData(): void {
    this.loadThemes();
    this.loadLayers();
  }

  /**
   * Loads the specified theme definition.
   *
   * @param code the code of the theme to load.
   */
  public loadTheme(code: string): void {
    if (!code) {
      return;
    }
    if (this._loadedThemes.has(code)) {
      this._themeService.theme = this._loadedThemes.get(code);
    }
    else {
      this._dataService
        .getTheme(code)
        .toPromise()
        .then(
          (theme: Theme) => {
            this.setLoadedTheme(theme);
          },
          (err: any) => console.error(err)
        );
    }
  }

  private setLoadedTheme(theme: Theme): void {
    const useTheme = theme;
    this._themeService.theme = useTheme;
    this._loadedThemes.set(useTheme.code, useTheme);
  }

  private loadThemes(): void {
    this._dataService
      .getThemes()
      .toPromise()
      .then(
        (themes: Array<ThemeMeta>) => {
          this._themeService.availableThemes = themes;
          if (themes.length > 0) {
            this.loadTheme(themes[0].code);
          }
        },
        (err: any) => console.error(err)
      );
  }

  private loadLayers(): void {
    this._providersRegistry.layerProviders
      .forEach(
        (provider: LayerProvider) => this.loadLayer(provider)
      );
  }

  private loadLayer(provider: LayerProvider, code?: string): void {
    provider.getRenderableLayer(code)
      .then(
        (layer: RenderableLayer) => {
          if (layer) {
            this._layerService.registerLayer(layer, this._layerIndexCounter++);
            this._searchService.registerSearchables(layer.searchables);
            layer.subLayers.forEach(
              (subCode: string) => this.loadLayer(provider, subCode)
            );
          }
        }
      );
  }

}
