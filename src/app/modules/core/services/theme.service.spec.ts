import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { EventsService } from 'src/app/modules/core/services/events.service';
import { StaticDataService } from 'src/app/modules/core/services/static-data.service';
import { ThemeService } from 'src/app/modules/core/services/theme.service';
import { MockStaticDataService } from 'src/app/modules/core/test-utils/mock-static-data-service.spec';
import { mockedTheme } from 'src/app/modules/core/test-utils/mocked-theme.spec';
import { mockedThemes } from 'src/app/modules/core/test-utils/mocked-themes.spec';

describe('ThemeService', () => {

  let service: ThemeService;

  beforeEach(fakeAsync(() => {
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
  }));

  it('availableThemes should return expected value', () => {
    expect(service.availableThemes).toEqual(mockedThemes);
  });

  it('theme should return expected value', () => {
    expect(service.theme).toEqual(mockedTheme);
  });

  it('loadTheme should fire theme changed event', fakeAsync(() => {
    const eventsService = TestBed.inject(EventsService);
    spyOn(eventsService, 'fireThemeChanged');
    service.loadTheme('dev');
    tick();
    expect(eventsService.fireThemeChanged).toHaveBeenCalledTimes(1);
  }));

});
