import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Material } from 'three';
import { Materials } from '#core/models/materials';
import { SupportedLayers } from '#core/models/supported-layers';
import { TextStyle } from '#core/models/text-style';
import { EventsService } from '#core/services/events.service';
import { MaterialsService } from '#core/services/materials.service';
import { StaticDataService } from '#core/services/static-data.service';
import { ThemeService } from '#core/services/theme.service';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';


describe('MaterialsService', () => {

  let service: MaterialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        EventsService,
        MaterialsService,
        StaticDataService,
        ThemeService
      ]
    });
    service = TestBed.inject(MaterialsService);
    const themeService = TestBed.inject(ThemeService);
    spyOnProperty(themeService, 'theme').and.returnValue(mockedTheme);
  });

  describe('getMaterialsForLayer should', () => {

    it('throw expected error if the layer is not supported', () => {
      expect(() => service.getMaterialsForLayer('abcd')).toThrowError('Unsupported layer: abcd');
    });

    describe('return expected materials', () => {

      const assertMaterialsExpected = (materials: Map<string, Material>, expectedKeys: Array<string>): void => {
        expect(materials).toBeDefined();
        expect(materials.size).toEqual(expectedKeys.length);
        expectedKeys.forEach((key: string) =>
          expect(materials.get(key)).toBeDefined()
        );
      };

      it('for the sky-grid layer', () => {
        const materials = service.getMaterialsForLayer(SupportedLayers.SKY_GRID);
        assertMaterialsExpected(materials, [Materials.LINE_COMMON, Materials.LINE_REFERENCE]);
      });

      it('for the constellation-boundaries layer', () => {
        const materials = service.getMaterialsForLayer(SupportedLayers.CONSTELLATION_BOUNDARIES);
        assertMaterialsExpected(materials, [Materials.LINE_COMMON]);
      });

      it('for the constellation-lines layer', () => {
        const materials = service.getMaterialsForLayer(SupportedLayers.CONSTELLATION_LINES);
        assertMaterialsExpected(materials, [Materials.LINE_COMMON]);
      });

      it('for the stars layer', () => {
        const materials = service.getMaterialsForLayer(SupportedLayers.STARS);
        assertMaterialsExpected(materials, ['star-2.0', 'star-2.5', 'star-3.0']);
      });

    });

  });

  describe('getTextStyleForLayer should', () => {

    it('throw expected error if the layer is not supported', () => {
      expect(() => service.getTextStyleForLayer('abcd')).toThrowError('Unsupported layer: abcd');
    });

    describe('return expected materials', () => {

      const assertStylesExpected = (styles: Map<string, TextStyle>, expectedKeys: Array<string>): void => {
        expect(styles).toBeDefined();
        expect(styles.size).toEqual(expectedKeys.length);
        expectedKeys.forEach((key: string) =>
          expect(styles.get(key)).toBeDefined()
        );
      };

      it('for the constellation-names layer', () => {
        const styles = service.getTextStyleForLayer(SupportedLayers.CONSTELLATION_NAMES);
        assertStylesExpected(styles, [Materials.LABELS]);
      });

      it('for the stars layer', () => {
        const styles = service.getTextStyleForLayer(SupportedLayers.STARS);
        assertStylesExpected(styles, [Materials.NAMES_PROPER, Materials.NAMES_STANDARD]);
      });

    });

  });

});
