import { Injectable, Injector } from '@angular/core';
import { ThemeMeta } from '#core/models/theme/theme-meta';
import { StaticDataService } from '#core/services/static-data.service';
import { ThemeService } from '#core/services/theme.service';
import { Theme } from '#core/models/theme/theme';
import { LayerService } from '#core/services/layer.service';
import { Layer } from '#core/models/layers/layer';
import { LayersProvider } from '#core/models/layers/layers-provider';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { SearchService } from '#core/services/search.service';
import { LayerProvidersRegistryService } from '#controls/services/layer-providers-registry.service';

/**
 * Asynchronously loads layers and themes data.
 */
@Injectable()
export class LoaderService {

  private readonly _loadedThemes: Map<string, Theme>;

  constructor(
    private readonly _dataService: StaticDataService,
    private readonly _themeService: ThemeService,
    private readonly _layerService: LayerService,
    private readonly _searchService: SearchService,
    private readonly _providersRegistry: LayerProvidersRegistryService
  ) {
    this._loadedThemes = new Map<string, Theme>();
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
    this._themeService.theme = theme;
    this._loadedThemes.set(theme.code, theme);
  }

  private loadThemes(): void {
    this._dataService
      .getThemes()
      .toPromise()
      .then(
        (themes: Array<ThemeMeta>) => {
          this._themeService.availableThemes = themes;
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
          this._layerService.rootLayer = root;
          this.processLoadedLayer(root);
          this.doApplyFirstTheme();
        },
        (err: any) => console.error(err)
      );
  }

  private doApplyFirstTheme(): void {
    const allThemes = this._themeService.availableThemes || [];
    if (allThemes.length > 0) {
      this.loadTheme(allThemes[0].code);
    }
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
          (objs: Array<Layer>) => {
            layer.objects = objs || [];
            this.registerLayer(layer);
          },
          (err: any) => console.error(err)
        );
    } else {
      this.registerLayer(layer);
    }
  }

  private registerLayer(layer: Layer): void {
    const renderable = this._providersRegistry.layerProviders
      .map(
        (provider: LayersProvider) => provider.getRenderableLayer(layer)
      ).find(
        (createdLayer: RenderableLayer) => !!createdLayer
      );
    this._layerService.registerLayer(renderable);
    this._searchService.registerSearchables(renderable?.searchables);
  }

}
