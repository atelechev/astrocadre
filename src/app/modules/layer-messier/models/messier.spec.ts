import { fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Points, PointsMaterial } from 'three';
import { MessierProvidersService } from '#layer-messier/services/messier-providers.service';
import { Messier } from '#layer-messier/models/messier';
import { LayerMessierModule } from '#layer-messier/layer-messier.module';
import { RenderableText } from '#core/models/layers/renderable-text';
import { ThemeService } from '#core/services/theme.service';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';
import { StaticDataService } from '#core/services/static-data.service';


describe('Messier', () => {

  const objects = [
    {
      type: 'nebula-supernova',
      code: 'M1',
      ra: 83.63308,
      dec: 22.01450,
      names: ['Crab Nebula'],
      mag: 8.4,
      size: [7.0, 5.0]
    },
    {
      type: 'cluster-open',
      code: 'M6',
      ra: 265.0833,
      dec: -32.2533,
      names: ['Butterfly Cluster'],
      mag: 4.2,
      size: [20.0, 20.0, 90]
    }
  ];
  let layer: Messier;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [LayerMessierModule],
      providers: [
        ThemeService
      ]
    });
    const dataService = TestBed.inject(StaticDataService);
    spyOn(dataService, 'getDataJson').and.returnValue(of(objects));

    TestBed.inject(ThemeService).theme = mockedTheme;
    TestBed.inject(MessierProvidersService).getRenderableLayer()
      .then(
        (renderable: Messier) => layer = renderable
      );
  }));

  it('objects should return expected value', () => {
    expect(layer.objects.length).toEqual(4);
  });

  it('texts should return expected value', () => {
    expect(layer.texts.length).toEqual(2);
  });

  it('searchables should return expected value', () => {
    expect(layer.searchables.length).toEqual(2);
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
