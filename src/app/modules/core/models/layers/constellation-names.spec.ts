import { fakeAsync } from '@angular/core/testing';
import { ConstellationMeta } from 'src/app/modules/core/models/constellation-meta';
import { ConstellationNames } from 'src/app/modules/core/models/layers/constellation-names';
import { TextOffsetPolicies } from 'src/app/modules/core/models/layers/factories/text/text-offsets-policies';
import { RenderableText } from 'src/app/modules/core/models/layers/renderable-text';
import { Materials } from 'src/app/modules/core/models/materials';
import { WorldConstants } from 'src/app/modules/core/models/world-constants';
import { mockedTheme } from 'src/app/modules/core/test-utils/mocked-theme.spec';
import { TestContext } from 'src/app/modules/core/test-utils/test-context.spec';
import { toVector3 } from 'src/app/modules/core/utils/vector-utils';


describe('ConstellationNames', () => {

  let layer: ConstellationNames;
  const constellation = 'Andromeda';
  const code = 'AND';

  beforeEach(fakeAsync(() => {
    const ctx = new TestContext().configure();
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
    const constMeta = model.objects[0] as ConstellationMeta;
    const label = new RenderableText(
      model.code,
      Materials.LABELS,
      toVector3(constMeta.ra, constMeta.dec, WorldConstants.worldRadiusForLayer(model.code)),
      constMeta.names[0],
      TextOffsetPolicies.CENTERED
    );
    const labels = new Map<string, RenderableText>();
    labels.set(constMeta.code, label);
    layer = new ConstellationNames(
      model,
      ctx.materialsService,
      ctx.eventsService,
      labels
    );
  }));

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

  it('renderableLabels should return expected data', () => {
    const labels = layer.renderableLabels;
    expect(labels).toBeDefined();
    expect(labels.size).toEqual(1);
    expect(labels.get(code).text).toEqual(constellation);
  });

  it('style should be assigned to the texts', () => {
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
