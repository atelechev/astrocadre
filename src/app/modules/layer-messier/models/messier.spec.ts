import { TestBed } from '@angular/core/testing';
import { Points, PointsMaterial } from 'three';
import { MessierProvidersService } from '#layer-messier/services/messier-providers.service';
import { Messier } from '#layer-messier/models/messier';
import { LayerMessierModule } from '#layer-messier/layer-messier.module';
import { RenderableText } from '#core/models/layers/renderable-text';
import { ThemeService } from '#core/services/theme.service';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';


const model = {
  code: Messier.CODE,
  label: 'Messier objects',
  loadFromUrl: true,
  objects: [
    {
      type: 'nebula-supernova',
      code: 'M1',
      ra: 83.63308,
      dec: 22.01450,
      names: ['Crab Nebula'],
      mag: 8.4,
      size: [7.0, 5.0]
    }
  ]
};

describe('Messier', () => {

  let layer: Messier;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LayerMessierModule],
      providers: [
        ThemeService
      ]
    });
    layer = TestBed.inject(MessierProvidersService).getRenderableLayer(model);
    TestBed.inject(ThemeService).theme = mockedTheme;
  });

  it('objects should return expected value', () => {
    expect(layer.objects.length).toEqual(4);
  });

  it('texts should return expected value', () => {
    expect(layer.texts.length).toEqual(1);
  });

  it('searchables should return expected value', () => {
    expect(layer.searchables.length).toEqual(1);
    const searchable = layer.searchables[0];
    expect(searchable).toBeDefined();
    expect(searchable.type).toEqual('nebula-supernova');
    expect(searchable.names[0]).toEqual('Crab Nebula');
  });

  it('material should be assigned to the objects', () => {
    layer.applyTheme(mockedTheme);
    const object = layer.objects[0] as Points;
    expect(object).toBeDefined();
    const foundMaterial = object.material as PointsMaterial;
    expect(foundMaterial.size).toEqual(12.5);
    expect(foundMaterial.map).toBeDefined();
  });

  it('style should be assigned to the texts', () => {
    layer.applyTheme(mockedTheme);
    const object = layer.texts[0] as RenderableText;
    expect(object).toBeDefined();
    const expectedStyle = mockedTheme.layers[3].names;
    const assignedStyle = object.htmlElement.style;
    expect(assignedStyle.color).toEqual(expectedStyle.color);
    expect(assignedStyle.fontFamily).toEqual(expectedStyle.fontFamily);
    expect(assignedStyle.fontSize).toEqual(expectedStyle.fontSize);
    expect(assignedStyle.fontStyle).toEqual(expectedStyle.fontStyle);
    expect(assignedStyle.fontWeight).toEqual(expectedStyle.fontWeight);
  });

});
