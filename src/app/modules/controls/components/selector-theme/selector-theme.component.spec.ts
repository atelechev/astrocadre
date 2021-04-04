import { mockedThemes } from '#core/test-utils/mocked-themes.spec';
import { TestContext } from '#core/test-utils/test-context.spec';
import { SelectorThemeComponent } from '#controls/components/selector-theme/selector-theme.component';
import { LoaderService } from '#core/services/data/loader.service';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';


describe('SelectorThemeComponent', () => {

  let ctx: TestContext;
  let loaderService: LoaderService;
  let component: SelectorThemeComponent;

  beforeEach(() => {
    ctx = new TestContext()
      .withUIImports()
      .forComponent(SelectorThemeComponent)
      .configure();
    loaderService = ctx.getService(LoaderService);
    component = ctx.getComponent(SelectorThemeComponent);
    ctx.themeService.availableThemes = mockedThemes;
    ctx.themeService.theme = mockedTheme;
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
