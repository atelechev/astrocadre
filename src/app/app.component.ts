import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
  } from '@angular/core';
import { ViewportComponent } from '#viewport/components/viewport/viewport.component';
import { Layers } from '#core/layers';
import { TreeNode } from '#core/tree-node';
import { ThemesComponent } from '#themes/components/themes/themes.component';
import { LayersComponent } from '#layers/layers.component';
import { StarsMagnitudeLayer } from '#layers/stars-magnitude-layer';
import { LayersEventService } from '#core-layer/layers-event.service';
import { RenderableLayer } from '#core-layer/renderable-layer';
import { StarLabelVisibility } from '#core-layer/star-label-visibility';
import { ThemeAware } from '#core-theme/theme-aware';
import { ThemesEventService } from '#core-theme/themes-event.service';
import { ViewportDimensionService } from '#core-viewport/viewport-dimension.service';
import { ViewportEventService } from '#core-viewport/viewport-event.service';

@Component({
  selector: `app-astrocadre`,
  templateUrl: './app.component.html',
  styleUrls: [],
  providers: [
    ViewportComponent, // FIXME
    ThemesComponent,
    LayersComponent
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
    private viewportEventService: ViewportEventService,
    private viewportDimensionService: ViewportDimensionService) {
    this.themeAwareComponents = new Array<ThemeAware>();
  }

  public ngOnInit(): void {
    this.themeAwareComponents.push(this.viewportManager);
    this.themeAwareComponents.push(this.layersManager);
    this.subscribeLayerLoadedEvent();
    this.subscribeThemeLoadedEvent();
    this.subscribeLayerVisibilityEvent();
    this.subscribeCameraChangeEvent();
    this.subscribeStarsMagnitudeRequestEvent();
    this.subscribeStarsLabelsVisibilityRequestEvent();
    this.subscribeStarsLabelsTypeRequestEvent();
    this.subscribeViewportDimensionChangeEvent();
    // necessary to avoid the nasty "Expression has changed after it was checked." error:
    this.changeDetector.detectChanges();
  }

  private subscribeViewportDimensionChangeEvent(): void {
    this.viewportDimensionService.broadcastDimensionChanged$.subscribe(
      () => this.updateLabelsVisibilityForAllLayers()
    );
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
        this.viewportManager.addTextElements(layer.getTextElements());
        this.updateLabelsVisibilityForLayer(layer);
      }
    );
  }

  private subscribeThemeLoadedEvent(): void {
    this.themesEventService.broadcastThemeLoaded$.subscribe(
      (themeCode: string) => {
        const theme = this.themesManager.getActiveTheme();
        if (theme) {
          this.themeAwareComponents.forEach(component => component?.useTheme(theme));
          this.viewportEventService.viewportChanged();
        }
      }
    );
  }

  private subscribeCameraChangeEvent(): void {
    this.viewportEventService.broadcastViewportChanged$.subscribe(
      () => this.updateLabelsVisibilityForAllLayers()
    );
  }

  private updateLabelsVisibilityForAllLayers(): void {
    this.layersManager.getLayers().forEach(
      (layer: RenderableLayer) => this.updateLabelsVisibilityForLayer(layer)
    );
  }

  private updateLabelsVisibilityForLayer(layer: RenderableLayer): void {
    if (layer.isVisible() && layer.isLabelsShown()) {
      this.viewportManager.showVisibleLabels(layer.getName(), layer.getRenderableLabels());
    } else {
      this.viewportManager.hideLabelsByLayer(layer.getName());
    }
  }

  private subscribeStarsMagnitudeRequestEvent(): void {
    this.layersEventService.requestStarsMagnitude$.subscribe(
      (magnitude: number) => {
        this.layersManager.ensureStarMagnitudesVisibleDownTo(magnitude);
        this.updateLabelsVisibilityForAllLayers();
      }
    );
  }

  private hideMagnitudeLabels(starsPerMagnitude: Array<StarsMagnitudeLayer>, slv: StarLabelVisibility): void {
    const hiddenMagnitudes =
      slv.visible ? starsPerMagnitude.filter(layer => layer.magClass > slv.magnitude) : starsPerMagnitude;
    hiddenMagnitudes.forEach(
      (layer) => this.viewportManager.hideLabelsByLayer(layer.getName())
    );
  }

  private showMagnitudeLabels(starsPerMagnitude: Array<StarsMagnitudeLayer>, slv: StarLabelVisibility): void {
    const visibleMagnitudes =
      slv.visible ? starsPerMagnitude.filter(layer => layer.magClass <= slv.magnitude) : [];
    visibleMagnitudes.forEach(
      (layer) => this.viewportManager.showVisibleLabels(layer.getName(), layer.getRenderableLabels())
    );
  }

  private subscribeStarsLabelsVisibilityRequestEvent(): void {
    this.layersEventService.requestStarsLabelsVisibility$.subscribe(
      (slv: StarLabelVisibility) => {
        const starsPerMagnitude = this.layersManager.getStarsMagnitudeLayers();
        starsPerMagnitude.forEach(
          (layer: StarsMagnitudeLayer) => layer.setLabelsShown(slv.visible)
        );
        this.hideMagnitudeLabels(starsPerMagnitude, slv);
        this.showMagnitudeLabels(starsPerMagnitude, slv);
      }
    );
  }

  private subscribeStarsLabelsTypeRequestEvent(): void {
    this.layersEventService.requestStarsLabelsType$.subscribe(
      (labelType: string) => {
        const starsPerMagnitude = this.layersManager.getStarsMagnitudeLayers();
        const labelTypeNoPrefix = labelType.substring(Layers.STARS.length + 1);
        starsPerMagnitude.forEach(layer => layer.setShownLabelsType(labelTypeNoPrefix));
        this.updateLabelsVisibilityForAllLayers();
      }
    );
  }

  private subscribeLayerVisibilityEvent(): void {
    this.layersEventService.requestLayerVisibility$.subscribe(
      (node: TreeNode) => {
        this.layersManager.updateLayerVisibility(node);
        const layer = this.layersManager.getLayer(node.code);
        if (layer) {
          this.updateLabelsVisibilityForLayer(layer);
        }
      }
    );
  }

}
