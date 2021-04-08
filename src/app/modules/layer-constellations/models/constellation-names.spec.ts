import { TestBed } from '@angular/core/testing';
import { ConstellationNames } from '#layer-constellations/models/constellation-names';
import { RenderableText } from '#core/models/layers/renderable-text';
import { SearchService } from '#core/services/search.service';
import { ThemeService } from '#core/services/theme.service';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';
import { LayerConstellationsModule } from '#layer-constellations/layer-constellations.module';
import { ConstellationsProvidersService } from '#layer-constellations/services/constellations-providers.service';


describe('ConstellationNames', () => {

  const constellation = 'Andromeda';
  const code = 'AND';
  const model = {
    code: 'constellation-names',
    label: 'Names',
    loadFromUrl: true,
    objects: [
      {
        type: 'constellation',
        code,
        ra: 8.532,
        dec: 38.906,
        names: [constellation]
      }
    ]
  };
  let layer: ConstellationNames;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LayerConstellationsModule],
      providers: [
        SearchService,
        ThemeService
      ]
    });
    layer = TestBed.inject(ConstellationsProvidersService).getRenderableLayer(model) as ConstellationNames;
    TestBed.inject(ThemeService).theme = mockedTheme;
  });

  it('texts should return expected data', () => {
    const texts = layer.texts;
    expect(texts).toBeDefined();
    expect(texts.length).toEqual(1);
    expect(texts[0].text).toEqual(constellation);
  });

  it('searchables should return expected data', () => {
    const searchables = layer.searchables;
    expect(searchables).toBeDefined();
    expect(searchables.length).toEqual(1);
    expect(searchables[0].code).toEqual(code);
    expect(searchables[0].type).toEqual('constellation');
  });

  it('style should be assigned to the texts', () => {
    layer.applyTheme(mockedTheme);
    const text = layer.texts[0] as RenderableText;
    expect(text).toBeDefined();
    const style = mockedTheme.constellation.names;
    const html = text.htmlElement;
    expect(html.style.color).toEqual(style.color);
    expect(html.style.fontFamily).toEqual(style.fontFamily);
    expect(html.style.fontSize).toEqual(style.fontSize);
    expect(html.style.fontStyle).toEqual(style.fontStyle);
    expect(html.style.fontWeight).toEqual(style.fontWeight);
  });

});
