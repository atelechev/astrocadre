import { TestBed } from '@angular/core/testing';
import { Color, Object3D, Scene } from 'three';
import { assertColorsSame, emptyThemeDef } from '#core/models/abstract-factories.spec';
import { Theme } from '#core/models/theme';
import { ViewportDimensionService } from '#core/services/viewport-dimension.service';
import { ViewportEventService } from '#core/services/viewport-event.service';
import { SceneManager } from '#viewport/services/scene-manager';
import { WorldOriginCameraService } from '#viewport/services/world-origin-camera.service';

describe('SceneManager', () => {

  let service: SceneManager;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ViewportEventService,
        ViewportDimensionService,
        WorldOriginCameraService,
        SceneManager]
    });
    service = TestBed.inject(SceneManager);
  });

  const assertObjectsCount = (expectedObjectsCount: number) => {
    expect(service.getScene().children.length).toBe(expectedObjectsCount);
  };

  it('getScene should return a defined Scene instance', () => {
    const scene = service.getScene();
    expect(scene).toBeDefined();
    expect(scene instanceof Scene).toBeTruthy();
  });

  it('getDomElement should return a defined HTMLCanvasElement', () => {
    const canvas = service.getDomElement();
    expect(canvas).toBeDefined();
    expect(canvas instanceof HTMLCanvasElement).toBeTruthy();
  });

  it('updateForTheme updates the background of the underlying scene', () => {
    const themeDef = Object.create(emptyThemeDef);
    themeDef.background.color = 'rgb(255, 0, 0)';
    const theme = new Theme(themeDef);

    const bgrBefore = service.getScene().background;
    expect(bgrBefore).toBeNull();

    service.updateForTheme(theme);

    const bgrAfer = service.getScene().background;
    expect(bgrAfer).toBeDefined();
    assertColorsSame(bgrAfer as Color, new Color(1, 0, 0));
  });

  describe('addObjects should', () => {

    it('add objects to the underlying Scene', () => {
      const objects = [new Object3D()];
      assertObjectsCount(0);

      service.addObjects(objects);
      assertObjectsCount(1);
    });

    it('add same object only once', () => {
      assertObjectsCount(0);

      const objects = [new Object3D()];
      service.addObjects(objects);
      assertObjectsCount(1);

      service.addObjects(objects);
      assertObjectsCount(1);
    });

    it('not add undefined objects', () => {
      assertObjectsCount(0);

      const objects = [undefined];
      service.addObjects(objects);
      assertObjectsCount(0);
    });

  });

  it('removeObject should remove existing object from the underlying Scene', () => {
    assertObjectsCount(0);

    const objects = [new Object3D()];
    service.addObjects(objects);
    assertObjectsCount(1);

    service.removeObjects(objects);
    assertObjectsCount(0);
  });

});
