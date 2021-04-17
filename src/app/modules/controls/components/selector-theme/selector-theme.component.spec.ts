import { TestBed } from '@angular/core/testing';
import { LayerMessierModule } from '#layer-messier/layer-messier.module';
import { LoaderService } from '#controls/services/loader.service';
import { mockedThemes } from '#core/test-utils/mocked-themes.spec';
import { SelectorThemeComponent } from '#controls/components/selector-theme/selector-theme.component';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';
import { CoreModule } from '#core/core.module';
import { ThemeService } from '#core/services/theme.service';
import { ControlsModule } from '#controls/controls.module';
import { LayerSkyGridModule } from '#layer-sky-grid/layer-sky-grid.module';
import { LayerStarsModule } from '#layer-stars/layer-stars.module';
import { LayerConstellationsModule } from '#layer-constellations/layer-constellations.module';
import { LayerSolarSystemModule } from '#layer-solar-system/layer-solar-system.module';


describe('SelectorThemeComponent', () => {

  let loaderService: LoaderService;
  let component: SelectorThemeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        ControlsModule,
        LayerSkyGridModule,
        LayerStarsModule,
        LayerConstellationsModule,
        LayerMessierModule,
        LayerSolarSystemModule
      ]
    });
    loaderService = TestBed.inject(LoaderService);
    component = TestBed.createComponent(SelectorThemeComponent).componentInstance;
    const themeService = TestBed.inject(ThemeService);
    themeService.availableThemes = mockedThemes;
    themeService.theme = mockedTheme;
  });

  it('themes should be loaded', () => {
    const themes = component.themes;
    expect(themes).toBeDefined();
    expect(themes.length).toEqual(mockedThemes.length);
    expect(themes[0]).toEqual(mockedThemes[0]);
  });

  describe('selectedTheme', () => {

    it('get should return undefined when the component is loaded', () => {
      expect(component.selectedTheme).toBeUndefined();
    });

    describe('set should', () => {

      it('assign the theme selection and trigger theme loading', () => {
        spyOn(loaderService, 'loadTheme');
        component.selectedTheme = mockedThemes[0];
        expect(loaderService.loadTheme).toHaveBeenCalledTimes(1);
      });

      it('not trigger theme loading if the arg is falsy', () => {
        spyOn(loaderService, 'loadTheme');
        component.selectedTheme = undefined;
        expect(loaderService.loadTheme).toHaveBeenCalledTimes(0);
      });

      it('not trigger theme loading if the arg matches the loaded theme', () => {
        spyOn(loaderService, 'loadTheme');
        component.selectedTheme = mockedThemes[0];
        expect(loaderService.loadTheme).toHaveBeenCalledTimes(1);
        component.selectedTheme = mockedThemes[0];
        expect(loaderService.loadTheme).toHaveBeenCalledTimes(1);
      });

    });

  });

});
