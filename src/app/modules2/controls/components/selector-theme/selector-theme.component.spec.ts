import { fakeAsync } from '@angular/core/testing';
import { SelectorThemeComponent } from 'src/app/modules2/controls/components/selector-theme/selector-theme.component';
import { ThemeService } from 'src/app/modules2/core/services/theme.service';
import { mockedThemes } from 'src/app/modules2/core/test-utils/mocked-themes.spec';
import { TestContext } from 'src/app/modules2/core/test-utils/test-context.spec';


describe('SelectorThemeComponent', () => {

  let ctx: TestContext;
  let themeService: ThemeService;
  let component: SelectorThemeComponent;

  beforeEach(fakeAsync(() => {
    ctx = new TestContext()
      .withUIImports()
      .forComponent(SelectorThemeComponent)
      .configure();
    themeService = ctx.themeService;
    component = ctx.getComponent(SelectorThemeComponent);
  }));

  it('themes should be loaded', fakeAsync(() => {
    const themes = component.themes;
    expect(themes).toBeDefined();
    expect(themes.length).toEqual(mockedThemes.length);
    expect(themes[0]).toEqual(mockedThemes[0]);
  }));

  describe('selectedTheme', () => {

    it('get should return undefined when the component is loaded', fakeAsync(() => {
      expect(component.selectedTheme).toBeUndefined();
    }));

    describe('set should', () => {

      it('assign the theme selection and trigger theme loading', fakeAsync(() => {
        spyOn(themeService, 'loadTheme');
        component.selectedTheme = mockedThemes[0];
        expect(themeService.loadTheme).toHaveBeenCalledTimes(1);
      }));

      it('not trigger theme loading if the arg is falsy', fakeAsync(() => {
        spyOn(themeService, 'loadTheme');
        component.selectedTheme = undefined;
        expect(themeService.loadTheme).toHaveBeenCalledTimes(0);
      }));

      it('not trigger theme loading if the arg matches the loaded theme', fakeAsync(() => {
        spyOn(themeService, 'loadTheme');
        component.selectedTheme = mockedThemes[0];
        expect(themeService.loadTheme).toHaveBeenCalledTimes(1);
        component.selectedTheme = mockedThemes[0];
        expect(themeService.loadTheme).toHaveBeenCalledTimes(1);
      }));

    });

  });

});
