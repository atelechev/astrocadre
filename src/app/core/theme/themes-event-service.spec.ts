import { TestBed } from '@angular/core/testing';
import { TreeNode } from '#core/tree-node';
import { newTreeNode } from '#core/tree-node.spec';
import { ThemesEventService } from '#core-theme/themes-event.service';

describe('ThemesEventService', () => {

  let service: ThemesEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ThemesEventService] });
    service = TestBed.get(ThemesEventService);
  });

  it('#themesListLoaded should broadcast event for the specified themes', () => {
    const themes = [newTreeNode('theme1', []), newTreeNode('theme2', [])];
    const subscribed = service.broadcastThemesListLoaded$.subscribe(
      (broadcastedThemes: Array<TreeNode>) => {
        expect(broadcastedThemes).toBeDefined();
        expect(broadcastedThemes.length).toBe(2);
        expect(broadcastedThemes[0].code).toBe('theme1');
        expect(broadcastedThemes[1].code).toBe('theme2');
      }
    );
    service.themesListLoaded(themes);
    subscribed.unsubscribe();
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
