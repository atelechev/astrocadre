import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { ThemeService } from '#core/services/theme.service';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';
import { Theme } from '#core/models/theme';
import { themeDefault } from '#core/models/theme-default';

describe('ThemeService', () => {

  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ThemeService
      ]
    });
    service = TestBed.inject(ThemeService);
  });

  describe('availableThemes should return', () => {

    describe('an empty array', () => {

      it('by default', () => {
        expect(service.availableThemes).toEqual([]);
      });

      it('if it was set with a falsy value', () => {
        service.availableThemes = undefined;
        expect(service.availableThemes).toEqual([]);
      });

    });

  });

  describe('themeChanged should', () => {

    it('be defined by default', () => {
      expect(service.themeChanged).toBeDefined();
    });

    it('propagate the default theme as initial event', (done: DoneFn) => {
      service.themeChanged
        .subscribe(
          (theme: Theme) => {
            expect(theme).toEqual(themeDefault);
            done();
          }
        );
    });

  });

  describe('theme', () => {

    it('get should return themeDefault as initial value', () => {
      expect(service.theme).toEqual(themeDefault);
    });

    describe('set should', () => {

      it('trigger a themeChanged event if the value changes', (done: DoneFn) => {
        expect(service.theme).toEqual(themeDefault);
        const newTheme = mockedTheme;

        service.themeChanged
          .pipe(skip(1))
          .subscribe(
            (theme: Theme) => {
              expect(theme).toEqual(newTheme);
              done();
            }
          );

        service.theme = newTheme;
      });

      it('have no effect if the new value is the same as previous', () => {
        expect(service.theme).toEqual(themeDefault);
        const subject = service.themeChanged as BehaviorSubject<Theme>;
        spyOn(subject, 'next');

        service.theme = themeDefault;
        expect(subject.next).toHaveBeenCalledTimes(0);
      });

      it('prevent from setting a falsy theme value', () => {
        expect(service.theme).toEqual(themeDefault);
        service.theme = undefined;
        expect(service.theme).toEqual(themeDefault);
      });

    });

  });

});
