import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { Themes } from './core/themes';
import { ViewportComponent } from './viewport/viewport.component';
import { ThemesComponent } from './themes/themes.component';
import { ThemeAware } from './core/theme-aware';
import { Layers } from './core/layers';
import { LayersComponent } from './layers/layers.component';

@Component({
  selector: `app-sky-view`,
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [
    ViewportComponent,
    ThemesComponent,
    LayersComponent
  ]
})
export class AppComponent implements OnInit {

  private activeTheme: Themes;

  private activeLayers = new Set<Layers>();

  private showStarsMagnitudeDownTo: number;

  @ViewChild(ThemesComponent)
  private themesManager: ThemesComponent;

  @ViewChild(LayersComponent)
  private layersManager: LayersComponent;

  @ViewChild(ViewportComponent)
  private viewportManager: ViewportComponent;

  private themeAwareComponents: Array<ThemeAware>;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.themeAwareComponents = new Array<ThemeAware>();
  }

  private updateActiveLayers(layer: Layers, visible: boolean): void {
    const previousValues = Array.from(this.activeLayers.values());
    // we have to re-create the Set, because otherwise the change event is not fired.
    this.activeLayers = new Set<Layers>(previousValues);
    if (visible) {
      this.activeLayers.add(layer);
    } else {
      this.activeLayers.delete(layer);
    }
  }

  public controlSelectionsChanged(event: any): void {
    switch (event.changed) {
      case 'theme': {
        this.activeTheme = <Themes> event.data.code;
        break;
      }
      case 'layer': {
        this.updateActiveLayers(<Layers> event.data.code, event.data.visible);
        break;
      }
      case 'magnitude': {
        this.showStarsMagnitudeDownTo = event.data.value;
        break;
      }
      case 'camera': {
        const eventData = event.data;
        this.viewportManager.useCamera(eventData);
        break;
      }
      default: {
        console.log('Unsupported event detected: ' + event.changed);
      }
    }
  }

  private afterThemeLoaded(): void {
    const theme = this.themesManager.getActiveTheme();
    this.themeAwareComponents.forEach(component => component.useTheme(theme));
  }

  private afterLayerLoaded(layerCode: Layers): void {
    const layer = this.layersManager.getLayer(layerCode);
    const theme = this.themesManager.getActiveTheme();
    if (theme) { // case when layer is loaded before theme. Otherwise it will be updated when the theme is available.
      layer.useTheme(theme);
    }
    this.viewportManager.addObjects(layer.getObjects());
    this.updateActiveLayers(layerCode, this.activeLayers.has(layerCode));
  }

  public resourceReady(event: any): void {
    switch (event.ready) {
      case 'theme': {
        this.afterThemeLoaded();
        break;
      }
      case 'layer': {
        this.afterLayerLoaded(<Layers> event.data.code);
        break;
      }
      default: {
        throw new Error(`Unsupported resource: ${event.ready}`);
      }
    }
  }

  public ngOnInit(): void {
    this.themeAwareComponents.push(this.viewportManager);
    this.themeAwareComponents.push(this.layersManager);
    // necessary to avoid the nasty "Expression has changed after it was checked." error:
    this.changeDetector.detectChanges();
  }

}
