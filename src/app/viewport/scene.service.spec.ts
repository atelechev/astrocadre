import { SceneService } from './scene.service';
import { TestBed } from '@angular/core/testing';
import { Scene, Color, Object3D } from 'three';
import { Theme } from '../core/theme/theme';
import { emptyThemeDef, assertColorsSame } from '../core/theme/abstract-factories.spec';
import { ViewportDimensionService } from './viewport-dimension.service';

describe('SceneService', () => {

  let service: SceneService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ ViewportDimensionService, SceneService ] });
    service = TestBed.get(SceneService);
  });

  const assertObjectsCount = (expectedObjectsCount: number) => {
    expect(service.getScene().children.length).toBe(expectedObjectsCount);
  };

  it('#getScene should return a defined Scene instance', () => {
    const scene = service.getScene();
    expect(scene).toBeDefined();
    expect(scene instanceof Scene).toBeTruthy();
  });

  it('#getDomElement should return a defined HTMLCanvasElement', () => {
    const canvas = service.getDomElement();
    expect(canvas).toBeDefined();
    expect(canvas instanceof HTMLCanvasElement).toBeTruthy();
  });

  it('#updateForTheme updates the background of the underlying scene', () => {
    const themeDef = Object.create(emptyThemeDef);
    themeDef.background.color = 'rgb(255, 0, 0)';
    const theme = new Theme(themeDef);

    const bgrBefore = service.getScene().background;
    expect(bgrBefore).toBeNull();

    service.updateForTheme(theme);

    const bgrAfer = service.getScene().background;
    expect(bgrAfer).toBeDefined();
    assertColorsSame(bgrAfer, new Color(1, 0, 0));
  });

  it('#addObjects should add objects to the underlying Scene', () => {
    const objects = [ new Object3D() ];
    assertObjectsCount(0);

    service.addObjects(objects);
    assertObjectsCount(1);
  });

  it('#addObjects should add same object only once', () => {
    assertObjectsCount(0);

    const objects = [ new Object3D() ];
    service.addObjects(objects);
    assertObjectsCount(1);

    service.addObjects(objects);
    assertObjectsCount(1);
  });

  it('#addObjects should not add undefined objects', () => {
    assertObjectsCount(0);

    const objects = [ undefined ];
    service.addObjects(objects);
    assertObjectsCount(0);
  });

  it('#removeObject should remove existing object from the underlying Scene', () => {
    assertObjectsCount(0);

    const objects = [ new Object3D() ];
    service.addObjects(objects);
    assertObjectsCount(1);

    service.removeObjects(objects);
    assertObjectsCount(0);
  });

});
