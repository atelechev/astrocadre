import { TestBed } from '@angular/core/testing';
import { Points, PointsMaterial } from 'three';
import { RenderableText } from '#core/models/layers/renderable-text';
import { Stars } from '#core/models/layers/stars';
import { LayersFactoryService } from '#core/services/layers-factory.service';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';
import { SearchService } from '#core/services/search.service';
import { ThemeService } from '#core/services/theme.service';
import { LayerService } from '#core/services/layer.service';


const model = {
  code: 'stars-mag2.0',
  label: 'Magnitude < 2.0',
  loadFromUrl: true,
  description: 'Stars of magnitude less or equal to 2.0',
  objects: [
    [37.95, 89.26, 2.0, 'Polaris', 'ALP UMI']
  ]
};

describe('Stars', () => {

  let layer: Stars;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LayerService,
        LayersFactoryService,
        SearchService,
        ThemeService
      ]
    });
    layer = TestBed.inject(LayersFactoryService).buildRenderableLayer(model) as Stars;
    TestBed.inject(ThemeService).theme = mockedTheme;
  });

  it('magnitudeClass should return expected value', () => {
    expect(layer.magnitudeClass).toEqual(2);
  });

  it('objects should return expected value', () => {
    expect(layer.objects.length).toEqual(1);
  });

  describe('texts should', () => {

    it('return expected value when proper names are selected', () => {
      expect(layer.texts.length).toEqual(1);
      const renderable = layer.texts[0];
      expect(renderable).toBeDefined();
      expect(renderable.text).toEqual('Polaris');
    });

    it('return expected value when standard names are selected', () => {
      layer.showStandardNames();
      expect(layer.texts.length).toEqual(1);
      const renderable = layer.texts[0];
      expect(renderable).toBeDefined();
      expect(renderable.text).toEqual('α');
    });

  });

  describe('properNamesShown should', () => {

    it('return true by default', () => {
      expect(layer.properNamesShown).toBeTrue();
    });

    it('return false when showStandardNames was called', () => {
      layer.showStandardNames();
      expect(layer.properNamesShown).toBeFalse();
    });

    it('return true when showProperNames was called', () => {
      layer.showStandardNames();
      expect(layer.properNamesShown).toBeFalse();
      layer.showProperNames();
      expect(layer.properNamesShown).toBeTrue();
    });

  });

  it('searchables should return expected value', () => {
    expect(layer.searchables.length).toEqual(1);
    const searchable = layer.searchables[0];
    expect(searchable).toBeDefined();
    expect(searchable.type).toEqual('star');
    expect(searchable.names[0]).toEqual('Polaris');
  });

  it('material should be assigned to the objects', () => {
    layer.applyTheme(mockedTheme);
    const object = layer.objects[0] as Points;
    expect(object).toBeDefined();
    const foundMaterial = object.material as PointsMaterial;
    expect(foundMaterial.size).toEqual(11.25);
    expect(foundMaterial.map).toBeDefined();
  });

  it('style should be assigned to the texts', () => {
    layer.applyTheme(mockedTheme);
    const object = layer.texts[0] as RenderableText;
    expect(object).toBeDefined();
    const style = mockedTheme.stars.names.proper;
    expect(object.htmlElement.style.color).toEqual(style.color);
    expect(object.htmlElement.style.fontFamily).toEqual(style.fontFamily);
    expect(object.htmlElement.style.fontSize).toEqual(style.fontSize);
    expect(object.htmlElement.style.fontStyle).toEqual(style.fontStyle);
    expect(object.htmlElement.style.fontWeight).toEqual(style.fontWeight);
  });

});
