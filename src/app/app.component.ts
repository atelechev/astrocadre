import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { Themes } from './core/themes';
import { ViewportComponent } from './viewport/viewport.component';
import { ThemesComponent } from './themes/themes.component';
import { ThemeAware } from './core/theme-aware';
import { LayersComponent } from './layers/layers.component';
import { LayersEventService } from './layers/layers-event.service';
import { LayerVisibility } from './core/layer-visibility';
import { ThemesEventService } from './themes/themes-event.service';
import { ViewportEventService } from './viewport/viewport-event.service';
import { Layers } from './core/layers';
import { ConstellationNamesLayer } from './layers/constellation-names-layer';
import { TextLayer } from './core/text-layer';

@Component({
  selector: `app-sky-view`,
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [
    ViewportComponent,
    ThemesComponent,
    LayersComponent,
    LayersEventService,
    ThemesEventService
  ]
})
export class AppComponent implements OnInit {

  @ViewChild(ThemesComponent)
  private themesManager: ThemesComponent;

  @ViewChild(LayersComponent)
  private layersManager: LayersComponent;

  @ViewChild(ViewportComponent)
  private viewportManager: ViewportComponent;

  private themeAwareComponents: Array<ThemeAware>;

  constructor(private changeDetector: ChangeDetectorRef,
              private layersEventService: LayersEventService,
              private themesEventService: ThemesEventService,
              private viewportEventService: ViewportEventService) {
    this.themeAwareComponents = new Array<ThemeAware>();
  }

  private subscribeLayerLoadedEvent(): void {
    this.layersEventService.broadcastLayerLoaded$.subscribe(
      (layerCode: string) => {
        const layer = this.layersManager.getLayer(layerCode);
        const theme = this.themesManager.getActiveTheme();
        if (theme) { // case when layer is loaded before theme. Otherwise it will be updated when the theme is available.
          layer.useTheme(theme);
        }
        this.viewportManager.addObjects(layer.getObjects());
        if (layer instanceof TextLayer) {
          this.viewportManager.addTextElements((<TextLayer> layer).getTextElements());
        }
      }
    );
  }

  private subscribeThemeLoadedEvent(): void {
    this.themesEventService.broadcastThemeLoaded$.subscribe(
      (themeCode: string) => {
        const theme = this.themesManager.getActiveTheme();
        if (theme) {
          this.themeAwareComponents.forEach(component => component.useTheme(theme));
        }
      }
    );
  }

  private subscribeCameraChangeEvent(): void {
    this.viewportEventService.broadcastViewportChanged$.subscribe(
      () => {
        const constellationNames = <ConstellationNamesLayer> this.layersManager.getLayer(Layers.CONSTELLATION_NAMES);
        if (constellationNames) {
          const allLabels = constellationNames.getRenderableLabels();
          this.viewportManager.showVisibleLabels(Layers.CONSTELLATION_NAMES, allLabels);
        }
      }
    );
  }

  public ngOnInit(): void {
    this.themeAwareComponents.push(this.viewportManager);
    this.themeAwareComponents.push(this.layersManager);
    this.subscribeLayerLoadedEvent();
    this.subscribeThemeLoadedEvent();
    this.subscribeCameraChangeEvent();
    // necessary to avoid the nasty "Expression has changed after it was checked." error:
    this.changeDetector.detectChanges();
  }

}
