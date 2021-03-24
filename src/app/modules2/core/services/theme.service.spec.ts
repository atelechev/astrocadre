import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  fakeAsync,
  TestBed,
  tick,
  waitForAsync
  } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { skip } from 'rxjs/operators';
import { Theme } from 'src/app/modules2/core/models/theme';
import { ThemeMeta } from 'src/app/modules2/core/models/theme-meta';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { StaticDataService } from 'src/app/modules2/core/services/static-data.service';
import { ThemeService } from 'src/app/modules2/core/services/theme.service';
import { MockStaticDataService } from 'src/app/modules2/core/test-utils/mock-static-data-service.spec';
import { mockedTheme } from 'src/app/modules2/core/test-utils/mocked-theme.spec';
import { mockedThemes } from 'src/app/modules2/core/test-utils/mocked-themes.spec';

describe('ThemeService', () => {

  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        EventsService,
        {
          provide: StaticDataService,
          useClass: MockStaticDataService
        },
        ThemeService
      ]
    });
    service = TestBed.inject(ThemeService);
  });

  it('availableThemes should return expected value', waitForAsync(() => {
    setTimeout(() => {
      expect(service.availableThemes).toEqual(mockedThemes);
    });
  }));

  it('theme should return expected value', waitForAsync(() => {
    setTimeout(() => {
      expect(service.theme).toEqual(mockedTheme);
    });
  }));

  it('loadTheme should fire theme changed event', waitForAsync((done: DoneFn) => {
    const eventsService = TestBed.inject(EventsService);
    spyOn(eventsService, 'fireThemeChanged');
    eventsService.themeChanged.pipe(skip(1)).subscribe(
      (theme: Theme) => {
        setTimeout(() => {
          expect(theme).toBeDefined();
          expect(eventsService.fireThemeChanged).toHaveBeenCalledTimes(2);
          done();
        });
      }
    );
    service.loadTheme('dev');
  }));

});
