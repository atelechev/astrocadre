import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { ThemeService } from '#core/services/theme.service';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';
import { Theme } from '#core/models/theme';

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

    it('emit an undefined theme as initial event', (done: DoneFn) => {
      service.themeChanged
        .subscribe(
          (theme: Theme) => {
            expect(theme).toBeUndefined();
            done();
          }
        );
    });

  });

  describe('theme', () => {

    describe('set should', () => {

      it('trigger a themeChanged event if the value changes', (done: DoneFn) => {
        expect(service.theme).toBeUndefined();
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
        expect(service.theme).toBeUndefined();
        const subject = service.themeChanged as BehaviorSubject<Theme>;
        spyOn(subject, 'next');

        service.theme = undefined;
        expect(subject.next).toHaveBeenCalledTimes(0);
      });

    });

  });

});
