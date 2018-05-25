import { ThemesEventService } from './themes-event.service';
import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

describe('ThemesEventService', () => {

  let service: ThemesEventService;

  beforeAll(() => {
    TestBed.configureTestingModule({ providers: [ThemesEventService] });
    service = TestBed.get(ThemesEventService);
  });

  it('#themeLoaded should broadcast event for the specified theme', () => {
    const themeName = 'test_theme_1';
    const subscribed = service.broadcastThemeLoaded$.subscribe(
      (theme: string) => expect(theme).toBe(themeName)
    );
    service.themeLoaded(themeName);
    subscribed.unsubscribe();
  });

  it('#loadThemeRequested should broadcast event for the specified theme', () => {
    const themeName = 'test_theme_2';
    const subscribed = service.requestThemeLoad$.subscribe(
      (theme: string) => expect(theme).toBe(themeName)
    );
    service.themeLoaded(themeName);
    subscribed.unsubscribe();
  });

});
