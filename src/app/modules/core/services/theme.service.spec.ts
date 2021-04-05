import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { ThemeService } from '#core/services/theme.service';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';
import { themeDefault } from '#core/models/theme/theme-default';
import { ThemeEvent } from '#core/models/event/theme-event';

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
      expect(service.events).toBeDefined();
    });

    it('propagate the default theme as initial event', (done: DoneFn) => {
      service.events
        .subscribe(
          (event: ThemeEvent<any>) => {
            expect(event.data).toEqual(themeDefault);
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

        service.events
          .pipe(skip(1))
          .subscribe(
            (event: ThemeEvent<any>) => {
              expect(event.data).toEqual(newTheme);
              done();
            }
          );

        service.theme = newTheme;
      });

      it('have no effect if the new value is the same as previous', () => {
        expect(service.theme).toEqual(themeDefault);
        const subject = service.events as BehaviorSubject<ThemeEvent<any>>;
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
