import { TestBed } from '@angular/core/testing';
import { mockedThemes } from '#core/test-utils/mocked-themes.spec';
import { SelectorThemeComponent } from '#controls/components/selector-theme/selector-theme.component';
import { LoaderService } from '#core/services/data/loader.service';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';
import { CoreModule } from '#core/core.module';
import { ThemeService } from '#core/services/theme.service';
import { ControlsModule } from '#controls/controls.module';


describe('SelectorThemeComponent', () => {

  let loaderService: LoaderService;
  let component: SelectorThemeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        ControlsModule
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
