import { TestBed } from '@angular/core/testing';
import { Color, LineBasicMaterial, LineSegments } from 'three';
import { RenderableText } from '#core/models/layers/renderable-text';
import { LineStyle } from '#core/models/theme/line-style';
import { SearchService } from '#core/services/search.service';
import { ThemeService } from '#core/services/theme.service';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';
import { LayerConstellationsModule } from '#layer-constellations/layer-constellations.module';
import { Constellations } from '#layer-constellations/models/constellations';
import { ConstellationsProvidersService } from '#layer-constellations/services/constellations-providers.service';


describe('Constellations', () => {

  let layer: Constellations;
  const code = Constellations.CODE;
  const model = {
    code,
    label: 'Constellations',
    loadFromUrl: true,
    objects: [{
      boundaries: [
        [177.5, -24.5, 162.5, -24.5],
        [170.0, 73.5, 170.0, 66.5],
        [165.0, 25.5, 161.25, 25.5]
      ],
      lines: [
        [72.46, 6.95, 72.65, 8.9],
        [72.8, 5.6, 72.46, 6.95],
        [73.56, 2.45, 72.8, 5.6],
        [74.64, 1.72, 73.56, 2.45]
      ],
      names: [
        {
          type: 'constellation',
          code: 'AND',
          ra: 8.532,
          dec: 38.906,
          names: ['Andromeda']
        }
      ]
    }]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LayerConstellationsModule],
      providers: [
        SearchService,
        ThemeService
      ]
    });
    layer = TestBed.inject(ConstellationsProvidersService).getRenderableLayer(model) as Constellations;
    TestBed.inject(ThemeService).theme = mockedTheme;
  });

  it('texts should return expected value', () => {
    const texts = layer.texts;
    expect(texts).toBeDefined();
    expect(texts.length).toEqual(1);
    expect(texts[0].text).toEqual('Andromeda');
  });

  it('searchables should return expected value', () => {
    const searchables = layer.searchables;
    expect(searchables).toBeDefined();
    expect(searchables.length).toEqual(1);
    expect(searchables[0].code).toEqual('AND');
  });

  it('objects should return expected data', () => {
    const objects = layer.objects;
    expect(objects).toBeDefined();
    expect(objects.length).toEqual(2);
  });

  describe('applyTheme should assign expected materials', () => {

    const assertExpectedLineMaterial = (indexObject: number, expectedStyle: LineStyle): void => {
      const objects = layer.objects[indexObject] as LineSegments;
      const assignedMaterial = objects.material as LineBasicMaterial;
      expect(assignedMaterial).toBeDefined();
      expect(assignedMaterial.color).toEqual(new Color(expectedStyle.color));
    };

    it('on the boundaries', () => {
      layer.applyTheme(mockedTheme);
      assertExpectedLineMaterial(0, mockedTheme.layers[1].boundaries);
    });

    it('on the lines', () => {
      layer.applyTheme(mockedTheme);
      assertExpectedLineMaterial(1, mockedTheme.layers[1].lines);
    });

    it('on the texts', () => {
      layer.applyTheme(mockedTheme);
      const text = layer.texts[0] as RenderableText;
      expect(text).toBeDefined();
      const style = mockedTheme.layers[1].names;
      const html = text.htmlElement;
      expect(html.style.color).toEqual(style.color);
      expect(html.style.fontFamily).toEqual(style.fontFamily);
      expect(html.style.fontSize).toEqual(style.fontSize);
      expect(html.style.fontStyle).toEqual(style.fontStyle);
      expect(html.style.fontWeight).toEqual(style.fontWeight);
    });

  });

  describe('showBoundaries should', () => {

    describe('if the arg is true', () => {

      it('have no effect if the boundaries are already shown', () => {
        expect(layer.objects.length).toEqual(2);

        layer.setBoundariesVisible(true);
        expect(layer.objects.length).toEqual(2);
      });

      it('show the boundaries if they were hidden', () => {
        const boundaries = layer.objects[0];
        layer.setBoundariesVisible(false);
        expect(layer.objects.length).toEqual(1);
        expect(layer.objects[0]).not.toEqual(boundaries);

        layer.setBoundariesVisible(true);
        expect(layer.objects.length).toEqual(2);
        expect(layer.objects[1]).toEqual(boundaries);
      });

    });

    describe('if the arg is false', () => {

      it('have no effect if the boundaries are already hidden', () => {
        layer.setBoundariesVisible(false);
        expect(layer.objects.length).toEqual(1);

        layer.setBoundariesVisible(false);
        expect(layer.objects.length).toEqual(1);
      });

      it('hide the boundaries if they were shown', () => {
        const boundaries = layer.objects[0];
        expect(layer.objects.length).toEqual(2);
        expect(layer.objects[0]).toEqual(boundaries);

        layer.setBoundariesVisible(false);
        expect(layer.objects.length).toEqual(1);
        expect(layer.objects[0]).not.toEqual(boundaries);
      });

    });

  });

  describe('showLines should', () => {

    describe('if the arg is true', () => {

      it('have no effect if the lines are already shown', () => {
        expect(layer.objects.length).toEqual(2);

        layer.setLinesVisible(true);
        expect(layer.objects.length).toEqual(2);
      });

      it('show the lines if they were hidden', () => {
        const lines = layer.objects[1];
        layer.setLinesVisible(false);
        expect(layer.objects.length).toEqual(1);
        expect(layer.objects[0]).not.toEqual(lines);

        layer.setLinesVisible(true);
        expect(layer.objects.length).toEqual(2);
        expect(layer.objects[1]).toEqual(lines);
      });

    });

    describe('if the arg is false', () => {

      it('have no effect if the lines are already hidden', () => {
        layer.setLinesVisible(false);
        expect(layer.objects.length).toEqual(1);

        layer.setLinesVisible(false);
        expect(layer.objects.length).toEqual(1);
      });

      it('hide the lines if they were shown', () => {
        const lines = layer.objects[1];
        expect(layer.objects.length).toEqual(2);
        expect(layer.objects[1]).toEqual(lines);

        layer.setLinesVisible(false);
        expect(layer.objects.length).toEqual(1);
        expect(layer.objects[0]).not.toEqual(lines);
      });

    });

  });

});
